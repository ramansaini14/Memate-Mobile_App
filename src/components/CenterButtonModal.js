import React, {useState, useEffect, use} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import {appColors} from '../utils/appColors';
import RightArrowWhite from '../assets/svg/RightArrowWhite';
import BackIcon from '../assets/svg/BackIcon';
import SwipeButton from 'rn-swipe-button';
import RightArrowJobStart from '../assets/svg/RightArrowJobStart';
import TrueIcon from '../assets/svg/TrueIcon';
import TimeTrackerCard from './TimeTrackerCard';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {pauseTimer, stopTimer} from '../redux/TimerSlice';
import {setIsPayused, setJobDataGlobally} from '../redux/GlobalSlice';
import {hitJobPause, hitJobStop} from '../redux/JobStatusSlice';

const CenterButtonModal = ({
  visible,
  onClose,
  onStateChange,
  onAvailableClick,
  orgId
}) => {
  const [currentView, setCurrentView] = useState('initial');
  const [animating, setAnimating] = useState(false);
  const [isJobStarted, setIsJobStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showTracker, setShowTracker] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const slideAnim = useState(new Animated.Value(300))[0];
  const opacityAnim = useState(new Animated.Value(0))[0];
  const textSlideAnim = useState(new Animated.Value(0))[0];
  const trackerSlideAnim = useState(new Animated.Value(-200))[0];
  const jobData = useSelector(state => state.globalReducer.jobData);

  const [isSwipeCompleted, setIsSwipeCompleted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    jobData ? setCurrentView('progress') : setCurrentView('initial');

    jobData ? onStateChange('pause') : onStateChange('start');
  }, [jobData]);

  useEffect(() => {
    if (visible) {
      setAnimating(true);
      slideAnim.setValue(300);
      opacityAnim.setValue(0);

      // if (currentView === 'progress') {
      //   trackerSlideAnim.setValue(0);
      // }

      const animations = [
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ];

      if (currentView === 'progress') {
        animations.push(
          Animated.timing(trackerSlideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        );
      }

      Animated.parallel(animations).start(() => {
        setAnimating(false);
      });
    }
  }, [visible]);

  const hideModal = () => {
    if (animating) return;
    setAnimating(true);

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      ...(currentView === 'progress'
        ? [
            Animated.timing(trackerSlideAnim, {
              toValue: -300,
              duration: 200,
              easing: Easing.in(Easing.cubic),
              useNativeDriver: true,
            }),
          ]
        : []),
    ]).start(() => {
      trackerSlideAnim.setValue(-300);
      setAnimating(false);
      onClose();
    });
  };

  const handleContinue = () => {
    onAvailableClick(4);
    hideModal();
    // onStateChange && onStateChange('play');

    // Animated.timing(textSlideAnim, {
    //   toValue: -300,
    //   duration: 200,
    //   useNativeDriver: true,
    // }).start(() => {
    //   setCurrentView('progress');
    //   setIsJobStarted(true);
    //   textSlideAnim.setValue(300);
    //   Animated.parallel([
    //     Animated.timing(textSlideAnim, {
    //       toValue: 0,
    //       duration: 200,
    //       useNativeDriver: true,
    //     }),
    //     Animated.timing(trackerSlideAnim, {
    //       toValue: 0,
    //       duration: 300,
    //       easing: Easing.out(Easing.cubic),
    //       useNativeDriver: true,
    //     }),
    //   ]).start();
    // });
  };

  const handleBack = () => {
    onStateChange && onStateChange('initial');

    Animated.parallel([
      Animated.timing(textSlideAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(trackerSlideAnim, {
        toValue: -200,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentView('initial');
      textSlideAnim.setValue(-300);
      Animated.timing(textSlideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleCompleteJob = () => {
    console.log('completed');
    setIsCompleted(true);
  };

  const handleStartStop = () => {
    if (!isJobStarted) {
      setIsJobStarted(true);
    } else {
      setIsPaused(!isPaused);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const setTimer = () => {};

  const handlePauseClick = () => {};

  const onCompleteJob = async () => {
    console.log(`Completing job ${jobData.id}`);

    // First, stop the timer in Redux
    dispatch(stopTimer(jobData.id));

    // Update local state
    setIsJobStarted(false);
    setIsPaused(false);
    dispatch(setIsPayused(false));
    
    setIsSwipeCompleted(true);
    setShowTracker(false);

    // Get the locations for this specific job
    const locationsKey = `locations_${jobData.id}`;
    try {
      const locationsStr = await AsyncStorage.getItem(locationsKey);
      let locationsData = [];

      if (locationsStr) {
        locationsData = JSON.parse(locationsStr);
        console.log(
          `Found ${locationsData.length} location points for job completion`,
        );
      } else {
        console.log('No stored locations, using current location');
        // Fallback to current location if available
        if (location && location.length > 0) {
          locationsData = location;
        } else {
          // Create a minimal valid location entry
          const currentDate = new Date().toISOString();
          locationsData = [
            {
              latitude: '0',
              longitude: '0',
              date: currentDate,
            },
          ];
        }
      }

      setTimeout(() => {
        console.log('Dispatching increment action for job completion');
        setIsSwipeCompleted(false);
        onClose();
        dispatch(setJobDataGlobally(null));
      }, 1500);

      // Prepare and send API call
      const payload = {
        orgId,
        jobId: jobData.id,
        data: locationsData,
      };

      console.log(`Sending job completion payload for job ${jobData.id}`);
      dispatch(hitJobStop(payload));

      // Clear the stored locations
      await AsyncStorage.removeItem(locationsKey);
    } catch (err) {
      console.error('Error processing job completion:', err);
      // Even on error, send minimal data to complete the job
      const currentDate = new Date().toISOString();
      const fallbackData = [
        {
          latitude: '0',
          longitude: '0',
          date: currentDate,
        },
      ];

      dispatch(
        hitJobStop({
          orgId,
          jobId: jobData.id,
          data: fallbackData,
        }),
      );
    }
  };

  // Fix the direct pause handler
  const handleDirectPause = () => {
    // Update Redux timer state to paused
    dispatch(pauseTimer(jobData.id));

    dispatch(setIsPayused(true));
    dispatch(setJobDataGlobally(null));

    // Prepare and send API call with properly formatted data
    console.log('Making pause API call');

    // Get the locations for this specific job
    const locationsKey = `locations_${jobData.id}`;
    AsyncStorage.getItem(locationsKey)
      .then(locationsStr => {
        let locationsData = [];

        try {
          if (locationsStr) {
            locationsData = JSON.parse(locationsStr);
            console.log(
              `Found ${locationsData.length} location points for pause API call`,
            );
          } else {
            console.log('No stored locations, using current location');
            // Fallback to current location if available
            if (location && location.length > 0) {
              locationsData = location;
            } else {
              // Create a minimal valid location entry
              const currentDate = new Date().toISOString();
              locationsData = [
                {
                  latitude: '0',
                  longitude: '0',
                  date: currentDate,
                },
              ];
            }
          }
        } catch (error) {
          console.error('Error parsing locations:', error);
          // Fallback to a minimal valid location
          const currentDate = new Date().toISOString();
          locationsData = [
            {
              latitude: '0',
              longitude: '0',
              date: currentDate,
            },
          ];
        }

        // Ensure the payload is correctly formatted
        const payload = {
          orgId,
          jobId: jobData.id,
          data: locationsData,
        };

        console.log(`Sending pause payload for job ${jobData.id}:`, payload);
        dispatch(hitJobPause(payload));
        onClose();
        console.log('Pause API call completed');
      })
      .catch(err => {
        console.error('Error loading locations:', err);
        // Even on error, send minimal data to avoid API errors
        const currentDate = new Date().toISOString();
        const fallbackData = [
          {
            latitude: '0',
            longitude: '0',
            date: currentDate,
          },
        ];

        dispatch(
          hitJobPause({
            orgId,
            jobId: jobData.id,
            data: fallbackData,
          }),
        );
      });
  };

  const renderInitialView = () => (
    <Animated.View
      style={[
        styles.contentContainer,
        {
          transform: [{translateX: textSlideAnim}],
        },
      ]}>
      <View>
        <Text style={styles.modalText}>Start the Job</Text>
      </View>

      <View style={{gap: 16, width: '100%'}}>
        <TouchableOpacity
          style={styles.modalClose}
          onPress={() => {
            onAvailableClick(2);
            hideModal();
          }}>
          <Text style={styles.modalCloseText}>See Available</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalClose} onPress={handleContinue}>
          <Text style={styles.modalCloseText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderProgressView = () => (
    <Animated.View
      style={[
        styles.contentContainer,
        {
          transform: [{translateX: textSlideAnim}],
        },
      ]}>
      <View style={styles.progressHeader}>
        {/* <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackIcon width={24} height={24} />
        </TouchableOpacity> */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>In Progress</Text>
          <Text style={styles.jobId}>{jobData?.number}</Text>
          <Text style={styles.companyText}>{jobData?.short_description}</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Note</Text>
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity style={styles.pauseButton} onPress={handleDirectPause}>
        <Text style={styles.pauseButtonText}>{'Pause'}</Text>
      </TouchableOpacity>

      <View style={styles.swipeContainer}>
        {!isSwipeCompleted ? (
          <SwipeButton
            title="Swipe to Complete"
            titleStyles={{
              fontWeight: '700',
              marginLeft: 30,
              fontSize: 16,
            }}
            thumbIconBackgroundColor="#DAFD90"
            thumbIconWidth={56}
            thumbIconBorderColor="transparent"
            railBackgroundColor={appColors.white}
            railFillBackgroundColor={appColors.white}
            railFillBorderColor={appColors.white}
            railBorderColor={appColors.white}
            disabledRailBackgroundColor={true}
            thumbIconComponent={RightArrowJobStart}
            titleColor={appColors.black}
            titleFontSize={16}
            height={56}
            disabled={false}
            disableResetOnTap={true}
            shouldResetAfterSuccess={true}
            thumbIconStyles={{
              borderRadius: 100,
              width: 56,
              height: 56,
            }}
            railStyles={{
              backgroundColor: appColors.white,
              height: 56,
              justifyContent: 'center',
              borderRadius: 100,
              paddingHorizontal: 1,
            }}
            onSwipeSuccess={() => onCompleteJob()}
          />
        ) : (
          <View>
            <ActivityIndicator color={appColors.white} />
          </View>
         )} 
      </View>
    </Animated.View>
  );

  return (
    <>
      {/* {visible && currentView === 'progress' && !isCompleted && (
        <Animated.View
          style={[
            styles.timeTrackerContainer,
            {
              transform: [{ translateY: trackerSlideAnim }],
            }
          ]}>
          <TimeTrackerCard
            data={demoData}
            isJobStarted={isJobStarted}
            setIsJobStarted={setIsJobStarted}
            isPaused={isPaused}
            handlePause={handlePause}
            handleResume={handleResume}
            handleStartStop={handleStartStop}
            showTracker={showTracker}
            timer={0}
            setTimer={setTimer}
          />
        </Animated.View>
      )} */}

      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={hideModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={hideModal}>
          <Animated.View
            style={[
              styles.modalBox,
              {
                transform: [{translateY: slideAnim}],
                opacity: opacityAnim,
              },
            ]}>
            <TouchableOpacity
              style={styles.modalContent}
              activeOpacity={1}
              onPress={() => {}}>
              {currentView === 'initial'
                ? renderInitialView()
                : renderProgressView()}
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  timeTrackerContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 112,
  },
  modalBox: {
    width: '90%',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: appColors.black,
    paddingHorizontal: 22,
    paddingVertical: 32,
    borderRadius: 32,
    alignItems: 'center',
    elevation: 10,
    shadowColor: appColors.black,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    overflow: 'hidden',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 32,
    color: appColors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
  modalClose: {
    backgroundColor: appColors.black,
    paddingVertical: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: appColors.borderLightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  statusContainer: {
    alignItems: 'center',
    flex: 1,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '700',
    color: appColors.white,
    marginBottom: 8,
  },
  jobId: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  companyText: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.white,
    width: '100%',
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: appColors.borderLightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: appColors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  pauseButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: appColors.white,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  pauseButtonText: {
    color: appColors.black,
    fontWeight: '700',
    fontSize: 16,
  },
  swipeContainer: {
    width: '100%',
    height: 64,
    marginTop: 4,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: '#DAFD90',
    width: '100%',
    height: 56,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#191C1F',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CenterButtonModal;

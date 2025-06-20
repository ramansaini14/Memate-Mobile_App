import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import { appColors } from '../utils/appColors';
import RightArrowWhite from '../assets/svg/RightArrowWhite';
import BackIcon from '../assets/svg/BackIcon';
import SwipeButton from 'rn-swipe-button';
import RightArrowJobStart from '../assets/svg/RightArrowJobStart';
import TrueIcon from '../assets/svg/TrueIcon';
import TimeTrackerCard from './TimeTrackerCard';

const CenterButtonModal = ({ visible, onClose, onStateChange }) => {
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

  const demoData = {
    id: 'THE-JB-113-234998',
    number: '113-234998',
    time_type_text: 'Time Frame',
    type_text: 'Hours',
  };

  useEffect(() => {
    if (visible) {
      setAnimating(true);
      slideAnim.setValue(300);
      opacityAnim.setValue(0);
      
      if (currentView === 'progress') {
        trackerSlideAnim.setValue(0);
      }

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
          })
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
      ...(currentView === 'progress' ? [
        Animated.timing(trackerSlideAnim, {
          toValue: -300,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        })
      ] : []),
    ]).start(() => {
      trackerSlideAnim.setValue(-300);
      setAnimating(false);
      onClose();
    });
  };

  const handleContinue = () => {
    onStateChange && onStateChange('play');
    
    Animated.timing(textSlideAnim, {
      toValue: -300, 
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentView('progress');
      setIsJobStarted(true);
      textSlideAnim.setValue(300);
      Animated.parallel([
        Animated.timing(textSlideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(trackerSlideAnim, {
          toValue: 0, 
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    });
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
    console.log("completed");
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

    const setTimer = () => {
       
  };

  const handlePauseClick = () => {
    if (isPaused) {
      onStateChange && onStateChange('play');
      setIsPaused(false);
    } else {
      onStateChange && onStateChange('pause');
      setIsPaused(true);
    }
  };

  const renderInitialView = () => (
    <Animated.View
      style={[
        styles.contentContainer,
        {
          transform: [{ translateX: textSlideAnim }],
        }
      ]}>
      <View>
        <Text style={styles.modalText}>Start the Job</Text>
      </View>

      <View style={{ gap: 16, width: '100%' }}>
        <TouchableOpacity
          style={styles.modalClose}
          onPress={() => console.log('clicked on see available')}>
          <Text style={styles.modalCloseText}>See Available</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalClose}
          onPress={handleContinue}>
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
          transform: [{ translateX: textSlideAnim }],
        }
      ]}>
      <View style={styles.progressHeader}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackIcon width={24} height={24} />
        </TouchableOpacity>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{isPaused ? 'Paused' : 'In Progress'}</Text>
          <Text style={styles.jobId}>THE-JB-113-234998</Text>
          <Text style={styles.companyText}>SMM | theAd Templates</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Note</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.pauseButton} onPress={handlePauseClick}>
        <Text style={styles.pauseButtonText}>{isPaused ? 'Resume' : 'Pause'}</Text>
      </TouchableOpacity>

      <View style={styles.swipeContainer}>
        {!isCompleted ? (
          <SwipeButton
            title="Swipe to Complete"
            titleStyles={{
              fontWeight: '700',
              marginLeft: 30,
              fontSize: 16,
            }}
            thumbIconBackgroundColor='#DAFD90'
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
            onSwipeSuccess={handleCompleteJob}
          />
        ) : (
          <TouchableOpacity style={styles.doneButton} disabled={true}>
            <TrueIcon width={25} height={25} />
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );

  return (
    <>
      {visible && currentView === 'progress' && !isCompleted && (
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
      )}

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
                transform: [{ translateY: slideAnim }],
                opacity: opacityAnim,
              }
            ]}>
            <TouchableOpacity
              style={styles.modalContent}
              activeOpacity={1}
              onPress={() => { }}>
              {currentView === 'initial' ? renderInitialView() : renderProgressView()}
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
    shadowOffset: { width: 0, height: 10 },
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
    fontSize: 16,
    fontWeight: '600',
    color: appColors.white,
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
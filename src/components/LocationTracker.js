import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  // Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import SwipeButton from 'rn-swipe-button';
import {appColors} from '../utils/appColors';
import RightArrowJobStart from '../assets/svg/RightArrowJobStart';
import PauseJobIcon from '../assets/svg/PauseJobIcon';
// import CrossCloseIcon from '../assets/svg/CrossCloseIcon';
import StartJobPlayIcon from '../assets/svg/StartJobPlayIcon';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearJobStatus,
  hitJobPause,
  hitJobStart,
  hitJobStop,
} from '../redux/JobStatusSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { 
  increment, 
  startTimer, 
  pauseTimer, 
  resumeTimer,
  selectJobTimer 
} from '../redux/TimerSlice';

const LocationTracker = ({
  isJobStarted,
  setIsJobStarted,
  isPaused,
  handlePause,
  handleResume,
  handleStartStop,
  data,
  orgId,
  showTracker,
  setShowTracker,
  timer
}) => {
  const dispatch = useDispatch();
  const [isStopped, setStopped] = useState(false);

  // Get job-specific timer info from Redux
  const jobTimer = useSelector(state => selectJobTimer(state, data.id));
  const activeJobId = useSelector(state => state.timer.activeJobId);

  const responseApi = useSelector(state => state.jobsStatusReducer.data);
  // console.log('responseApi', responseApi.timer);

  const handleStart = () => setShowTracker(false);
  // const handleStop = () => setShowTracker(false);

  const [location, setLocation] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Log props for debugging
  useEffect(() => {
    console.log(`LocationTracker render for job ${data.id} - props:`, { 
      isJobStarted, 
      isPaused, 
      showTracker, 
      timer,
      isActive: activeJobId === data.id 
    });
  }, [isJobStarted, isPaused, showTracker, timer, activeJobId, data.id]);

  useEffect(() => {
    const requestPermission = async () => {
      const permission = await hasLocationPermission();
      setPermissionGranted(permission);

      if (!permission) {
        Alert.alert(
          'Permission Required',
          'This app requires location access to function properly.',
          [{text: 'OK'}],
        );
      }
    };

    requestPermission();
  }, []);
  const intervalRef = useRef(null);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // setLocation({latitude, longitude});

        setLocation(prevLocations => {
          const updatedLocations = prevLocations ? [...prevLocations] : [];
          updatedLocations.push({
            latitude,
            longitude,
            date: new Date().toISOString(),
          });
          console.log(`Location for job ${data.id}:`, updatedLocations);
          // Save updated locations to AsyncStorage with job-specific key
          const locationsKey = `locations_${data.id}`;
          AsyncStorage.setItem(locationsKey, JSON.stringify(updatedLocations))
            .then(() => console.log(`Locations saved to AsyncStorage for job ${data.id}`))
            .catch(error => console.error(`Error saving locations for job ${data.id}:`, error));

          return updatedLocations;
        });
      },
      error => {
        console.error('Location error:', error.message);
        Alert.alert('Error', 'Could not fetch location. Try again.');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
      },
    );
  };

  useEffect(() => {
    if (permissionGranted) {
      getLocation();
      if (timer != null && isJobStarted && !isPaused) {
        startTracking()
      }
    }
  }, [permissionGranted, isJobStarted, isPaused]);

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await Geolocation.requestAuthorization('whenInUse');
      return authStatus === 'granted';
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'App needs access to your location.',
        buttonPositive: 'OK',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const startTracking = async () => {
    const permission = await hasLocationPermission();
    if (!permission) {
      Alert.alert('Permission denied', 'Cannot track without permission.');
      return;
    }

    console.log(`Starting location tracking interval for job ${data.id}`);
    // getLocation();
    setShowTracker(true);

    // Clear existing interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      getLocation();
    }, 10000);
  };

  const stopTracking = async () => {
    console.log(`Stopping tracking for job ${data.id}`);
    // Get locations for this specific job
    const locationsKey = `locations_${data.id}`;
    const locationsStr = await AsyncStorage.getItem(locationsKey);
    
    // Parse the locations data to ensure it's in the right format
    let locationsData = [];
    try {
      if (locationsStr) {
        locationsData = JSON.parse(locationsStr);
        console.log(`Retrieved ${locationsData.length} location points for job ${data.id}`);
      } else {
        console.log(`No stored locations found for job ${data.id}, using current location`);
        // If no stored locations, create at least one entry with current time
        const currentDate = new Date().toISOString();
        locationsData = [{
          latitude: "0",
          longitude: "0", 
          date: currentDate
        }];
        
        // Try to get the last known location if available
        if (location && location.length > 0) {
          locationsData = [location[location.length - 1]];
        }
      }
    } catch (error) {
      console.error(`Error parsing locations for job ${data.id}:`, error);
      // Provide fallback data
      const currentDate = new Date().toISOString();
      locationsData = [{
        latitude: "0",
        longitude: "0", 
        date: currentDate
      }];
    }
    
    setStopped(true);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log(`Tracking stopped for job ${data.id}`);
    }
    
    setShowTracker(false);
    
    // First update the Redux timer state to reflect the pause
    dispatch(pauseTimer(data.id));
    
    // Then send the API call with the location data
    const payload = {
      orgId: orgId,
      jobId: data.id,
      data: locationsData // Send the validated location data
    };
    
    console.log(`Sending pause payload for job ${data.id}:`, payload);
    
    // Sequence the API call after state change
    dispatch(hitJobPause(payload));
  };

  // Monitor job's running state, managing location tracking interval
  useEffect(() => {
    if (isJobStarted && !isPaused) {
      console.log(`Job ${data.id} is started and not paused, starting tracking`);
      startTracking();
    } else if (isJobStarted && isPaused) {
      console.log(`Job ${data.id} is paused, stopping tracking`);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        console.log(`Cleaning up interval for job ${data.id}`);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isJobStarted, isPaused, data.id]);

  const onStartPress = () => {
    console.log(`onStartPress for job ${data.id}`);
    
    if (handleStartStop) {
      handleStartStop(); // Use the provided handler
      return;
    }
    
    // Fall back to original behavior if handler not provided
    setIsJobStarted(true);
    setShowTracker(true);
    setStopped(false);
    const currentDate = new Date().toISOString();
    
    // Use latest location data if available
    let locationToSend = {
      latitude: "0",
      longitude: "0",
      date: currentDate,
    };
    
    if (location && location.length > 0) {
      locationToSend = {
        latitude: location[0]?.latitude.toString() || "0",
        longitude: location[0]?.longitude.toString() || "0",
        date: currentDate,
      };
    }
    
    const payload = {
      orgId: orgId,
      jobId: data.id,
      data: [locationToSend],
    };

    // Start the timer for this specific job
    dispatch(startTimer(data.id));
    dispatch(hitJobStart(payload));
  };

  useEffect(() => {
    if (
      responseApi != null &&
      responseApi.hasOwnProperty('timer') &&
      responseApi.jobId === data.id // Only process for this job
    ) {
      if (!isStopped) {
        // setTimer(Math.floor(responseApi.timer));   
        setIsJobStarted(true);
        setShowTracker(true);
        startTracking();
      }
    }
    // Only clear if this response is for our job
    if (responseApi && responseApi.jobId === data.id) {
      dispatch(clearJobStatus());
    }
  }, [responseApi]);

  // Add useEffect to log when isPaused changes
  useEffect(() => {
    console.log(`LocationTracker job ${data.id}: isPaused state changed to:`, isPaused);
  }, [isPaused, data.id]);

  // Handle button presses with better error handling
  const handlePauseButtonPress = () => {
    console.log(`Pause button pressed in LocationTracker for job ${data.id}, current isPaused:`, isPaused);
    
    // If job isn't started yet, use startStop handler first
    if (!isJobStarted) {
      console.log(`Job ${data.id} not started, starting it first`);
      if (handleStartStop) {
        handleStartStop();
      } else {
        onStartPress();
      }
      return;
    }
    
    // Pause only if we're running
    if (isJobStarted && !isPaused) {
      console.log(`Calling handlePause to pause job ${data.id}`);
      
      // We can't set isPaused directly here since it's a prop
      // Let the parent component handle state changes through the handlePause callback
      if (handlePause) {
        handlePause();
      } else {
        stopTracking();
      }
    } else {
      console.log(`Job ${data.id} already paused, cannot pause again`);
    }
  };

  const handleResumeButtonPress = () => {
    console.log(`Resume button pressed in LocationTracker for job ${data.id}, current isPaused:`, isPaused);
    
    // Resume only if we're paused
    if (isJobStarted && isPaused) {
      console.log(`Calling handleResume to resume job ${data.id}`);
      if (handleResume) {
        handleResume();
      } else {
        // If no custom handler, resume with defaults
        // Don't set isPaused directly since it's a prop
        // But we can still update Redux state
        dispatch(startTimer(data.id));
        dispatch(resumeTimer(data.id));
        
        startTracking();
      }
    } else {
      console.log(`Job ${data.id} not paused, cannot resume`);
    }
  };
  
  const handleStartJobPress = () => {
    console.log(`Start Job button pressed in LocationTracker for job ${data.id}`);
    if (handleStartStop) {
      handleStartStop();
    } else {
      onStartPress();
    }
  };

  return (
    <View style={styles.container}>
      {isJobStarted || data.action_status == 1 || data.action_status == 2 ? (
        <View style={styles.containerInner}>
          <SwipeButton
            width={270}
            title="Swipe to Complete"
            titleStyles={{
              fontWeight: '700',
              marginLeft: 30,
            }}
            thumbIconBackgroundColor={appColors.jobLightGreen}
            thumbIconWidth={50}
            thumbIconBorderColor="transparent"
            railBackgroundColor={appColors.black}
            railFillBackgroundColor={appColors.black}
            railFillBorderColor={appColors.black}
            railBorderColor={appColors.black}
            disabledRailBackgroundColor={true}
            // resetAfterSuccessAnimDelay={1000}
            thumbIconComponent={RightArrowJobStart}
            titleColor={appColors.white}
            titleFontSize={16}
            thumbIconStyles={{
              borderRadius: 50,
            }}
            railStyles={{
              backgroundColor: appColors.black,
              flex: 1,
              justifyContent: 'center',
            }}
            onSwipeSuccess={handleStart}
          />
          {/* Force re-render of the correct icon using key */}
          {isPaused ? (
            // Job is paused - show play button
            <TouchableOpacity
              key="resume-button"
              style={styles.pauseIcon}
              onPress={handleResumeButtonPress}>
              <StartJobPlayIcon />
              <View style={{alignItems: 'center'}}>
                {/* <Text style={styles.iconText}>Play</Text> */}
              </View>
            </TouchableOpacity>
          ) : (
            // Job is running - show pause button
            <TouchableOpacity
              key="pause-button"
              style={styles.pauseIcon}
              onPress={handlePauseButtonPress}>
              <PauseJobIcon />
              <View style={{alignItems: 'center'}}>
                {/* <Text style={styles.iconText}>Pause</Text> */}
              </View>
            </TouchableOpacity>
          )}
          {/* <Tracker onStop={handleStop} /> */}
        </View>
      ) : (
        <TouchableOpacity 
          style={{paddingHorizontal: 32}} 
          onPress={handleStartJobPress}>
          <Text
            style={[
              styles.confirmButton,
              {paddingVertical: 14, borderRadius: 32},
            ]}>
            Start the Job
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add container styles if needed
  },
  pauseIcon: {
    // borderWidth: 8,
    height: 50,
    width: 50,
    backgroundColor: appColors.black,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  containerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 40,
  },
  confirmButton: {
    backgroundColor: appColors.black,
    color: appColors.white,
    fontSize: 16,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: appColors.black,
    flex: 1,
    textAlign: 'center',
    padding: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  iconText: {
    color: appColors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default LocationTracker;

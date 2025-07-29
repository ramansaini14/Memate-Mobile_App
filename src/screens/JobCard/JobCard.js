import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Alert,
  Modal,
  TextInput,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
  Linking,
  NativeModules,
  AppState,
} from 'react-native';
import React, {useEffect, useState, useRef, use} from 'react';
import {appColors} from '../../utils/appColors';
import WhiteBackIcon from '../../assets/svg/WhiteBackIcon';
import CalenderIcon from '../../assets/svg/CalenderIcon';
import MenuIcon from '../../assets/svg/MenuIcon';
import NotificationIcon from '../../assets/svg/NotificationIcon';
import SettingIcon from '../../assets/svg/SettingIcon';
import CopyIcon from '../../assets/svg/CopyIcon';
import ExpandIcon from '../../assets/svg/ExpandIcon';
import {Buffer} from 'buffer';
// import Map2 from '../../assets/svg/Map2';
import DocumentIcon from '../../assets/svg/DocumentIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  clearJobsAcceptDecline,
  hitAcceptJobs,
  hitDeclineJobs,
} from '../../redux/JobsAcceptDeclineSlice';
import MapIcon from '../../assets/svg/MapIcon';
import Clipboard from '@react-native-clipboard/clipboard';
import LocationTracker from '../../components/LocationTracker';
import {BlurView} from '@react-native-community/blur';
import CrossCloseIcon from '../../assets/svg/CrossCloseIcon';
import TimeTrackerCard from '../../components/TimeTrackerCard';
import moment from 'moment';
import ChatIconJob from '../../assets/svg/ChatIconJob';
import {increment, setTimer, stopBackgroundTimer} from '../../redux/TimerSlice';
import {
  hitJobStart,
  hitJobPause,
  hitJobStop,
  clearJobStatus,
} from '../../redux/JobStatusSlice';
import Geolocation from 'react-native-geolocation-service';
import {
  startTimer,
  pauseTimer,
  resumeTimer,
  stopTimer,
  startBackgroundTimer,
  loadTimerStateFromStorage,
  selectJobTimer,
} from '../../redux/TimerSlice';
import DoneTickButton from '../../assets/svg/DoneTickButton';
import AddImageIcon from '../../assets/svg/AddImageIcon';
import CameraLibraryModal from '../../components/CameraLibraryModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  clearAttachmentFileUrl,
  hitAttachmentFileUrl,
} from '../../redux/AttachmentFileUrlSlice';
import TimerManager from '../../services/TimeManager';
import {useLiveActivityTimer} from '../../hooks/useLiveActivityTimer';
// import {uploadImageToS3} from '../../redux/uploadSlice';

import RNFS from 'react-native-fs';
import {PermissionsAndroid, Platform} from 'react-native';
import {setIsPayused, setJobDataGlobally} from '../../redux/GlobalSlice';
import {clearStartStatus, hitStartJob} from '../../redux/StartJobSlice';
import {clearPauseStatus, hitPauseJob} from '../../redux/PauseJobSlice';
import ImagePicker from 'react-native-image-crop-picker';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {startCallTimer, stopCallTimer} from '../../services/backgroundService';

const {MeMateTimer} = NativeModules;

const JobCard = ({navigation, route}) => {
  // Manage Live Activity based on TimerManager state
  Platform.OS == 'ios' && useLiveActivityTimer();

  const [showTracker, setShowTracker] = useState(true);
  const {data} = route.params;
  const [jobData, setJobData] = useState(data);
  const dispatch = useDispatch();
  const [orgId, setOrgId] = useState('');
  const [isAccept, setAccept] = useState(false);
  const [isDecline, setDecline] = useState(false);
  const [reason, setReason] = useState('');
  let text = jobData.long_description;
  const [isJobStarted, setIsJobStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [jobCompleteLoad, setJobCompleteLoad] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSwipeCompleted, setIsSwipeCompleted] = useState(false);
  const [isExpand, setExpand] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [time, setTime] = useState('00:00:00');

  // Get global timer state (primarily for the active job)
  const globalTimer = useSelector(state => state.timer.value);
  const {isPausedGlobal} = useSelector(
    state => state.globalReducer.isPausedGlobal,
  );
  const jobDataGlobally = useSelector(state => state.globalReducer.jobData);
  const globallyOrgData = useSelector(
    state => state.globalReducer.globallyOrgData,
  );

  // Get the job-specific timer for this job
  const jobTimer = useSelector(state => selectJobTimer(state, jobData.id));

  // Use the job-specific timer value instead of the global one
  const timer = jobTimer ? jobTimer.value : 0;

  // Track which job is active in the Redux store
  const activeJobId = useSelector(state => state.timer.activeJobId);

  const intervalRef = useRef(null);
  const [lastApiCallTime, setLastApiCallTime] = useState(0);
  const [location, setLocation] = useState([]);

  const responseAccDec = useSelector(
    state => state.jobsAcceptDeclineReducer.data,
  );
  const {error} = useSelector(state => state.jobsAcceptDeclineReducer);
  const attachmentResponse = useSelector(
    state => state.attachmentFileUrlReducer.data,
  );

  const jobStatusResponse = useSelector(state => state.jobsStatusReducer.data);
  const {errorStartJob, statusStartJob} = useSelector(
    state => state.jobsStartReducer,
  );
  const responseJobStart = useSelector(state => state.jobsStartReducer.data);
  const {errorJobPause, statusJobPause} = useSelector(
    state => state.jobPauseReducer,
  );
  const responseJobPause = useSelector(state => state.jobPauseReducer.data);

  const getOrgId = async () => {
    const orgId = globallyOrgData ? globallyOrgData.id : null;
    setOrgId(orgId);
  };

  const onAccept = () => {
    const payload = {
      orgId: orgId,
      jobId: jobData.id,
    };
    console.log('Payload Accept ===> ', payload);
    dispatch(hitAcceptJobs(payload));
  };

  const onDecline = () => {
    setDecline(false);
    const payload = {
      orgId: orgId,
      jobId: jobData.id,
      message: reason,
    };
    dispatch(hitDeclineJobs(payload));
  };

  useEffect(() => {
    console.log(
      `JobCard mounted for job ID: ${jobData.id}, action_status:`,
      jobData.action_status,
    );

    getOrgId();

    console.log('jobDataGlobally inner ===> ', jobData);

    if (jobData != null) {
      if (jobData.action_status == '2') {
        console.log('Inner Job Data');
        setIsJobStarted(true);
        setIsPaused(true); // Start in paused state
        dispatch(stopTimer(jobData.id)); // Ensure timer is stopped
        const payload = {
          jobId: jobData.id,
          value: jobData.time_spent, // Use jobData.time_spent if available
        };
        dispatch(setTimer(payload));

        // Need to manually trigger the Redux state as well
        setTimeout(() => {
          console.log(
            `Dispatching startTimer for initial job start for job ${jobData.id}`,
          );
          // dispatch(startTimer(jobData.id));
          // startBackgroundTimer(dispatch);
          // startLocationTracking();
        }, 500);
      } else if (jobData.action_status == 1) {
        setIsJobStarted(true);
        setIsPaused(false); // Start in running state
        const payload = {
          jobId: jobData.id,
          value: jobData.time_spent, // Use jobData.time_spent if available
        };
        // dispatch(setTimer(payload));
        dispatch(resumeTimer(jobData.id)); // Ensure timer is resumed

        // Need to manually trigger the Redux state as well
        setTimeout(() => {
          console.log(
            `Dispatching startTimer for initial job start for job ${jobData.id}`,
          );
          dispatch(startTimer(jobData.id));
          startBackgroundTimer(dispatch);
          startLocationTracking();
        }, 500);
      } else if (jobData.action_status == null) {
        setIsJobStarted(false);
        setIsPaused(false);
        setShowTracker(false); // Initially hide tracker
      }
    } else {
      console.log(
        `JobCard mounted for job ID: ${jobData.id}, no global job data`,
      );
      setIsJobStarted(false);
      setIsPaused(false);
      setShowTracker(false); // Initially hide tracker
    }
    if (jobData.action_status == 3) {
      setIsCompleted(true);
    }
    return () => {
      console.log(`JobCard unmounting for job ID: ${jobData.id}`);
    };
  }, [jobData.id]);

  // const startTimerWidget = async()=>{
  //   MeMateTimer.endTimer()
  //   MeMateTimer.startTimer("🔥", timer)
  //   // console.log("memateStartTimer ===> ",memateStartTimer)
  // }
  /**
   * Timer UseEffect
   * @returns <unsubscribe()>
   */
  // useEffect(() => {
  //     // Initialize timer
  //     TimerManager.initialize();

  //     // Subscribe to timer updates
  //     const unsubscribe = TimerManager.addListener((seconds) => {
  //         setTime(TimerManager.getFormattedTime(seconds));
  //     });

  //     // Add AppState listener (sync no longer needed as Redux handles state)
  //     const handleAppStateChange = (nextAppState) => {
  //         console.log('JobCard: App state changed to:', nextAppState);
  //         // Redux store handles timer state persistence automatically
  //     };

  //     const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

  //     return () => {
  //         unsubscribe();
  //         appStateSubscription?.remove();
  //     };
  // }, []);

  // startTimerWidget function removed - Live Activities are now handled automatically by useLiveActivityTimer hook

  useEffect(() => {
    // startTimerWidget()
  }, [timer]);

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    console.log('statusStartJob ===> ', statusStartJob);
    if (responseJobStart != null) {
      dispatch(startTimer(jobData.id));
      startBackgroundTimer(dispatch);
      startLocationTracking();
      setIsJobStarted(true);
      setIsPaused(false); // Start in running state

      const tempJob = {
        ...jobData,
        action_status: '1',
        action_status_text: 'started',
      };
      console.log('setJobDataGlobally called in responseJobStart');
      dispatch(setJobDataGlobally(tempJob)); // Update global job data
      startCallTimer(timer);

      // Live Activities are now handled automatically by useLiveActivityTimer hook
      // No manual timer widget start needed
      setJobData(tempJob); // Update local job data
      dispatch(clearJobStatus());
      dispatch(clearStartStatus());
      dispatch(clearPauseStatus());
    } else if (statusStartJob > 399) {
      Alert.alert('MeMate', errorStartJob.message);
      dispatch(clearStartStatus());
    }
  }, [responseJobStart, errorStartJob, statusStartJob]);
  useEffect(() => {
    if (responseJobPause != null) {
      console.log('responseJobPause ===> ', responseJobPause);
      if (Platform.OS == 'ios') {
        TimerManager.stop();
      } else {
        stopCallTimer();
      }
      dispatch(pauseTimer(jobData.id));
      stopBackgroundTimer(dispatch);
      stopLocationTracking();
      setIsJobStarted(false);
      setIsPaused(true); // Start in running state
      dispatch(clearJobStatus());
      dispatch(clearStartStatus());
      dispatch(clearPauseStatus());
      console.log('setJobDataGlobally called in responseJobPause');
      dispatch(setJobDataGlobally(null));
    } else if (statusJobPause == 400) {
      Alert.alert(
        'MeMate',
        errorJobPause || 'Failed to start job. Please try again.',
      );
    }
  }, [errorJobPause, statusJobPause, responseJobPause]);

  // Function to start location tracking
  const startLocationTracking = () => {
    console.log(`Starting location tracking for job ${jobData.id}`);

    // Get initial location
    getCurrentLocation();
    dispatch(setIsPayused(false)); // Reset completed state when starting tracking
    console.log('setJobDataGlobally called in startLocationTracking');
    dispatch(setJobDataGlobally(jobData)); // Update global job data
    // MeMateTimer.startTimer("🔥", 0)

    // Set up regular location tracking
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        getCurrentLocation();
      }, 60000); // Every 30
    }
  };

  useEffect(() => {
    if (jobDataGlobally) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log('Location tracking interval cleared');
      // dispatch(setIsPayused(true)); // Reset completed state when stopping tracking
      // dispatch(setJobDataGlobally(null));
    }
  }, [jobDataGlobally]);

  // Create a better location tracking control function
  const stopLocationTracking = () => {
    console.log(`Stopping location tracking for job ${jobData.id}`);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log('Location tracking interval cleared');
      dispatch(setIsPayused(true)); // Reset completed state when stopping tracking
      console.log('setJobDataGlobally null called in stopLocationTracking');
      dispatch(setJobDataGlobally(null));
      // MeMateTimer.endTimer()
      // TimerManager.stopTimer()
    }
  };

  /**
   * Handles the pause action for the job.
   */
  const onPauseClick = () => {
    stopLocationTracking();
    // Update Redux timer state to paused
    dispatch(pauseTimer(jobData.id));
    setIsPaused(true);
    stopCallTimer();

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
        dispatch(hitPauseJob(payload));
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
    setJobData(prevData => ({
      ...prevData,
      status: '3',
      status_text: 'Require confirmation',
      action_status: 3,
      action_status_text: 'Finished',
      // new id value
    }));

    // Stop location tracking
    stopLocationTracking();

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

  // const handleDirectResume = () => {
  //   console.log(`Direct resume called for job ${jobData.id}, current state:`, {
  //     isJobStarted,
  //     isPaused,
  //     timer,
  //     activeJobId,
  //   });

  //   // Only if we're in a paused state
  //   if (isJobStarted && isPaused) {
  //     console.log(`Resuming job ${jobData.id}`);

  //     // Update local state
  //     setIsPaused(false);
  //     setShowTracker(true);

  //     // Update Redux timer state to resumed
  //     dispatch(resumeTimer(jobData.id));

  //     // Make sure background timer is running and this job is active
  //     dispatch(startTimer(jobData.id)); // Ensure this job becomes the active job
  //     startBackgroundTimer(dispatch);

  //     // Explicitly restart location tracking
  //     startLocationTracking();
  //     console.log('Location tracking restarted for resumed job');

  //     // API call
  //     console.log('Making resume API call');
  //     getCurrentLocation();
  //   } else {
  //     console.log('Cannot resume: job not started or not paused', {
  //       isJobStarted,
  //       isPaused,
  //     });
  //   }
  // };

  const onStartClick = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const currentDate = new Date().toISOString();
        const locationData = {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          date: currentDate,
        };

        // Send to API
        const payload = {
          orgId,
          jobId: jobData.id,
          data: [locationData],
        };

        dispatch(hitStartJob(payload));
      },
      error => {
        console.error('Location error:', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };
  //   console.log(
  //     `handleStartStop called for job ${jobData.id}, current state:`,
  //     {
  //       isJobStarted,
  //       isPaused,
  //       timer,
  //       activeJobId,
  //     },
  //   );

  //   if (!isJobStarted) {
  //     console.log(`Starting job ${jobData.id}`);

  //     // Starting the job
  //     setIsJobStarted(true);
  //     setIsPaused(false);
  //     setShowTracker(true);

  //     // Update Redux timer state to started
  //     dispatch(startTimer(jobData.id));

  //     // Make sure background timer is running
  //     startBackgroundTimer(dispatch);

  //     // Start location tracking
  //     startLocationTracking();

  //     // Start job API
  //     getCurrentLocation();

  //     // Update UI immediately, don't wait for state updates
  //     console.log('Job started successfully');
  //     return true;
  //   } else if (isJobStarted && !isPaused) {
  //     // If job is running, pause it
  //     console.log('Job is running, pausing it');
  //     handleDirectPause();
  //     return true;
  //   } else if (isJobStarted && isPaused) {
  //     // If job is paused, resume it
  //     console.log('Job is paused, resuming it');
  //     handleDirectResume();
  //     return true;
  //   }

  //   return false;
  // };

  // Add this function to directly start the job (called from UI components)
  // const startJob = () => {
  //   console.log(`startJob called directly for job ${jobData.id}`);
  //   handleStartStop();
  // };

  // Monitor job status response
  useEffect(() => {
    console.log('jobStatusResponse  ====> ', jobStatusResponse);
    if (jobStatusResponse && jobStatusResponse.jobId === jobData.id) {
      if (jobStatusResponse.hasOwnProperty('timer')) {
        // If we got a timer from the API
        if (!isPaused) {
          setIsJobStarted(true);
        }
        if (isSwipeCompleted) {
          isSwipeCompleted(false);
        }

        if (jobData.action_status == 3) {
          setIsCompleted(true);
        }
      }

      // Clear the response after processing
      dispatch(clearJobStatus());
    }
  }, [jobStatusResponse, jobData.id]);

  useEffect(() => {
    if (attachmentResponse != null && attachmentResponse.status == 200) {
      console.log('attachmentResponse ====> ', attachmentResponse);
      dispatch(
        uploadImageToS3({
          localFilePath: selectedImage.uri,
          presignedUrl: attachmentResponse.data.url,
        }),
      );
      dispatch(clearAttachmentFileUrl());
    }
  }, [attachmentResponse]);

  const uploadImageToS3 = createAsyncThunk(
    'upload/uploadImageToS3',
    async ({localFilePath, presignedUrl}, {rejectWithValue}) => {
      try {
        // Read file as base64 and convert to binary buffer
        const base64 = await RNFS.readFile(localFilePath, 'base64');
        const buffer = Buffer.from(base64, 'base64');

        console.log('🟡 Uploading to:', presignedUrl);
        console.log('📄 File path:', localFilePath);
        console.log('➡️ Request Body Length (bytes):', buffer.length);

        // Send PUT request using fetch (no Content-Type)
        const response = await fetch(presignedUrl, {
          method: 'PUT',
          body: buffer,
          headers: {
            // Do not set 'Content-Type' – presigned URL already defines it
          },
        });

        console.log('🟢 Upload status:', response.status);

        if (response.ok) {
          console.log('✅ Upload successful!');
          return '✅ Upload successful!';
        } else {
          const errorText = await response.text();
          console.error('❌ Upload failed:', response.status, errorText);
          return rejectWithValue(
            `Upload failed with status ${response.status}`,
          );
        }
      } catch (error) {
        console.error('❌ Upload error:', error);
        return rejectWithValue(error?.message || 'Unknown error');
      }
    },
  );

  const handleCopy = () => {
    Clipboard.setString(text);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied!', 'Text copied to clipboard');
    }
  };

  useEffect(() => {
    console.log('Response ACC Dec', responseAccDec);
    if (responseAccDec != null) {
      if (responseAccDec.status == 'OK') {
        setAccept(false);
        setJobData(prevData => ({
          ...prevData,
          status: 'a',
          status_text: 'Accepted',
          // new id value
        }));
        // jobData.status = 'a';
        // jobData.status_text = 'Accepted';
        // setJobData(jobData);
        // navigation.navigate('JobCardConfirmButton');
        dispatch(clearJobsAcceptDecline());
      } else {
        setAccept(false);
        Alert.alert('MeMate', 'Internal server error');
      }
    }
  }, [responseAccDec, jobData.id]);

  useEffect(() => {
    console.log('Response error', error);
    if (error != null) {
      Alert.alert('MeMate', error.detail);
      dispatch(clearJobsAcceptDecline());
    }
  }, [error]);

  // Add useEffect to synchronize component state with Redux job-specific state
  // useEffect(() => {
  //   if (jobTimer) {
  //     const shouldUpdateRunning = jobTimer.isRunning !== isJobStarted;
  //     const shouldUpdatePaused = jobTimer.isPaused !== isPaused;

  //     if (shouldUpdateRunning || shouldUpdatePaused) {
  //       console.log(
  //         `Synchronizing job ${jobData.id} state with Redux timer state:`,
  //         {
  //           reduxIsRunning: jobTimer.isRunning,
  //           reduxIsPaused: jobTimer.isPaused,
  //           componentIsRunning: isJobStarted,
  //           componentIsPaused: isPaused,
  //         },
  //       );

  //       setIsJobStarted(jobTimer.isRunning);
  //       setIsPaused(jobTimer.isPaused);
  //     }
  //   }
  // }, [jobTimer, jobData.id]);

  // Update to force proper rerendering of child components when state changes
  useEffect(() => {
    console.log(`JobCard ${jobData.id} isPaused state changed to:`, isPaused);

    // Force a refresh of components that depend on this state
    if (isPaused) {
      console.log(
        `Job ${jobData.id} is now paused, stopping location tracking`,
      );
      stopLocationTracking();
    } else if (isJobStarted) {
      console.log(
        `Job ${jobData.id} is now running, starting location tracking`,
      );
      startLocationTracking();
    }
  }, [isPaused, isJobStarted, jobData.id]);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const currentDate = new Date().toISOString();
        const locationData = {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          date: currentDate,
        };

        // Update local state
        setLocation(prev => [...(prev || []), locationData]);
      },
      error => {
        console.error('Location error:', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const [modalVisible, setModalVisible] = useState(false);
  const options = {
    mediaType: 'photo',
    cameraType: 'back',
    quality: 1,
  };

  const handleSelect = type => {
    setModalVisible(false);
    if (type == 'camera') {
      onCameraPress();
      console.log('Open Camera');
    } else if (type == 'library') {
      onGalleryClick();
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const onCameraPress = async () => {
    console.log('Camera Pressed');
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;

      const result = await launchCamera(options);
      if (result.didCancel) {
        console.log('User cancelled camera');
      } else if (result.errorCode) {
        console.log('Camera Error: ', result.errorMessage);
      } else {
        console.log('Camera Image: ', result.assets[0]);
        setSelectedImage(result.assets[0]);
        const payload = {
          orgId: orgId,
          jobId: jobData.id,
          filename: result.assets[0].fileName,
        };
        console.log('Payload for attachment file URL:', payload);
        dispatch(hitAttachmentFileUrl(payload));
      }
    } catch (err) {
      console.log('Camera launch error', err);
    }
  };

  async function requestGalleryPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Storage Permission',
          message: 'App needs access to your photos',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  }
  const onGalleryClick = async () => {
    console.log('Open Gallery');

    const permissionGranted = await requestGalleryPermission();

    if (!permissionGranted) {
      console.log('Gallery permission denied');
      return;
    }

    try {
      const result = await launchImageLibrary(options);
      if (result.didCancel) {
        console.log('User cancelled gallery');
      } else if (result.errorCode) {
        console.log('Gallery Error: ', result.errorMessage);
      } else {
        console.log('Gallery Image: ', result.assets[0]);
        setSelectedImage(result.assets[0]);
        const payload = {
          orgId: orgId,
          jobId: jobData.id,
          filename: result.assets[0].fileName,
          type: 'before',
        };
        console.log('Payload for attachment file URL:', payload);
        dispatch(hitAttachmentFileUrl(payload));
      }
    } catch (err) {
      console.log('Gallery launch error', err);
    }
  };

  const downloadFile = async (fileUrl, fileName) => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download the file',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Storage permission not granted');
          return;
        }
      }

      const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      const options = {
        fromUrl: fileUrl,
        toFile: downloadDest,
      };

      const result = await RNFS.downloadFile(options).promise;

      if (result.statusCode === 200) {
        Alert.alert('Success', `File downloaded to: ${downloadDest}`);
      } else {
        Alert.alert('Download failed', 'Status Code: ' + result.statusCode);
      }
    } catch (error) {
      Alert.alert('Download error', error.message);
    }
  };

  const uploadToS3 = async (file, url) => {
    try {
      const response = await axios.put(url, file, {
        headers: {
          'Content-Type': '',
        },
        onUploadProgress: progressEvent => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100,
          );
          setFiles(prevFiles => {
            return prevFiles.map(f =>
              f.name === file.name ? Object.assign(f, {progress, url}) : f,
            );
          });
        },
      });

      // Mark as successfully uploaded
      setFiles(prevFiles => {
        return prevFiles.map(f =>
          f.name === file.name
            ? Object.assign(f, {progress: 100, uploaded: true})
            : f,
        );
      });

      return response;
    } catch (err) {
      // Handle specific error types
      let errorMessage = 'Upload failed';

      if (err.response) {
        if (err.response.status === 403) {
          errorMessage = 'Permission denied (403 Forbidden)';
        } else {
          errorMessage = `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMessage = 'No response from server';
      } else {
        errorMessage = err.message;
      }

      console.error(`Error uploading ${file.name}:`, errorMessage);

      // Update file with error status but don't stop other uploads
      setFiles(prevFiles => {
        return prevFiles.map(f =>
          f.name === file.name
            ? Object.assign(f, {
                progress: 0,
                error: true,
                errorMessage,
                uploadFailed: true,
              })
            : f,
        );
      });

      // Return error object instead of throwing
      return {error: true, message: errorMessage};
    }
  };

  const openInMaps = address => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
    });

    Linking.openURL(url).catch(err =>
      console.error('Failed to open map:', err),
    );
  };

  // useEffect(() => {
  //   console.log("ACTION STATUS ===> ", jobData.action_status);
  //   if(jobData.action_status == 1 ){
  //     resumeTimer(jobData.time_progress);
  //   }
  // },[])

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <View style={{height: 40, width: 40}}>
          <WhiteBackIcon onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.usernameStyle}>Job Card</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={{marginRight: 5}}>
            <NotificationIcon />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 8}}>
            <CalenderIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <MenuIcon />
          </TouchableOpacity>
        </View>
      </View>

      {jobData.status == 'a' ||
      jobData.action_status == 1 ||
      jobData.action_status == 2 ? (
        <LocationTracker
          setIsJobStarted={setIsJobStarted}
          isJobStarted={isJobStarted}
          isPaused={isPaused}
          handlePause={onPauseClick}
          handleResume={onStartClick}
          handleStartStop={onPauseClick}
          data={jobData}
          orgId={orgId}
          showTracker={showTracker}
          setShowTracker={setShowTracker}
          timer={timer}
          onCompleteJob={onCompleteJob}
          isCompleted={isCompleted}
          jobCompleteLoad={jobCompleteLoad}
        />
      ) : (
        jobData.action_status != null &&
        (!isSwipeCompleted ? (
          <View style={styles.doneButton}>
            <DoneTickButton />
            <Text style={styles.doneButtonText}>Done</Text>
          </View>
        ) : (
          <View>
            <ActivityIndicator color={appColors.black} />
          </View>
        ))
      )}
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {isJobStarted ||
        jobData.action_status == 1 ||
        jobData.action_status == 2 ? (
          <TimeTrackerCard
            data={jobData}
            setIsJobStarted={setIsJobStarted}
            isJobStarted={isJobStarted}
            isPaused={isPaused}
            handlePause={onPauseClick}
            handleResume={onStartClick}
            handleStartStop={onStartClick}
            showTracker={showTracker}
            timer={timer}
          />
        ) : (
          <View style={styles.headerViewStyle}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor:
                  jobData.time_type == '1'
                    ? appColors.lightGreen
                    : jobData.time_type == 'T'
                    ? appColors.yellow
                    : appColors.lightPurple,
                alignItems: 'center',
                borderRadius: 16,
                paddingHorizontal: 1,
                marginLeft: 12,
              }}>
              <Text
                style={{
                  paddingLeft: 8,
                  paddingVertical: 4,
                  paddingHorizontal: 4,
                  color: appColors.black,
                  fontFamily: 'sf-pro-text-semibold',
                  fontWeight: '600',
                  fontSize: 11,
                }}>
                {jobData.time_type_text}
              </Text>
              <View
                style={{
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12,
                  backgroundColor: appColors.white,
                  paddingVertical: 1,
                  marginLeft: 4,
                }}>
                <Text
                  style={{
                    marginLeft: 2,
                    marginRight: 2,
                    paddingBottom: 1,
                    paddingTop: 1,
                    paddingHorizontal: 4,
                    fontFamily: 'sf-pro-text-semibold',
                    fontWeight: '600',
                    fontSize: 11,
                  }}>
                  {jobData.type_text}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <SettingIcon width={20} height={20} />
              <Text style={styles.headerTextStyle}>
                {jobData.status == 2
                  ? 'Require Confirmation'
                  : jobData.status == 3
                  ? 'Waiting for Approval'
                  : jobData.status == 4
                  ? 'Job In Progress'
                  : jobData.status == 5
                  ? 'Completed'
                  : jobData.status == 6
                  ? 'Declined'
                  : 'Confirmed'}
              </Text>
            </View>
          </View>
        )}

        <Text
          style={{
            color: appColors.black,
            fontSize: 12,
            fontFamily: 'sf-pro-text-semibold',
            fontWeight: '600',
            marginBottom: 10,
            marginLeft: 12,
          }}>
          {jobData.number}
        </Text>

        <Text style={styles.headStyle}>{jobData.short_description}</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginBottom: 20,
          }}>
          <View>
            <Text
              style={{
                fontSize: 13,
                marginLeft: 5,
                marginLeft: 20,
                color: appColors.placeholderColor,
                marginBottom: 8,
              }}>
              Start date:
            </Text>
            <View
              style={{
                paddingVertical: 4,
                backgroundColor: appColors.offWhite,
                paddingHorizontal: 8,
                borderRadius: 16,
                marginLeft: 12,
              }}>
              <Text
                style={{
                  //   marginTop: 4,
                  color: appColors.black,
                  fontWeight: '600',
                  fontSize: 13,
                  //   marginLeft: 12,
                }}>
                {new Date(jobData.start_date * 1000)
                  .toLocaleDateString('en-GB')
                  .replace(/\//g, '.')}
                <Text
                  style={{
                    color: appColors.placeholderColor,
                    fontSize: 13,
                    fontFamily: 'sf-pro-text-semibold',
                  }}>
                  {moment.unix(jobData.start_date).format('HH:mm')}
                </Text>
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 13,
                marginLeft: 5,
                marginLeft: 20,
                color: appColors.placeholderColor,
                marginBottom: 8,
              }}>
              Finish date:
            </Text>
            <View
              style={{
                paddingVertical: 4,
                backgroundColor: appColors.offWhite,
                paddingHorizontal: 8,
                borderRadius: 16,
                marginLeft: 12,
              }}>
              <Text
                style={{
                  backgroundColor: appColors.offWhite,
                  borderRadius: 16,
                  color: appColors.black,
                  fontWeight: '600',
                  fontSize: 13,
                }}>
                {new Date(jobData.end_date * 1000)
                  .toLocaleDateString('en-GB')
                  .replace(/\//g, '.')}
                <Text
                  style={{
                    color: appColors.placeholderColor,
                    fontSize: 13,
                    fontFamily: 'sf-pro-text-semibold',
                  }}>
                  {moment.unix(jobData.end_date).format('HH:mm')}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.blackCardStyle}>
          <View>
            <Text style={styles.timePaymentStyle}>Time</Text>
            <Text style={styles.cardHoursStyle}>{jobData.duration + 'h'}</Text>
          </View>
          <View>
            <Text style={styles.timePaymentStyle}>Payment</Text>
            <Text style={styles.cardHoursStyle}>{'$' + jobData.cost}</Text>
          </View>
          <View>
            <Text style={styles.timePaymentStyle}>Variations</Text>
            <Text style={styles.cardHoursStyle}>{'$' + jobData.bonus}</Text>
          </View>
        </View>

        <View style={styles.descriptionCardStyle}>
          <Text
            style={{
              marginBottom: 8,
              color: appColors.placeholderColor,
              fontSize: 13,
            }}>
            Description:
          </Text>
          <Text
            style={{
              color: appColors.black,
              fontSize: 14,
              fontFamily: 'sf_medium',
              width: '90%',
              marginBottom: 2,
              overflow: isExpand ? 'hidden' : 'visible',
              height: isExpand ? 'auto' : '80',
            }}>
            {jobData.long_description}
          </Text>
          <View
            style={{
              marginTop: 10,
              alignItems: 'flex-end',
              position: 'absolute',
              right: 16,
              top: 12,
            }}>
            <Pressable
              onPress={handleCopy}
              style={({pressed}) => ({
                opacity: pressed ? 0.6 : 1,
              })}>
              <CopyIcon width={16} height={16} />
            </Pressable>
          </View>
          <TouchableOpacity
            onPress={() => setExpand(!isExpand)}
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              paddingVertical: 12,
              width: '32%',
              justifyContent: 'center',
              borderRadius: 22,
              borderColor: appColors.lightGrey,
              marginTop: 18,
            }}>
            <ExpandIcon />
            <Text style={{fontSize: 13, fontWeight: '600', marginLeft: 6}}>
              Expand
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: appColors.placeholderColor,
            marginLeft: 16,
            marginBottom: 6,
          }}>
          Job Location:
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 16,
          }}>
          <Text
            style={{
              color: appColors.black,
              marginTop: 4,
              width: '80%',
              fontSize: 14,
              fontFamily: 'sf_medium',
              fontWeight: 400,
              flex: 1,
            }}>
            {jobData.address}
          </Text>
          <TouchableOpacity onPress={() => openInMaps(jobData.address)}>
            <MapIcon />
          </TouchableOpacity>
        </View>

        {jobData != null && jobData.attachments.length > 0 && (
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: appColors.placeholderColor, marginLeft: 16}}>
              Documents Attached
            </Text>
            <View
              style={{
                backgroundColor: appColors.placeholderColor,
                // paddingHorizontal: 5,
                borderRadius: 50,
                // marginLeft: 2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 5,
                borderRadius: 50,
              }}>
              <Text
                style={{
                  color: appColors.white,
                  fontSize: 10,
                }}>
                {jobData.attachments.length}
              </Text>
            </View>
          </View>
        )}

        {jobData != null &&
          jobData.attachments != null &&
          jobData.attachments.length > 0 && (
            <FlatList
              key={2}
              data={jobData.attachments}
              style={{paddingHorizontal: 16}}
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    marginTop: 12,
                    marginRight: 8,
                    borderColor: appColors.lightGrey,
                    // borderBottomWidth: 1,
                  }}
                  onPress={() => downloadFile(item.file, item.title)}>
                  <DocumentIcon width={18} height={18} />
                  <Text style={{color: appColors.black}}>{item.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          )}

        <Text
          style={{
            borderColor: appColors.lightGrey,
            borderBottomWidth: 1,
          }}></Text>
        <View>
          {jobData != null && jobData.project_photos != null && (
            <Text style={{fontSize: 20, fontWeight: '600', marginTop: 20}}>
              Project Photos
            </Text>
          )}
          {jobData != null && jobData.project_photos == 3 && (
            <View>
              <Text style={{fontSize: 14, fontWeight: '600', marginTop: 16}}>
                Before
              </Text>
              <TouchableOpacity
                style={styles.imageViewStyle}
                onPress={() => setModalVisible(!modalVisible)}>
                <AddImageIcon />
              </TouchableOpacity>
              <Text style={{fontSize: 14, fontWeight: '600', marginTop: 16}}>
                In Process
              </Text>
              <TouchableOpacity style={styles.imageViewStyle}>
                <AddImageIcon />
              </TouchableOpacity>
              <Text style={{fontSize: 14, fontWeight: '600', marginTop: 16}}>
                After
              </Text>
              <TouchableOpacity style={styles.imageViewStyle}>
                <AddImageIcon />
              </TouchableOpacity>
            </View>
          )}
          {jobData != null && jobData.project_photos == 1 && (
            <View>
              <Text style={{fontSize: 14, fontWeight: '600', marginTop: 16}}>
                Before
              </Text>
              <TouchableOpacity
                style={styles.imageViewStyle}
                onPress={() => setModalVisible(!modalVisible)}>
                <AddImageIcon />
              </TouchableOpacity>

              <Text style={{fontSize: 14, fontWeight: '600', marginTop: 16}}>
                After
              </Text>
              <TouchableOpacity
                style={styles.imageViewStyle}
                onPress={() => setModalVisible(!modalVisible)}>
                <AddImageIcon />
              </TouchableOpacity>
            </View>
          )}
          {jobData != null && jobData.project_photos == 2 && (
            <View>
              <Text style={{fontSize: 14, fontWeight: '600', marginTop: 16}}>
                In Process
              </Text>
              <TouchableOpacity style={styles.imageViewStyle}>
                <AddImageIcon />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      {/* <View style={{alignItems: 'flex-end', marginBottom: 20}}>
        <Text
          style={{
            marginTop: 4,
            borderBottomWidth: 1,
            borderColor: appColors.black,
            color: appColors.black,
            textDecorationLine: 'underline',
            fontSize: 12,
            fontWeight: '500',
          }}>
          History Log
        </Text>
      </View> */}
      {jobData.status_text !== 'Accepted' && jobData.action_status != 3 ? (
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
            paddingTop: 16,
          }}>
          <Text style={styles.declineButton} onPress={() => setDecline(true)}>
            Decline
          </Text>
          <Text style={styles.confirmButton} onPress={() => setAccept(true)}>
            Confirm
          </Text>
          {/* navigation.navigate('JobCardConfirmButton') */}
        </View>
      ) : (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
            paddingTop: 16,
            backgroundColor: appColors.black,
            padding: 12,
            borderRadius: 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('MainChatRoom')}>
          <ChatIconJob />
          <Text style={styles.ChatButton}>Start Chat</Text>
        </TouchableOpacity>
      )}
      <Modal
        // animationType="slide"
        transparent={true}
        visible={isAccept}
        onRequestClose={() => {
          setAccept(!isAccept);
        }}>
        <BlurView
          blurType="light"
          blurAmount={50}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'rgba(193, 186, 186, 0.92)',
          }}>
          <View
            style={{
              width: '80%',
              backgroundColor: appColors.black,
              borderRadius: 32,
              padding: 20,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                marginBottom: 24,
                marginTop: 10,
                color: appColors.white,
              }}>
              Confirm the Job
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginBottom: 10,
                gap: 8,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: appColors.black,
                  borderRadius: 50,
                  flex: 1,
                  borderWidth: 1,
                  borderColor: appColors.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}
                onPress={() => {
                  setAccept(false);
                  onAccept();
                }}>
                <Text
                  style={{
                    color: appColors.white,
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Decline
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: appColors.white,
                  borderRadius: 50,
                  flex: 1,
                  borderWidth: 1,
                  borderColor: appColors.black,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}
                onPress={() => onAccept()}>
                <Text
                  style={{
                    color: appColors.black,
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setAccept(false);
              setDecline(false);
            }}
            style={styles.CrossIcon}>
            <CrossCloseIcon />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={isDecline}
        onRequestClose={() => {
          setAccept(false);
        }}>
        <BlurView
          blurType="light"
          blurAmount={50}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              width: '80%',
              backgroundColor: appColors.black,
              borderRadius: 32,
              padding: 20,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                marginBottom: 16,
                color: appColors.white,
                paddingVertical: 8,
              }}>
              Reason to decline a job
            </Text>
            <TextInput
              style={{
                height: 100,
                width: '100%',
                borderColor: appColors.borderLightGrey,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                textAlignVertical: 'top',
                marginBottom: 16,
                backgroundColor: appColors.inputColor,
                color: appColors.white,
              }}
              placeholder="Enter your reason here..."
              placeholderTextColor={appColors.placeholderColor}
              multiline={true}
              onChangeText={text => setReason(text)}
              value={reason}
            />
            <TouchableOpacity
              style={{
                backgroundColor: appColors.black,
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
                width: '100%',
                alignItems: 'center',
              }}
              onPress={() => {
                setAccept(false);
              }}>
              <Text
                style={{
                  color: appColors.black,
                  fontSize: 16,
                  backgroundColor: appColors.white,
                  paddingVertical: 12,
                  paddingHorizontal: 60,
                  borderRadius: 50,
                }}
                onPress={() => onDecline()}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setAccept(false);
              setDecline(false);
            }}
            style={styles.CrossIcon}>
            <CrossCloseIcon />
          </TouchableOpacity>
        </View>
      </Modal>
      <CameraLibraryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleSelect}
      />
    </SafeAreaView>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
    padding: 16,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  usernameStyle: {
    color: appColors.black,
    fontFamily: 'SF-Pro',
    fontWeight: '600',
    fontSize: 16,
  },
  headerViewStyle: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextStyle: {
    fontSize: 12,
    fontWeight: '600',
    color: appColors.black,
    fontFamily: 'sf-pro-text-semibold',
  },
  headStyle: {
    fontSize: 26,
    fontWeight: '600',
    color: appColors.black,
    marginBottom: 15,
    width: '90%',
    marginLeft: 12,
  },
  blackCardStyle: {
    backgroundColor: appColors.black,
    paddingHorizontal: 32,
    paddingVertical: 22,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timePaymentStyle: {
    color: appColors.grey,
    marginBottom: 4,
    fontFamily: 'sf_medium',
    fontSize: 14,
  },
  cardHoursStyle: {
    fontSize: 20,
    color: appColors.white,
    fontWeight: '600',
  },
  descriptionCardStyle: {
    borderWidth: 1,
    borderColor: appColors.black,
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
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
  doneButton: {
    flexDirection: 'row',
    backgroundColor: appColors.lightGreen,
    color: appColors.black,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 12,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 32,
    marginBottom: 8,
    gap: 4,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  ChatButton: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  declineButton: {
    backgroundColor: appColors.white,
    color: appColors.black,
    fontSize: 16,
    borderWidth: 1,
    fontWeight: '600',
    borderColor: appColors.black,
    flex: 1,
    textAlign: 'center',
    padding: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  CrossIcon: {
    width: 40,
    backgroundColor: appColors.white,
    height: 40,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 16,
  },
  imageViewStyle: {
    marginTop: 16,
  },
});

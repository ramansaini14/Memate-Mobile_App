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
import { increment } from '../redux/TimerSlice';

const LocationTracker = ({
  isJobStarted,
  setIsJobStarted,
  data,
  orgId,
  showTracker,
  setShowTracker,
  timer
}) => {
  const dispatch = useDispatch();
  const [isStopped, setStopped] = useState(false);

  const responseApi = useSelector(state => state.jobsStatusReducer.data);
  // console.log('responseApi', responseApi.timer);

  const handleStart = () => setShowTracker(false);
  // const handleStop = () => setShowTracker(false);

  const [location, setLocation] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

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
          console.log('Location:', updatedLocations);
          // Save updated locations to AsyncStorage
          AsyncStorage.setItem('locations', JSON.stringify(updatedLocations))
            .then(() => console.log('Locations saved to AsyncStorage'))
            .catch(error => console.error('Error saving locations:', error));

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
      if (timer!=null) {
       startTracking()
      }
    }
  }, [permissionGranted]);

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

    // getLocation();
    setShowTracker(true);

    intervalRef.current = setInterval(() => {
      getLocation();
    }, 10000);
  };

  const stopTracking = async () => {
    const locations = await AsyncStorage.getItem('locations');
    setStopped(true);
    setIsJobStarted(false)

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log('Tracking stopped');
      Alert.alert('Stopped', 'Location tracking has been stopped.');
    }
    setShowTracker(false);
    const payload = {
      orgId: orgId,
      jobId: data.id,
      data: locations,
    };

    dispatch(hitJobPause(payload));

    setLocation([]);
    // getLocation();
  };

  useEffect(() => {
    if (isJobStarted) {
      startTracking();
    }

    // return () => {
    //   stopTracking();
    // };
  }, [isJobStarted]);

  const onStartPress = () => {
    setIsJobStarted(true);
    setShowTracker(true);
    setStopped(false);
    const currentDate = new Date().toISOString();
    const payload = {
      orgId: orgId,
      jobId: data.id,
      data: [
        {
          latitude: location[0].latitude.toString(),
          longitude: location[0].longitude.toString(),
          date: currentDate,
        },
      ],
    };

    dispatch(hitJobStart(payload));
    dispatch(increment());
  };

  useEffect(() => {
    if (
      responseApi != null &&
      responseApi.hasOwnProperty('timer')
    ) {
      if (!isStopped) {
      // setTimer(Math.floor(responseApi.timer));   
        setIsJobStarted(true);
        setShowTracker(true);
        startTracking();
      }
    }
    dispatch(clearJobStatus());
  }, [responseApi]);

  return (
    <View style={styles.container}>
      {isJobStarted || data.action_status == 1 || data.action_status==2? (
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
          {data.action_status==1 ? (
            <TouchableOpacity
              style={styles.pauseIcon}
              onPress={() => stopTracking()}>
              <PauseJobIcon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.pauseIcon}
              onPress={() => onStartPress()}>
              <StartJobPlayIcon />
            </TouchableOpacity>
          )}
          {/* <Tracker onStop={handleStop} /> */}
        </View>
      ) : (
        <TouchableOpacity style={{paddingHorizontal: 32}}>
          <Text
            style={[
              styles.confirmButton,
              {paddingVertical: 14, borderRadius: 32},
            ]}
            onPress={() => onStartPress()}>
            Start the Job
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default LocationTracker;

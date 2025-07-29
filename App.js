import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigations/MainStack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {
  startBackgroundTimer,
  loadTimerStateFromStorage,
} from './src/redux/TimerSlice';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';
import TimerManager from './src/services/TimeManager';

import firebase from '@react-native-firebase/app';

import {Platform} from 'react-native';
// import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {registerPushNotifications} from './src/services/notificationService';
import {requestNotificationPermission} from './src/utils/Constants';

// import crashlytics from '@react-native-firebase/crashlytics';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

// Initialize TimerManager immediately
console.log('App.js: Calling TimerManager.initialize()');
TimerManager.initialize();

// Initialize timer on app startup without using hooks
console.log('App.js: Initializing app...');

// Create a separate component to handle timer initialization
const AppWithTimer = () => {
  useEffect(() => {
    console.log(
      'AppWithTimer useEffect: Initializing background timer service',
    );
    const initTimer = async () => {
      try {
        const timerState = await loadTimerStateFromStorage(store.dispatch);
        console.log('Timer state loaded:', timerState);
        if (timerState.isRunning && !timerState.isPaused) {
          console.log('Starting background timer because job is active');
          startBackgroundTimer(store.dispatch);
        }
      } catch (error) {
        console.error('Error initializing timer:', error);
      }
    };

    initTimer();
  }, []);

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

const App = () => {
  useEffect(() => {
    registerPushNotifications();
    requestNotificationPermission();
  }, []);
  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyDcDAFxoXTqd3GNdzWJgSCcA_0KtuVNo-s',
      projectId: 'memate-9f816',
      appId:
        Platform.OS === 'ios'
          ? '1:791398132012:ios:506472af656feaae6e6489'
          : '1:791398132012:android:c594b2acb96923636e6489',
    };

    console.log('Initializing Firebase...');

    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized');
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppWithTimer />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

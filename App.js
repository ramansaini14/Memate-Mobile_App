import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigations/MainStack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {startBackgroundTimer, loadTimerStateFromStorage} from './src/redux/TimerSlice';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

// Initialize timer on app startup without using hooks
console.log('App.js: Initializing app...');

// Create a separate component to handle timer initialization
const AppWithTimer = () => {
  useEffect(() => {
    console.log('AppWithTimer useEffect: Initializing background timer service');
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
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppWithTimer />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

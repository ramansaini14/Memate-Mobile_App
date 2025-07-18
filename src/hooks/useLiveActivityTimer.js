import { useEffect, useRef } from 'react';
import { NativeModules, Platform, AppState } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTimer } from '../redux/TimerSlice';

const { MeMateTimer } = NativeModules;

export const useLiveActivityTimer = () => {
  const dispatch = useDispatch();
  const { value: timerValue, isRunning, isPaused, activeJobId, jobs } = useSelector(state => state.timer);
  
  const lastStartedJobRef = useRef(null);
  const isLiveActivityActiveRef = useRef(false);
  const appStateRef = useRef(AppState.currentState);

  // Helper function to get current job timer value
  const getCurrentTimerValue = () => {
    if (activeJobId && jobs[activeJobId]) {
      return jobs[activeJobId].value;
    }
    return timerValue;
  };

  // Function to calculate actual elapsed time and sync Redux timer
  const syncTimerWithRealTime = () => {
    if (activeJobId && jobs[activeJobId] && jobs[activeJobId].startTime) {
      const currentTime = Date.now();
      const startTime = jobs[activeJobId].startTime;
      const actualElapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      
      console.log('Syncing timer - Start time:', new Date(startTime));
      console.log('Syncing timer - Current time:', new Date(currentTime));
      console.log('Syncing timer - Actual elapsed:', actualElapsedSeconds, 'seconds');
      console.log('Syncing timer - Previous value:', jobs[activeJobId].value);
      
      // Update Redux timer to match actual elapsed time from start
      dispatch(setTimer({ jobId: activeJobId, value: actualElapsedSeconds }));
      
      console.log('Timer synced to:', actualElapsedSeconds, 'seconds');
    } else {
      console.log('Cannot sync timer - missing startTime or job data');
    }
  };

  const startLiveActivity = async (seconds = 0) => {
    if (Platform.OS !== 'ios' || !MeMateTimer) {
      console.log('Live Activities not available on this platform');
      return;
    }

    try {
      console.log('Starting Live Activity with seconds:', seconds);
      await MeMateTimer.startTimer(seconds);
      isLiveActivityActiveRef.current = true;
      console.log('Live Activity started successfully');
    } catch (error) {
      console.error('Failed to start Live Activity:', error);
      isLiveActivityActiveRef.current = false;
    }
  };

  const updateLiveActivity = async (seconds) => {
    if (Platform.OS !== 'ios' || !MeMateTimer || !isLiveActivityActiveRef.current) {
      return;
    }

    try {
      await MeMateTimer.updateTimer(seconds);
    } catch (error) {
      console.error('Failed to update Live Activity:', error);
      // If update fails, try to restart the activity
      isLiveActivityActiveRef.current = false;
    }
  };

  const stopLiveActivity = async () => {
    if (Platform.OS !== 'ios' || !MeMateTimer) {
      return;
    }

    try {
      console.log('Stopping Live Activity');
      await MeMateTimer.stopTimer();
      isLiveActivityActiveRef.current = false;
      lastStartedJobRef.current = null;
      console.log('Live Activity stopped successfully');
    } catch (error) {
      console.error('Failed to stop Live Activity:', error);
    }
  };

  // Handle app state changes to sync timer when coming to foreground
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      console.log('useLiveActivityTimer: App state changed from', appStateRef.current, 'to', nextAppState);
      
      if (appStateRef.current === 'background' && nextAppState === 'active') {
        // App came to foreground - sync timers if we have an active timer
        if (isRunning && !isPaused && activeJobId && isLiveActivityActiveRef.current) {
          console.log('App came to foreground - syncing timer with actual elapsed time');
          syncTimerWithRealTime();
        }
      }
      
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => subscription?.remove();
  }, [isRunning, isPaused, activeJobId, dispatch]);

/**
 * handle timer state changes
 */
  useEffect(() => {
    const currentTimerValue = getCurrentTimerValue();
    
    /**
     * Start Live Activity when timer starts (and is not paused)
     */
    if (isRunning && !isPaused && activeJobId && lastStartedJobRef.current !== activeJobId) {
      lastStartedJobRef.current = activeJobId;
      
      /**
       * Check if this is an app restart with existing timer
       */
      if (currentTimerValue > 0) {
        console.log('App restarted with active timer - starting Live Activity with elapsed time:', currentTimerValue);
      } else {
        console.log('Starting new timer - Live Activity with 0 seconds');
      }
      
      startLiveActivity(currentTimerValue);
    }
    
    /**
     * Update Live Activity when timer value changes (only if running and not paused)
     */
    else if (isRunning && !isPaused && activeJobId && isLiveActivityActiveRef.current) {
      updateLiveActivity(currentTimerValue);
    }
    
    /**
     * Stop Live Activity when timer is paused or stopped
     */
    else if ((!isRunning || isPaused) && isLiveActivityActiveRef.current) {
      console.log('Stopping Live Activity - isRunning:', isRunning, 'isPaused:', isPaused);
      stopLiveActivity();
    }
    
    // Resume Live Activity when timer is resumed (was paused but now running again)
    else if (isRunning && !isPaused && activeJobId && !isLiveActivityActiveRef.current && lastStartedJobRef.current === activeJobId) {
      console.log('Resuming Live Activity with elapsed time:', currentTimerValue);
      startLiveActivity(currentTimerValue);
    }
    
  }, [isRunning, isPaused, activeJobId, timerValue, jobs]);

  /**
   * Additional effect to handle app startup synchronization
   */
  useEffect(() => {
    /**
     * This runs when the component first mounts (app startup)
     */
    if (isRunning && !isPaused && activeJobId && getCurrentTimerValue() > 0) {
      console.log('App startup detected with active timer. Timer value:', getCurrentTimerValue());
      
      /**
       * Small delay to ensure Live Activity state is settled
       */
      const timeoutId = setTimeout(() => {
        if (!isLiveActivityActiveRef.current) {
          console.log('Starting Live Activity on app startup');
          lastStartedJobRef.current = activeJobId;
          startLiveActivity(getCurrentTimerValue());
        } else {
          console.log('Live Activity already active on startup');
        }
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, []); // Only run on mount

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isLiveActivityActiveRef.current) {
        stopLiveActivity();
      }
    };
  }, []);

  return {
    startLiveActivity,
    stopLiveActivity,
    updateLiveActivity,
    isLiveActivityActive: isLiveActivityActiveRef.current,
  };
}; 
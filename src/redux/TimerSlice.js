// src/features/timer/timerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

// Initialize a background timer variable
let backgroundTimerInterval = null;

// Helper function to safely handle AsyncStorage operations
const safeAsyncStorage = {
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting ${key} in AsyncStorage:`, error);
    }
  },
  getItem: async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting ${key} from AsyncStorage:`, error);
      return null;
    }
  }
};


const TimerSlice = createSlice({
  name: 'timer',  
  initialState: {
    value: 0,
    isRunning: false,
    isPaused: false,
    activeJobId: null,
    lastUpdateTime: Date.now(),
    // Add a jobs object to store job-specific timer values
    jobs: {}
  },
  reducers: {
    increment: (state) => {
      // Only increment if the timer is running and not paused
      if (state.isRunning && !state.isPaused && state.activeJobId) {
        // Increment the global timer
        state.value += 1;
        
        // Also increment the job-specific timer
        if (!state.jobs[state.activeJobId]) {
          state.jobs[state.activeJobId] = {
            value: 0,
            isRunning: true,
            isPaused: false,
            lastUpdateTime: Date.now()
          };
        }
        
        state.jobs[state.activeJobId].value += 1;
        state.jobs[state.activeJobId].lastUpdateTime = Date.now();
        state.lastUpdateTime = Date.now();
        
        // Persist timer value to AsyncStorage
        safeAsyncStorage.setItem('timerValue', state.value.toString());
        safeAsyncStorage.setItem('timerLastUpdate', state.lastUpdateTime.toString());
        safeAsyncStorage.setItem(`timer_${state.activeJobId}`, state.jobs[state.activeJobId].value.toString());
        safeAsyncStorage.setItem('timerJobs', JSON.stringify(state.jobs));
        
        // console.log(`Timer incremented for job ${state.activeJobId}:`, state.jobs[state.activeJobId].value);
      } else {
        // Check if we have any running jobs that aren't paused
        const runningJobs = Object.entries(state.jobs).filter(([jobId, jobState]) => 
          jobState.isRunning && !jobState.isPaused
        );
        
        if (runningJobs.length > 0) {
          // If we have running jobs but no active job, update all running jobs
          runningJobs.forEach(([jobId, jobState]) => {
            state.jobs[jobId].value += 1;
            state.jobs[jobId].lastUpdateTime = Date.now();
            
            // Persist timer value to AsyncStorage
            safeAsyncStorage.setItem(`timer_${jobId}`, state.jobs[jobId].value.toString());
            
            console.log(`Timer incremented for inactive job ${jobId}:`, state.jobs[jobId].value);
          });
          
          // Also update the global timer if we have running jobs
          if (runningJobs.length > 0) {
            state.value += 1;
            state.lastUpdateTime = Date.now();
            safeAsyncStorage.setItem('timerValue', state.value.toString());
            safeAsyncStorage.setItem('timerLastUpdate', state.lastUpdateTime.toString());
          }
          
          // Persist all jobs
          safeAsyncStorage.setItem('timerJobs', JSON.stringify(state.jobs));
        } else {
          // console.log('Timer not incremented - no active running jobs found');
        }
      }
    },
    setTimer: (state, action) => {
   
      const { jobId, value } = action.payload;
      
      // Update global timer if this is the active job
      if (jobId === state.activeJobId) {
        state.value = value;
      }

      console.log('setTimer action called with payload:',jobId, " value ===>",value );
      
      // Always update job-specific timer
      if (!state.jobs[jobId]) {
        state.jobs[jobId] = {
          value: 0,
          isRunning: false,
          isPaused: false,
          lastUpdateTime: Date.now()
        };
      }
      
      state.jobs[jobId].value = value;
      state.jobs[jobId].lastUpdateTime = Date.now();
      
      // Persist values
      // safeAsyncStorage.setItem(`timer_${jobId}`, value.toString());
      // safeAsyncStorage.setItem('timerJobs', JSON.stringify(state.jobs));
      
      console.log(`Timer set for job ${jobId}:`, value);
    },
    startTimer: (state, action) => {
      const jobId = action.payload;
      console.log('startTimer action called with job ID:', jobId);
      
      // Set this as the active job
      state.activeJobId = jobId;
      state.isRunning = true;
      state.isPaused = false;
      
      // Initialize or update job-specific timer
      if (!state.jobs[jobId]) {
        state.jobs[jobId] = {
          value: 0,
          isRunning: true,
          isPaused: false,
          lastUpdateTime: Date.now()
        };
      } else {
        state.jobs[jobId].isRunning = true;
        state.jobs[jobId].isPaused = false;
        state.jobs[jobId].lastUpdateTime = Date.now();
      }
      
      // Update the global timer value to match this job
      state.value = state.jobs[jobId].value;
      state.lastUpdateTime = Date.now();
      
      // Store state in AsyncStorage
      safeAsyncStorage.setItem('timerRunning', 'true');
      safeAsyncStorage.setItem('timerPaused', 'false');
      safeAsyncStorage.setItem('activeJobId', jobId.toString());
      safeAsyncStorage.setItem('timerLastUpdate', state.lastUpdateTime.toString());
      safeAsyncStorage.setItem('timerJobs', JSON.stringify(state.jobs));
      
      console.log(`Job ${jobId} started with timer:`, state.jobs[jobId].value);
    },
    pauseTimer: (state, action) => {
      const jobId = action.payload || state.activeJobId;
      
      if (!jobId) {
        console.log('pauseTimer: No job ID provided and no active job');
        return;
      }
      
      console.log('pauseTimer action called for job:', jobId);
      
      // If this is the active job, pause the global timer
      if (jobId === state.activeJobId) {
        state.isRunning = true;
        state.isPaused = true;
        state.lastUpdateTime = Date.now();
        
        // Store global state in AsyncStorage
        safeAsyncStorage.setItem('timerRunning', 'true');
        safeAsyncStorage.setItem('timerPaused', 'true');
        safeAsyncStorage.setItem('timerLastUpdate', state.lastUpdateTime.toString());
      }
      
      // Always update job-specific timer
      if (!state.jobs[jobId]) {
        state.jobs[jobId] = {
          value: 0,
          isRunning: true,
          isPaused: true,
          lastUpdateTime: Date.now()
        };
      } else {
        state.jobs[jobId].isRunning = true;
        state.jobs[jobId].isPaused = true;
        state.jobs[jobId].lastUpdateTime = Date.now();
      }
      
      // Store job-specific state
      safeAsyncStorage.setItem('timerJobs', JSON.stringify(state.jobs));
      
      console.log(`Job ${jobId} paused with timer:`, state.jobs[jobId].value);
    },
    resumeTimer: (state, action) => {
      const jobId = action.payload || state.activeJobId;
      
      if (!jobId) {
        console.log('resumeTimer: No job ID provided and no active job');
        return;
      }
      
      console.log('resumeTimer action called for job:', jobId);
      
      // If this is the active job, resume the global timer
      if (jobId === state.activeJobId) {
        state.isRunning = true;
        state.isPaused = false;
        state.lastUpdateTime = Date.now();
        
        // Store global state in AsyncStorage
        safeAsyncStorage.setItem('timerRunning', 'true');
        safeAsyncStorage.setItem('timerPaused', 'false');
        safeAsyncStorage.setItem('timerLastUpdate', state.lastUpdateTime.toString());
      }
      
      // Always update job-specific timer
      if (!state.jobs[jobId]) {
        state.jobs[jobId] = {
          value: 0,
          isRunning: true,
          isPaused: false,
          lastUpdateTime: Date.now()
        };
      } else {
        state.jobs[jobId].isRunning = true;
        state.jobs[jobId].isPaused = false;
        state.jobs[jobId].lastUpdateTime = Date.now();
      }
      
      // Store job-specific state
      safeAsyncStorage.setItem('timerJobs', JSON.stringify(state.jobs));
      
      console.log(`Job ${jobId} resumed with timer:`, state.jobs[jobId].value);
    },
    stopTimer: (state, action) => {
      const jobId = action.payload || state.activeJobId;
      
      if (!jobId) {
        console.log('stopTimer: No job ID provided and no active job');
        return;
      }
      
      console.log('stopTimer action called for job:', jobId);
      
      // If this is the active job, stop the global timer
      if (jobId === state.activeJobId) {
        state.isRunning = false;
        state.isPaused = false;
        state.activeJobId = null;
        state.value = 0;
        state.lastUpdateTime = Date.now();
        
        // Clear global state in AsyncStorage
        safeAsyncStorage.setItem('timerRunning', 'false');
        safeAsyncStorage.setItem('timerPaused', 'false');
        safeAsyncStorage.setItem('activeJobId', '');
        safeAsyncStorage.setItem('timerValue', '0');
        safeAsyncStorage.setItem('timerLastUpdate', state.lastUpdateTime.toString());
      }
      
      // Always update job-specific timer
      if (state.jobs[jobId]) {
        state.jobs[jobId].isRunning = false;
        state.jobs[jobId].isPaused = false;
        state.jobs[jobId].value = 0;
        state.jobs[jobId].lastUpdateTime = Date.now();
      }
      
      // Store job-specific state
      safeAsyncStorage.setItem('timerJobs', JSON.stringify(state.jobs));
      
      console.log(`Job ${jobId} stopped and timer reset`);
    },
    syncTimerFromStorage: (state, action) => {
      const { value, isRunning, isPaused, activeJobId, lastUpdateTime, jobs } = action.payload;
      
      state.value = value || 0;
      state.isRunning = isRunning || false;
      state.isPaused = isPaused || false;
      state.activeJobId = activeJobId || null;
      state.lastUpdateTime = lastUpdateTime || Date.now();
      
      // Sync job-specific timers if available
      if (jobs) {
        state.jobs = jobs;
      }
      
      console.log('Timer synced from storage:', { 
        value, 
        isRunning, 
        isPaused, 
        activeJobId,
        jobsCount: jobs ? Object.keys(jobs).length : 0
      });
    },
    // New action to get a specific job's timer
    getJobTimer: (state, action) => {
      const jobId = action.payload;
      // This is just a selector, doesn't modify state
      // It will be used by our selector function
    }
  }
});

// Export actions
export const { 
  increment, 
  setTimer, 
  startTimer, 
  pauseTimer, 
  resumeTimer, 
  stopTimer,
  syncTimerFromStorage,
  getJobTimer
} = TimerSlice.actions;

// Selector to get a specific job's timer
export const selectJobTimer = (state, jobId) => {
  if (!jobId) return { value: 0, isRunning: false, isPaused: false };
  
  // If the job exists in our state, return its timer
  if (state.timer.jobs && state.timer.jobs[jobId]) {
    return state.timer.jobs[jobId];
  }
  
  // Otherwise return a default timer
  return { value: 0, isRunning: false, isPaused: false };
};

// Start the background timer
export const startBackgroundTimer = (dispatch) => {
  try {
    console.log('Starting background timer');
    
    // Clear any existing interval
    if (backgroundTimerInterval) {
      clearInterval(backgroundTimerInterval);
      backgroundTimerInterval = null;
    }
    
    // Simple approach - just increment the timer every second
    backgroundTimerInterval = setInterval(() => {
      // The increment action will check the activeJobId
      // inside the reducer and increment the right job timer
      dispatch(increment());
    }, 1000);
    
    console.log('Background timer interval set:', backgroundTimerInterval);
    return true;
  } catch (error) {
    console.error('Error starting background timer:', error);
    return false;
  }
};

// Stop the background timer
export const stopBackgroundTimer = () => {
  try {
    console.log('Stopping background timer');
    if (backgroundTimerInterval) {
      clearInterval(backgroundTimerInterval);
      backgroundTimerInterval = null;
      console.log('Background timer stopped');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error stopping background timer:', error);
    return false;
  }
};

// Function to load timer state from storage
export const loadTimerStateFromStorage = async (dispatch) => {
  try {
    console.log('Loading timer state from storage');
    const [valueStr, runningStr, pausedStr, jobId, lastUpdateStr, jobsStr] = await Promise.all([
      safeAsyncStorage.getItem('timerValue'),
      safeAsyncStorage.getItem('timerRunning'),
      safeAsyncStorage.getItem('timerPaused'),
      safeAsyncStorage.getItem('activeJobId'),
      safeAsyncStorage.getItem('timerLastUpdate'),
      safeAsyncStorage.getItem('timerJobs')
    ]);
    
    console.log('Timer state loaded:', { valueStr, runningStr, pausedStr, jobId });
    
    const value = valueStr ? parseInt(valueStr, 10) : 0;
    const isRunning = runningStr === 'true';
    const isPaused = pausedStr === 'true';
    const activeJobId = jobId || null;
    const lastUpdateTime = lastUpdateStr ? parseInt(lastUpdateStr, 10) : Date.now();
    const jobs = jobsStr ? JSON.parse(jobsStr) : {};
    
    dispatch(syncTimerFromStorage({
      value,
      isRunning,
      isPaused, 
      activeJobId,
      lastUpdateTime,
      jobs
    }));
    
    // Start background timer if needed
    if (isRunning && !isPaused) {
      startBackgroundTimer(dispatch);
    }
    
    return { value, isRunning, isPaused, activeJobId, jobs };
  } catch (error) {
    console.error('Error loading timer state from storage:', error);
    return { value: 0, isRunning: false, isPaused: false, activeJobId: null, jobs: {} };
  }
};

export default TimerSlice.reducer;

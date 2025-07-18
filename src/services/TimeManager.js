import {NativeModules, AppState} from 'react-native';

const {MeMateTimer} = NativeModules;

class TimerManager {
  constructor() {
    this._isRunning = false;
    this._startTime = null;
    this._listeners = [];
    this._stopListeners = [];
    this._appStateSubscription = null;
  }

  initialize() {
    console.log('TimerManager: Initialized - timer state now managed by Redux store');
    
    // Set up app state listener for foreground/background detection
    this._appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  handleAppStateChange(nextAppState) {
    console.log('TimerManager: App state changed to:', nextAppState);
    
    if (nextAppState === 'active') {
      console.log('TimerManager: App came to foreground');
      // Redux store will handle state restoration from AsyncStorage
      // No need to sync with native timer anymore
    }
  }

  addListener(callback) {
    this._listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this._listeners = this._listeners.filter(listener => listener !== callback);
    };
  }

  addStopListener(callback) {
    this._stopListeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this._stopListeners = this._stopListeners.filter(listener => listener !== callback);
    };
  }

  notifyListeners(seconds) {
    this._listeners.forEach(callback => {
      try {
        callback(seconds);
      } catch (error) {
        console.error('Error in timer listener:', error);
      }
    });
  }

  notifyStopListeners() {
    this._stopListeners.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Error in stop listener:', error);
      }
    });
  }

  get isRunning() {
    return this._isRunning;
  }

  get startTime() {
    return this._startTime;
  }

  getCurrentElapsed() {
    if (!this._isRunning || !this._startTime) {
      return 0;
    }
    
    return Math.floor((Date.now() - this._startTime.getTime()) / 1000);
  }

  start() {
    try {
      if (this._isRunning) {
        console.log('TimerManager: Timer already running');
        return;
      }

      this._isRunning = true;
      this._startTime = new Date();
      
      console.log('TimerManager: Started timer at:', this._startTime);
      
      // Start the interval to notify listeners
      this._interval = setInterval(() => {
        const elapsed = this.getCurrentElapsed();
        this.notifyListeners(elapsed);
      }, 1000);
      
      // Notify immediately
      this.notifyListeners(0);
      
    } catch (error) {
      console.error('Error starting timer:', error);
    }
  }

  pause() {
    try {
      console.log('TimerManager: Pausing timer');
      
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
      
      // Keep _isRunning as true but stop the interval
      // This allows resume to work properly
      
    } catch (error) {
      console.error('Error pausing timer:', error);
    }
  }

  resume() {
    try {
      if (!this._isRunning || !this._startTime) {
        console.log('TimerManager: Cannot resume - timer not started');
        return;
      }

      console.log('TimerManager: Resuming timer');
      
      // Restart the interval
      this._interval = setInterval(() => {
        const elapsed = this.getCurrentElapsed();
        this.notifyListeners(elapsed);
      }, 1000);
      
      // Notify immediately with current elapsed time
      const elapsed = this.getCurrentElapsed();
      this.notifyListeners(elapsed);
      
    } catch (error) {
      console.error('Error resuming timer:', error);
    }
  }

  stop() {
    try {
      console.log('TimerManager: Stopping timer');
      
      this._isRunning = false;
      this._startTime = null;
      
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
      
      // Notify listeners
      this.notifyListeners(0);
      
      // Notify stop listeners
      this.notifyStopListeners();
    } catch (error) {
      console.error('Error stopping timer:', error);
    }
  }

  // Utility method for formatting time (kept for compatibility)
  getFormattedTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  cleanup() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
    
    if (this._appStateSubscription) {
      this._appStateSubscription.remove();
      this._appStateSubscription = null;
    }
    
    this._listeners = [];
    this._stopListeners = [];
  }
}

// Create singleton instance
const timerManager = new TimerManager();

export default timerManager;
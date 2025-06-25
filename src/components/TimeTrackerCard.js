import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {appColors} from '../utils/appColors';
import WhitePlayIcon from '../assets/svg/WhitePlayIcon';
import JobStartedTimeIcon from '../assets/svg/JobStartedTimeIcon';
import JobPauseIcon from '../assets/svg/JobPauseIcon';
import PauseJobIcon from '../assets/svg/PauseJobIcon';
import StartJobPlayIcon from '../assets/svg/StartJobPlayIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  increment, 
  startTimer, 
  resumeTimer,
  selectJobTimer
} from '../redux/TimerSlice';
import {useDispatch, useSelector} from 'react-redux';

const TimeTrackerCard = ({
  data,
  isJobStarted,
  setIsJobStarted,
  isPaused,
  handlePause,
  handleResume,
  handleStartStop,
  showTracker,
  timer,
}) => {
  // console.log('isJobStarted', isJobStarted)

  const dispatch = useDispatch();
  
  // Get job-specific timer info from Redux
  const jobTimer = useSelector(state => selectJobTimer(state, data.id));
  const activeJobId = useSelector(state => state.timer.activeJobId);
  
  // Log props for debugging
  useEffect(() => {
    console.log(`TimeTrackerCard render for job ${data.id} - props:`, {
      isJobStarted, 
      isPaused, 
      showTracker, 
      timer,
      jobTimerValue: jobTimer ? jobTimer.value : 'not available',
      isActive: activeJobId === data.id
    });
  }, [isJobStarted, isPaused, showTracker, timer, jobTimer, activeJobId, data.id]);

  // Add useEffect to log when isPaused changes
  useEffect(() => {
    console.log(`TimeTrackerCard job ${data.id}: isPaused state changed to:`, isPaused);
  }, [isPaused, data.id]);

  const setLocalTimer = async () => {
    console.log(`Storing timer for job ${data.id}:`, timer);
    await AsyncStorage.setItem(`timer_${data.id}`, timer.toString());
  }

  const formatTime = seconds => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const handlePauseButtonPress = () => {
    console.log(`Pause button pressed in TimeTrackerCard for job ${data.id}`);
    
    // If job isn't started yet, start it first
    if (!isJobStarted) {
      console.log(`TimeTrackerCard: Job ${data.id} not started, starting it first`);
      if (handleStartStop) {
        handleStartStop();
      }
      return;
    }
    
    if (handlePause) {
      console.log(`Pausing job ${data.id}`);
      handlePause();
    }
  };

  const handleResumeButtonPress = () => {
    console.log(`Resume button pressed in TimeTrackerCard for job ${data.id}`);
    if (handleResume) {
      console.log(`Resuming job ${data.id}`);
      handleResume();
    } else {
      // If no handler was provided, try to resume directly
      dispatch(startTimer(data.id)); // Make this the active job
      dispatch(resumeTimer(data.id));
    }
  };

  return (
    <View style={styles.card}>
      <View style={{position: 'absolute', right: 15, top: 15}}>
        <JobStartedTimeIcon />
      </View>
      <View style={styles.header}>
        <Text style={styles.jobId}>THE-JB-{data.number}</Text>
        {/* <Text style={styles.jobStatus}>
          {isJobStarted ? (isPaused ? "Paused" : "Active") : "Ready"}
        </Text> */}
      </View>

      <Text style={styles.title}>{data.short_description}</Text>
      <Text style={styles.timer}>{formatTime(timer)}</Text>

      <View style={styles.footer}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: appColors.yellow,
            alignItems: 'center',
            borderRadius: 16,
            paddingHorizontal: 1,
            marginLeft: 6,
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
            {data.time_type_text}
          </Text>
          <View
            style={{
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
              backgroundColor: appColors.white,
              paddingVertical: 1,
              marginLeft: 4,
              marginRight: 1,
              marginTop: 1,
              marginBottom: 1,
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
              {data.type_text}
            </Text>
          </View>
        </View>
        <View style={{paddingTop:8}}>
        {/* Force re-render with key */}
        {!isJobStarted ? (
          // Job not started yet, show play button to start
          <TouchableOpacity
            key={`start-button-${data.id}`}
            style={styles.statusButton}
            onPress={handleStartStop}>
            <WhitePlayIcon height={16} width={16}/>
            <Text style={styles.statusText}>Start Job</Text>
          </TouchableOpacity>
        ) : isPaused ? (
          // Job is paused, show play button to resume
          <TouchableOpacity
            key={`paused-button-${data.id}`}
            style={styles.statusButton}
            onPress={handleResumeButtonPress}>
            <WhitePlayIcon height={16} width={16}/>
            <Text style={styles.statusText}>Resume Job</Text>
          </TouchableOpacity>
        ) : (
          // Job is running, show pause button
          <TouchableOpacity
            key={`in-progress-button-${data.id}`}
            style={styles.statusButton}
            onPress={handlePauseButtonPress}>
            <PauseJobIcon height={16} width={16}/>
            <Text style={styles.statusText}>In Progress</Text>
          </TouchableOpacity>
        )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    borderRadius: 32,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  jobId: {
    color: '#aaaaaa',
    fontSize: 10,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  timer: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '300',
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeFrame: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeFrameText: {
    fontSize: 10,
    color: '#333333',
    marginRight: 5,
  },
  hoursText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333333',
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  statusText: {
    color: appColors.white,
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 6,
  },
  jobStatus: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
    backgroundColor: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
});

export default TimeTrackerCard;

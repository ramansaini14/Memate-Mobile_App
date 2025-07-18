import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useLiveActivityTimer } from '../hooks/useLiveActivityTimer';
import { startTimer, pauseTimer, resumeTimer, stopTimer } from '../redux/TimerSlice';

const JobTimer = ({ jobId }) => {
  const dispatch = useDispatch();
  const jobTimer = useSelector(state => state.timer.jobs[jobId]);
  
  // This will automatically manage the Live Activity
  useLiveActivityTimer();

  const handleStart = () => {
    dispatch(startTimer(jobId));
  };

  const handlePause = () => {
    dispatch(pauseTimer(jobId));
  };

  const handleResume = () => {
    dispatch(resumeTimer(jobId));
  };

  const handleStop = () => {
    dispatch(stopTimer(jobId));
  };

};

export default JobTimer; 
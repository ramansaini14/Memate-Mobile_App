import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {appColors} from '../utils/appColors';
import WhitePlayIcon from '../assets/svg/WhitePlayIcon';
import JobStartedTimeIcon from '../assets/svg/JobStartedTimeIcon';
import JobPauseIcon from '../assets/svg/JobPauseIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { increment } from '../redux/TimerSlice';
import { useDispatch } from 'react-redux';

const TimeTrackerCard = ({
  data,
  isJobStarted,
  setIsJobStarted,
  showTracker,
  timer,
}) => {
  // console.log('isJobStarted', isJobStarted)

  const dispatch = useDispatch();
  // useEffect(() => {
  //   setLocalTimer()
  //  }, [timer]);

   const setLocalTimer = async () => {
    console.log('timer', timer);
    await AsyncStorage.setItem('timer', timer.toString());
   }

  const formatTime = seconds => {
    
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <View style={styles.card}>
      <View style={{position: 'absolute', right: 15, top: 15}}>
        <JobStartedTimeIcon />
      </View>
      <View style={styles.header}>
        <Text style={styles.jobId}>THE-JB-{data.number}</Text>
      </View>

      <Text style={styles.title}>SMM | theAd Tempaltes ST</Text>
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
        {showTracker ? (
          <View
            style={styles.statusButton}
            onPress={() => setIsJobStarted(false)}>
            <WhitePlayIcon />
            <Text style={styles.statusText}>In Progress</Text>
          </View>
        ) : (
          <View
            style={styles.statusButton}
            onPress={() => setIsJobStarted(true)}>
            <JobPauseIcon />
            <Text style={styles.statusText}>On pause</Text>
          </View>
        )}
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
});

export default TimeTrackerCard;

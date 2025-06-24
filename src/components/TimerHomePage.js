import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import JobStartedTimeIcon from '../assets/svg/JobStartedTimeIcon'
import PauseJobIcon from '../assets/svg/PauseJobIcon'
import WhitePlayIcon from '../assets/svg/WhitePlayIcon'
import { appColors } from '../utils/appColors'

const TimerHomePage = ({data,timer}) => {

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
      <Text style={styles.jobId}>{data.number}</Text>
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

        // Job is running, show pause button
        <View
          key={`in-progress-button-${data.id}`}
          style={styles.statusButton}>
          <PauseJobIcon height={16} width={16}/>
          <Text style={styles.statusText}>In Progress</Text>
        </View>
    </View>
  </View>
  )
}

export default TimerHomePage

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
        fontSize: 15,
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
})
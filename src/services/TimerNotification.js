// TimerBackgroundNotification.js
import React from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import BackgroundService from 'react-native-background-actions';
import notifee, { AndroidImportance } from '@notifee/react-native';

const NOTIF_ID = 'bg-timer';
const CHANNEL_ID = 'bg-timer-channel';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const timerTask = async (taskDataArguments) => {
  const { totalTime } = taskDataArguments;
  let timeLeft = totalTime;

  while (BackgroundService.isRunning() && timeLeft > 0) {
    // await notifee.displayNotification({
    //   id: NOTIF_ID,
    //   title: '⏳ Timer Running in Background',
    //   body: `Time left: ${timeLeft--}s`,
    //   android: {
    //     channelId: CHANNEL_ID,
    //     importance: AndroidImportance.HIGH,
    //     onlyAlertOnce: true,
    //     ongoing: true,
    //     pressAction: { id: 'default' },
    //   },
    // });

    notifee.displayNotification({
        title: 'Message from Sarah Lane',
        body: 'Tap to view your unread message from Sarah.',
        subtitle: 'Messages',
        android: {
          CHANNEL_ID,
          largeIcon: 'https://my-cdn/users/123.png',
          timestamp: Date.now() - 480000, // 8 minutes ago
          showTimestamp: true,
          showChronometer: true,
        },
      });

    await sleep(1000);
  }

  if (timeLeft <= 0) {
    await notifee.cancelNotification(NOTIF_ID);
    await BackgroundService.stop();
  }
};

const serviceOptions = {
  taskName: 'BackgroundTimer',
  taskTitle: 'Timer Active',
  taskDesc: 'Counting down in background',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff0000',
  linkingURI: 'yourapp://home', // optional
  parameters: {
    totalTime: 60, // default 60 seconds
  },
};

export default function TimerBackgroundNotification() {
  const startBackgroundTimer = async () => {
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: CHANNEL_ID,
        name: 'Background Timer Channel',
        importance: AndroidImportance.HIGH,
      });
    }

    await BackgroundService.start(timerTask, serviceOptions);
  };

  const stopBackgroundTimer = async () => {
    await BackgroundService.stop();
    await notifee.cancelNotification(NOTIF_ID);
  };

  return (
    <View style={styles.container}>
      <Button title="Start Background Timer (60s)" onPress={startBackgroundTimer} />
      <View style={{ height: 20 }} />
      <Button title="Stop Timer" onPress={stopBackgroundTimer} color="#d00" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
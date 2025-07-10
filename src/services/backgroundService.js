// backgroundService.js

import BackgroundService from 'react-native-background-actions';
import PushNotification from 'react-native-push-notification';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const veryIntensiveTask = async (taskDataArguments) => {
  const { delay } = taskDataArguments;
  let count = 0;

  while (BackgroundService.isRunning()) {
    console.log(`Running background task: ${count}`);
    count++;

    // Update the notification text
    PushNotification.localNotification({
      channelId: 'background-service',
      title: 'Timer Running',
      message: `Elapsed time: ${count}s`,
      playSound: false,
      soundName: 'default',
      importance: 'low',
      priority: 'low',
      ongoing: true,
      visibility: 'public',
      onlyAlertOnce: true,
    });

    await sleep(delay);
  }
};

const options = {
  taskName: 'TimerService',
  taskTitle: 'Timer Running',
  taskDesc: 'App is running a background timer',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourapp://home', // optional
  parameters: {
    delay: 1000,
  },
};

export const startBackgroundService = async () => {
  await BackgroundService.start(veryIntensiveTask, options);
};

export const stopBackgroundService = async () => {
  await BackgroundService.stop();
};
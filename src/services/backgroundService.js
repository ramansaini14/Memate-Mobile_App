import BackgroundService from 'react-native-background-actions';
import PushNotification from 'react-native-push-notification';

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

// Create notification channel once
PushNotification.createChannel(
  {
    channelId: 'call-timer',
    channelName: 'Call Timer',
    importance: 4,
  },
  created => console.log(`Channel created: ${created}`),
);

// Utility: Format seconds to hh:mm:ss
const formatTime = seconds => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(
    s,
  ).padStart(2, '0')}`;
};

// Update single notification like WhatsApp call timer
const updateCallTimerNotification = formattedTime => {
  PushNotification.localNotification({
    id: '101', // constant ID for single-notification updates
    channelId: 'call-timer',
    title: 'Ongoing Call',
    message: formattedTime,
    smallIcon: 'ic_launcher',
    playSound: false,
    importance: 'high',
    priority: 'max',
    ongoing: true,
    onlyAlertOnce: true,
    invokeApp: false,
    visibility: 'public',
  });
};

// Background task
// const callTimerTask = async taskData => {
//   const {delay, startTimer = 0} = taskData;
//   let count = startTimer;

//   while (BackgroundService.isRunning()) {
//     const formatted = formatTime(count);
//     // updateCallTimerNotification(formatted);
//     console.log('Timer:', formatted);
//     await BackgroundService.updateNotification({
//       taskDesc: formatted,
//     });

//     count++;
//     await sleep(delay);
//   }
// };

const callTimerTask = async taskData => {
  const {delay = 1000, startTimer = 0} = taskData;
  let startTime = Date.now() - startTimer * 1000;

  while (BackgroundService.isRunning()) {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - startTime) / 1000);
    const formatted = formatTime(elapsedSeconds);

    try {
      await BackgroundService.updateNotification({
        taskDesc: formatted,
      });

      // (Optional) Show a persistent Android notification
      // updateCallTimerNotification(formatted);
    } catch (err) {
      console.warn('Failed to update notification:', err);
    }

    await sleep(delay);
  }
};

// Background service options (static part)
const baseOptions = {
  taskName: 'MeMate Timer',
  taskTitle: 'Job in progress', // set only once
  taskDesc: 'Running Job timer...', // not dynamic
  taskIcon: {
    name: 'ic_stat_playstore_removebg_preview', // no file extension
    type: 'drawable', // must be drawable, NOT mipmap
  },
  color: '#000000',
  linkingURI: 'memate://home', // optional
};

// Start timer from custom start time
export const startCallTimer = async (startTimer = 0) => {
  const isRunning = await BackgroundService.isRunning();
  if (!isRunning) {
    const options = {
      ...baseOptions,
      parameters: {
        delay: 1000,
        startTimer: startTimer,
      },
    };

    await BackgroundService.start(callTimerTask, options);
  }
};

// Stop timer
export const stopCallTimer = async () => {
  const isRunning = await BackgroundService.isRunning();
  console.log('Stopping call timer, isRunning:', isRunning);
  if (isRunning) {
    try {
      await BackgroundService.stop();
      console.log('Background service stopped.');
    } catch (err) {
      console.warn('Failed to stop service:', err);
    }
  }

  // Cancel notification
  // PushNotification.cancelLocalNotifications({id: '101'});
};

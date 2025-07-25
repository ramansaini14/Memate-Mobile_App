import BackgroundService from 'react-native-background-actions';
import PushNotification from 'react-native-push-notification';

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

// Create channel once
PushNotification.createChannel(
  {
    channelId: 'call-timer',
    channelName: 'Call Timer',
    importance: 4,
  },
  created => console.log(`Channel created: ${created}`),
);

// Update single call-like timer notification
const updateCallTimerNotification = formattedTime => {
  PushNotification.localNotification({
    id: 101, // keep it fixed!
    channelId: 'call-timer',
    title: 'Ongoing Call',
    message: formattedTime, // shows like WhatsApp's "00:01:03"
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

// Background task with formatted timer
const callTimerTask = async ({delay}) => {
  let count = 0;

  while (BackgroundService.isRunning()) {
    const h = Math.floor(count / 3600);
    const m = Math.floor((count % 3600) / 60);
    const s = count % 60;

    const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(
      2,
      '0',
    )}:${String(s).padStart(2, '0')}`;
    updateCallTimerNotification(formatted);
    console.log('Timer:', formatted);

    count++;
    await sleep(delay);
  }
};

// Service options
const options = {
  taskName: 'MeMate Timer',
  taskTitle: 'Timer in progress', // only set once
  taskDesc: 'Job Timer running', // not updatable
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  linkingURI: 'yourapp://call', // optional
  parameters: {
    delay: 1000,
  },
};

// Export control functions
export const startCallTimer = async () => {
  const running = await BackgroundService.isRunning();
  if (!running) {
    await BackgroundService.start(callTimerTask, options);
  }
};

export const stopCallTimer = async () => {
  const running = await BackgroundService.isRunning();
  if (running) {
    await BackgroundService.stop();
  }

  // Cancel the notification
  PushNotification.cancelLocalNotifications({id: '101'});
  // For Android 13+, you may want to also use:
  PushNotification.cancelAllLocalNotifications(); // Optional
};

import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const registerPushNotifications = () => {
  PushNotification.configure({
    // 🔔 Triggered when a notification is received or opened
    onNotification: function (notification) {
      console.log('🔔 Notification:', notification);

      // Required on iOS
      if (Platform.OS === 'ios') {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    },

    // 🔑 Triggered when the device gets a push token (if remote push is configured)
    onRegister: function (token) {
      console.log('📱 Push Token:', token);
      // 👉 Send this token to your server to send push later
    },

    // iOS only
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });

  // Create Android channel (required)
  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: 'Default Channel',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`✅ Channel '${created ? 'created' : 'exists'}'`)
    );
  }
};
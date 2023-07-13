import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  Vibration,
  useColorScheme,
  Platform,
  AppState,
} from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
import PushNotification from 'react-native-push-notification';

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [receivedMessage, setReceivedMessage] = useState('');
  const [phishingSMS, setPhishingSMS] = useState('');
  const [phishingWords, setPhishingWords] = useState([]);
  const [alertDisplayed, setAlertDisplayed] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          'android.permission.READ_SMS',
          'android.permission.RECEIVE_SMS',
          'android.permission.VIBRATE',
        ]);

        if (
          granted['android.permission.READ_SMS'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.RECEIVE_SMS'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.VIBRATE'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('All permissions granted!');
          startSmsListener();
        } else {
          Alert.alert('Permissions denied!', 'You need to give permissions');
        }
      } catch (error) {
        console.error('Error occurred while requesting permissions:', error);
      }
    };

    const startSmsListener = () => {
      SmsListener.addListener(message => {
        const smsBody = message.body;
        checkForPhishingKeywords(smsBody);
      });
    };

    const checkForPhishingKeywords = smsBody => {
      // Define your phishing word list
      const phishingWordsList = ['phishing', 'scam', 'fraud'];

      // Check if any phishing word is present in the SMS body
      const foundPhishingWords = phishingWordsList.filter(word =>
        smsBody.toLowerCase().includes(word.toLowerCase())
      );

      if (foundPhishingWords.length > 0) {
        setPhishingSMS(smsBody);
        setPhishingWords(foundPhishingWords);
        setAlertDisplayed(true);
        Vibration.vibrate();
        // Display a push notification for the alert
        PushNotification.localNotification({
          channelId: 'phishing-alert-channel',
          title: 'Phishing SMS Detected',
          message: 'Be cautious of this SMS!',
          userInfo: { message: smsBody }, // Pass additional data with the notification
        });
      }
    };

    // Request permissions and start SMS listener
    requestPermissions();

    // Clean up the SMS listener when the component unmounts
    return () => {
      SmsListener.removeListener();
    };
  }, []);

  useEffect(() => {
    const createNotificationChannel = () => {
      // Create a notification channel for Android 8.0 (Oreo) and above
      if (Platform.OS === 'android' && Platform.Version >= 26) {
        const channelConfig = {
          channelId: 'phishing-alert-channel',
          channelName: 'Phishing Alert Channel',
          channelDescription: 'Channel for phishing SMS alerts',
          importance: PushNotification.Importance.High,
          vibration: true,
        };

        PushNotification.createChannel(channelConfig, created =>
          console.log(`Notification channel created: ${created}`)
        );
      }
    };

    // Create the notification channel
    createNotificationChannel();

    // Configure PushNotification
    PushNotification.configure({
      onNotification: notification => {
        console.log('Push Notification:', notification);
      },
      onBackgroundNotification: notification => {
        console.log('Background Push Notification:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    // Handle app state changes to properly handle notifications in the background
    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'background') {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // Clean up the app state change listener
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const showAlert = () => {
    Alert.alert(
      'Warning',
      'This SMS may contain a phishing attempt. Be cautious!',
      [
        {
          text: 'OK',
          onPress: () => console.log('User acknowledged the warning'),
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (phishingSMS !== '' && !alertDisplayed) {
      showAlert();
      setAlertDisplayed(true);
    }
  }, [phishingSMS, alertDisplayed]);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#F5F5F5' }]}>
      <View style={[styles.rectangle, { backgroundColor: isDarkMode ? '#333333' : '#FFFFFF' }]}>
        <Text style={[styles.subtitle, { color: isDarkMode ? '#FFFFFF' : '#282828' }]}>Message:</Text>
        <Text style={[styles.message, { color: isDarkMode ? '#FFFFFF' : '#282828' }]}>
          {receivedMessage ? receivedMessage : 'No message received yet. Waiting for message...'}
        </Text>
      </View>

      {phishingSMS !== '' && (
        <View style={[styles.rectangle, { backgroundColor: isDarkMode ? '#333333' : '#FFFFFF' }]}>
          <Text style={[styles.subtitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Phishing words detected:</Text>
          {phishingWords.map((word, index) => (
            <Text key={index} style={[styles.phishingWord, { backgroundColor: isDarkMode ? '#555555' : '#FFD2D2' }]}>
              {word}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rectangle: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
  },
  phishingWord: {
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
});

export default HomeScreen;

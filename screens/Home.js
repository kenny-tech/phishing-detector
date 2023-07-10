import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Alert, Vibration, Sound, Linking, useColorScheme } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';

const HomeScreen = () => {

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [receivedMessage, setReceivedMessage] = useState('');
  const [phishingSMS, setPhishingSMS] = useState('');
  const [phishingWords, setPhishingWords] = useState([]);
  const [alertDisplayed, setAlertDisplayed] = useState(false);

  const [user, setUser] = useState({
    name: 'Simon Peter',
    email: 'simon@example.com',
    phone: '123-456-7890',
  });

  useEffect(() => {

    const soundPath = 'notification_sound.mp3';
    let sound = null;

    const checkForPhishingKeywords = (message) => {

      const phishingKeywords = [
        "account",
        "update",
        "verify",
        "login",
        "password",
        "security",
        "suspicious",
        "confirm",
        "personal information",
        "bank",
        "credit card",
        "social security number",
        "online banking",
        "limited time offer",
        "win",
        "prize",
        "lottery",
        "free",
        "temporary",
        "expire",
        "suspend",
        "unauthorized",
        "reset",
        "banned",
        "immediately",
        "urgent",
        "important",
        "discount",
        "upgrade",
        "renew",
        "bonus",
        "account activity",
        "account suspension",
        "update your information",
        "click here",
        "open this",
        "verify your account",
        "change password",
        "unusual activity",
        "confirm your identity",
        "call this number",
        "click this link",
        "You have won",
        "banking information",
        "security breach",
      ]

      for (const keyword of phishingKeywords) {
        if (message.includes(keyword)) {
          // Handle phishing detection
          // playRingtone();
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

          // Perform additional actions like ringing the phone, sending data to the backend, etc.
          vibratePhone();

          console.log('Meesage', message);
          setReceivedMessage(message);

          break; // Exit the loop if a phishing keyword is found
        }
      }

      const detectedPhishingWords = [];
      for (const keyword of phishingKeywords) {
        if (message.includes(keyword)) {
          detectedPhishingWords.push(keyword);
        }
      }

      if (detectedPhishingWords.length > 0 && !alertDisplayed) {
        setPhishingSMS(message);
        setPhishingWords(detectedPhishingWords);
        setAlertDisplayed(true);
      }

      const link = extractLinkFromSMS(message);
      if (link) {
        handleLinkClick(link);
      }
    };

    const extractLinkFromSMS = (message) => {
      const regex = /(https?:\/\/[^\s]+)/g;
      const matches = message.match(regex);
      return matches ? matches[0] : null;
    };

    const handleLinkClick = (link) => {
      Alert.alert(
        'Phishing Link Clicked',
        `The user clicked the following link: ${link}`,
        [
          {
            text: 'OK',
            onPress: () => {
              sendUserData(`This user ${user.name} clicked the phishing link`);
              Linking.openURL(link);
            },
          },
        ],
        { cancelable: false }
      );
    };

    const sendUserData = (message) => {
      const userData = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        message,
      };

      console.log(userData);

      // axios
      //   .post('YOUR_BACKEND_URL', userData)
      //   .then((response) => {
      //     console.log('Data sent to backend:', response.data);
      //   })
      //   .catch((error) => {
      //     console.log('Error sending data to backend:', error);
      //   });
    };

    const playRingtone = () => {
      const soundObject = new Sound(soundPath, (error) => {
        if (error) {
          console.log('Error loading sound:', error);
        } else {
          soundObject.play(() => {
            soundObject.release();
          });
        }
      });
    };

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
          SmsListener.addListener((message) => {
            const smsBody = message.body;
            checkForPhishingKeywords(smsBody);
          });
        } else {
          Alert.alert('Permissions denied!', 'You need to give permissions');
        }
      } catch (error) {
        console.error('Error occurred while requesting permissions:', error);
      }
    };

    // const requestPermissions = async () => {
    //   try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.READ_SMS
    //     );
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       console.log('SMS permission granted');

    //       SmsListener.addListener((message) => {
    //         const smsBody = message.body;
    //         checkForPhishingKeywords(smsBody);
    //       });
    //     } else {
    //       console.log('SMS permission denied');
    //     }
    //   } catch (error) {
    //     console.log('Permission request failed:', error);
    //   }
    // };

    const vibratePhone = () => {
      Vibration.vibrate([200, 500, 200, 500], true); // Vibrate pattern: [wait, vibrate, wait, vibrate]
    };

    requestPermissions();
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#282828'
  },
  rectangle: {
    width: '100%',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#282828'
  },
  message: {
    fontSize: 16,
    color: '#282828'
  },
  phishingWord: {
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
    color: '#282828'
  },
});

export default HomeScreen;

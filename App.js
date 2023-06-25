import React, { useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Alert, Vibration } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';

const App = () => {

  useEffect(() => {
    const checkForPhishingKeywords = (message) => {

      const phishingKeywords = [
        "account",
        "update",
        "verify",
        "login",
        "password",
        "security",
        "suspicious",
        "urgent",
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
          Alert.alert('Potential phishing detected!');
          // Perform additional actions like ringing the phone, sending data to the backend, etc.
          // Perform additional actions like ringing the phone, sending data to the backend, etc.
          vibratePhone();
          break; // Exit the loop if a phishing keyword is found
        }
      }
    };

    const requestPermissions = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('SMS permission granted');

          SmsListener.addListener((message) => {
            const smsBody = message.body;
            checkForPhishingKeywords(smsBody);
          });
        } else {
          console.log('SMS permission denied');
        }
      } catch (error) {
        console.log('Permission request failed:', error);
      }
    };

    const vibratePhone = () => {
      Vibration.vibrate([200, 500, 200, 500], true); // Vibrate pattern: [wait, vibrate, wait, vibrate]
    };

    requestPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Phishing Detector</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;

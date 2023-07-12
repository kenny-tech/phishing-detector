import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';

import TitleText from '../components/TitleText';
import Label from '../components/Label';
import TextBox from '../components/TextBox';
import Space from '../components/Space';

const Signin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  let emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const handleSignin = e => {
    e.preventDefault();
    setLoading(false);

    if (email.length === 0 || password.length === 0) {
      setLoading(false);
      Alert.alert('Please enter required fields');
    } else if (emailValidator.test(email) === false) {
      setLoading(false);
      Alert.alert('Please enter a valid email address');
    } else {
      setLoading(true);
      let data = {
        email,
        password,
      };
      console.log(data);
      navigation.navigate('Home');
    }
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <TitleText textSize={35} textColor="#000" text="Sign In" />
        <View style={{marginLeft: 54, marginRight: 54, marginTop: 30}}></View>
        <TextBox
          placeholderText={'Email'}
          onChangeText={email => setEmail(email)}
          type={'email'}
          defaultValue={email}
        />
        <Space />
        <TextBox
          placeholderText={'Password'}
          onChangeText={password => setPassword(password)}
          type={'password'}
          defaultValue={password}
        />
        <Label
          labelTextColor="#FFFFFF"
          labelText="Forgot password?"
          labelSize={14}
        />
        <TouchableOpacity onPress={e => handleSignin(e)}>
          <View
            style={{
              width: 300,
              height: 50,
              borderRadius: 10,
              backgroundColor: '#00a0dd',
              alignItems: 'center',
              marginHorizontal: 50,
            }}>
            <Text style={{color: '#fff', fontSize: 24, paddingTop: 5}}>
              Sign In
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: 20}}></View>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{fontSize: 14, color: '#000'}}>
              Don't have an account yet? Sign Up{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signin;

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import TitleText from '../components/TitleText';
import Label from '../components/Label';
import TextBox from '../components/TextBox';
import Space from '../components/Space';
import SelectBox from '../components/SelectBox';

const Signup = ({navigation}) => {
  const [gender, setGender] = useState([
    {
      id: 1,
      name: 'Male',
    },
    {
      id: 2,
      name: 'Female',
    },
  ]);
  const [educationLevel, setEducationLevel] = useState([
    {
      id: 1,
      name: 'Formal',
    },
    {
      id: 2,
      name: 'Informal',
    },
    {
      id: 3,
      name: 'Secondary',
    },
    {
      id: 4,
      name: 'Tertiary',
    },
  ]);
  const [ageRange, setAgeRange] = useState([
    {
      id: 1,
      name: '15-25',
    },
    {
      id: 2,
      name: '26-35',
    },
    {
      id: 3,
      name: '36-45',
    },
    {
      id: 4,
      name: 'Above 45',
    },
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userGender, setUserGender] = useState('');
  const [education, setEducation] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = e => {
    e.preventDefault();
    setLoading(false);
    let emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      userGender.length === 0 ||
      education.length === 0 ||
      age.length === 0
    ) {
      setLoading(false);
      Alert.alert('Please enter required fields');
    } else if (emailValidator.test(email) === false) {
      setLoading(false);
      Alert.alert('Please enter a valid email address');
    } else {
      setLoading(true);
      let data = {
        name,
        email,
        password,
        gender: userGender,
        education,
        age,
      };
      console.log(data);
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{flex: 1, justifyContent: 'space-between'}}>
          <TitleText textSize={35} textColor="#000" text="Sign Up" />
          <View style={{marginLeft: 54, marginRight: 54, marginTop: 30}}></View>
          <TextBox
            placeholderText={'Name'}
            onChangeText={name => setName(name)}
            type={'text'}
            defaultValue={name}
          />
          <Space />
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
          <Space />
          <SelectBox
            options={gender}
            placeholder="Select Gender"
            selectedValue={userGender}
            onValueChange={value => setUserGender(value)}
            defaultValue={userGender}
          />
          <Space />
          <SelectBox
            options={educationLevel}
            placeholder="Select Education Level"
            selectedValue={education}
            onValueChange={value => setEducation(value)}
            defaultValue={education}
          />
          <Space />
          <SelectBox
            options={ageRange}
            placeholder="Select Age Range"
            selectedValue={age}
            onValueChange={value => setAge(value)}
            defaultValue={age}
          />
          <Label
            labelTextColor="#FFFFFF"
            labelText="Forgot password?"
            labelSize={14}
          />
          <TouchableOpacity onPress={e => handleSignup(e)}>
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
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{marginTop: 20}}></View>
          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text style={{fontSize: 14, color: '#000'}}>
                Already have an account? Sign In{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default Signup;

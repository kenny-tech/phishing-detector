import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import TitleText from '../components/TitleText';
import Label from '../components/Label';
import TextBox from '../components/TextBox';
import Space from '../components/Space';

const Signup = ({ navigation }) => {
    return (
        <View style={{flex: 1, alignItems:'flex-start'}}>
            <TitleText textSize={35} textColor="#000" text="Sign Up"/>
            <View style={{marginLeft: 54, marginRight: 54, marginTop: 60}}></View>
            <TextBox placeholderText={"Name"} />
            <Space/>
            <TextBox placeholderText={"Email"} />
            <Space/>
            <TextBox placeholderText={"Password"} />
           <Label labelTextColor="#FFFFFF" labelText="Forgot password?" labelSize={14} />
            <View style={{width: 300, height: 50, borderRadius: 10, backgroundColor: '#0037BA', alignItems: 'center', marginHorizontal: 50}}>
                <Text style={{color: '#fff', fontSize: 24, paddingTop: 5}}>Sign Up</Text>
            </View>
            <View style={{marginTop: 20}}></View>
            <View style={{alignSelf: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                    <Text style={{fontSize: 14, color:'#000'}}>Already have an account? Sign In </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Signup;
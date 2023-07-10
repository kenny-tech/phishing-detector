import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import TitleText from '../components/TitleText';
import Label from '../components/Label';
import TextBox from '../components/TextBox';
import Space from '../components/Space';

const Signin = ({ navigation }) => {
    return (
        <View style={{flex: 1, alignItems:'flex-start'}}>
           <TitleText textSize={35} textColor="#000" text="Sign In"/>
           <View style={{marginLeft: 54, marginRight: 54, marginTop: 60}}></View>
           <TextBox placeholderText={"Email"} />
           <Space />
           <TextBox placeholderText={"Password"} />
           <Label labelTextColor="#FFFFFF" labelText="Forgot password?" labelSize={14} />
           <View style={{width: 300, height: 50, borderRadius: 10, backgroundColor: '#6693F5', alignItems: 'center', marginHorizontal: 50}}>
                <Text style={{color: '#fff', fontSize: 24, paddingTop: 5}} onPress={() => navigation.navigate('Home')}>Sign In</Text>
            </View>
           <View style={{marginTop: 20}}></View>
           <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{fontSize: 14, color:'#000'}}>Don't have an account yet? Sign Up </Text>
            </TouchableOpacity>
           </View>
        </View>
    )
}

export default Signin;
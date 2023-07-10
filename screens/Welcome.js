import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import TitleText from '../components/TitleText';
import Label from '../components/Label';
import styles from '../styles/style';
 
const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor:'#fff'}}>
            <TitleText textSize={48} textColor="#0037BA" text="Phishing Detector" alignText="center"/>
            <View style={{marginBottom: 300}}></View>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.getStarted}>
                <Label labelTextColor="#FFF" labelText="Sign Up" labelSize={18} />
            </TouchableOpacity>
            <View style={{marginTop: 10}}></View>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Label labelTextColor="#0037BA" labelText="Sign in" labelSize={18} />
            </TouchableOpacity>         
        </View>
    )
}

export default WelcomeScreen;
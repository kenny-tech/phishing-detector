import React from 'react';
import { Text, View } from 'react-native';

import styles from '../styles/style';

const TitleText = ({ textSize, textColor, text, alignText }) => {
    return (
        <View style={{alignSelf: alignText}}>
            <Text style={[styles.titleText, {fontSize: textSize, color: textColor}]}>{text}</Text>        
        </View>
    )
}

export default TitleText;
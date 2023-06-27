import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.content}>This application warns you about spam and unwanted messages. It does this by analyzing the content of the message and using machine learning algorithms to detect patterns.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    content: {
        padding: 8,
        color: '#282828'
    },
   
});

export default AboutScreen
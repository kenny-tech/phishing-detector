import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

const AboutScreen = () => {

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#F5F5F5' }]}>
            <Text style={[styles.message, { color: isDarkMode ? '#FFFFFF' : '#282828' }]}>This app warns you about spam and unwanted messages. It does this by analyzing the content of the message and using machine learning algorithms to detect patterns.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    message: {
        fontSize: 16,
        color: '#282828',
        padding: 20,
    },

});

export default AboutScreen
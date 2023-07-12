import React from 'react';
import { View, TextInput } from 'react-native';

import styles from '../styles/style';

const TextBox = ({ placeholderText, onChangeText, type, defaultValue }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                height: 40,
            }}
            >
            <TextInput
                style={styles.input1}
                placeholder={placeholderText}
                onChangeText={onChangeText}
                secureTextEntry={type==='password' ? true : false}
                defaultValue={defaultValue}
            />
        </View>
    )
}

export default TextBox;
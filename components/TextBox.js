import React from 'react';
import { View, TextInput } from 'react-native';

import styles from '../styles/style';

const TextBox = ({ placeholderText, onChangeText, type }) => {
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
                onChange={onChangeText}
                secureTextEntry={type==='password' ? true : false}
            />
        </View>
    )
}

export default TextBox;
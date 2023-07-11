import React from 'react';
import { View, TextInput } from 'react-native';

import styles from '../styles/style';

const TextBox = ({ placeholderText, onChangeText }) => {
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
            />
        </View>
    )
}

export default TextBox;
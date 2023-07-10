import React from 'react';
import { View, TextInput } from 'react-native';

import styles from '../styles/style';

const TextBox = ({ placeholderText }) => {
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
            />
        </View>
    )
}

export default TextBox;
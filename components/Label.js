import React from 'react';
import { Text } from 'react-native';

import styles from '../styles/style';

const Label = ({ labelText, labelTextColor, labelSize }) => {
    return (
        <Text style={[styles.label, {color: labelTextColor, fontSize: labelSize}]}>{labelText}</Text>
    )
}

export default Label;
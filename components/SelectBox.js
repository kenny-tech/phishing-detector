import React, { useState } from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import styles from '../styles/style';

const SelectBox = () => {

  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
      }}>
      <Picker style={styles.select}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
};

export default SelectBox;

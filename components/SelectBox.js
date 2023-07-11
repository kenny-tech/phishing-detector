import React from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import styles from '../styles/style';

const SelectBox = ({ options, placeholder }) => {

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
      }}>
      <View style={styles.select}>
        <Picker>
          <Picker.Item label={placeholder} value={''} />
          {
            options && options.map(option => {
              return (
                <Picker.Item label={option.name} value={option.name} key={option.id}/>
              )
            })
          }
        </Picker>
      </View>
    </View>
  );
};

export default SelectBox;

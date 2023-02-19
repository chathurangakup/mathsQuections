import React from 'react';
import {View, StyleSheet, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors} from '../config/styles';

const {width} = Dimensions.get('window');

export const Search = props => {
  return (
    <View>
      <View style={styles.mainStyles}>
        <TextInput
          placeholder={'Search'}
          onChangeText={props.onChange}
          value={props.value}
          color={colors.blackColor}
          placeholderTextColor={'#345c74'}
          style={{fontSize: 12, fontFamily: 'bold', width: width / 1.5}}
        />
        <Icon name="md-search" size={20} color={colors.blackColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 15,
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: 40,
  },
});

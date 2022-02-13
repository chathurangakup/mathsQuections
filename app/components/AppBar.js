import {PROPERTY_TYPES} from '@babel/types';
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../config/styles';

export const AppBar = props => {
  const _backHandler = () => {
    props.navigation.goBack();
  };

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 9999,
      }}>
      <View
        style={{
          borderRadius: 50,
          width: 50,
          height: 50,
          backgroundColor: colors.white,
          margin: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => _backHandler()}>
          <Icon name="keyboard-backspace" size={30} color={colors.blackColor} />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            color: colors.white,
            fontSize: 20,
            padding: 15,
            fontWeight: 'bold',
          }}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

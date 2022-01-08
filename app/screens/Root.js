import React, {Component} from 'react';
import {View, StyleSheet, Platform,Text} from 'react-native';

import {Onboarding} from '../routes/NavigationStack';

const Root = () => {
  return (
    <View style={{flex:1}}>
      <Onboarding />
    </View>
  );
};

export default Root;

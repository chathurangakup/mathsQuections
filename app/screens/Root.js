import React, {useEffect} from 'react';
import {View, StyleSheet, Platform,Text} from 'react-native';

import {Onboarding, MainStack} from '../routes/NavigationStack';
import LocalizationHelper, {
  getAvailableLanguageList,
} from '../lib/LocalizationHelper';
import  SlideUpPanel from '../components/SlideUpPanel';

import Subj from '../screens/subjects/SubjectsMain';

const Root = () => {

  // useEffect(() => {
  //   const availableLanguageList = getAvailableLanguageList();
  //   LocalizationHelper.prototype.initializeLocalization(
  //     availableLanguageList,
  //     'en',
  //     true,
  //   );
  // });

  return (
    <View style={{flex:1}}>
      <Onboarding />
      {/* <MainStack/> */}

      <SlideUpPanel />
    </View>
  );
};

export default Root;

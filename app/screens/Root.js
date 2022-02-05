import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform, Text} from 'react-native';

import {Onboarding, MainStack} from '../routes/NavigationStack';
import LocalizationHelper, {
  getAvailableLanguageList,
} from '../lib/LocalizationHelper';
import SlideUpPanel from '../components/SlideUpPanel';

import Subj from '../screens/subjects/SubjectsMain';
import {getJwttoken} from '../lib/Utils';

const Root = () => {
  const [token, setToken] = useState(null);
  // useEffect(() => {
  //   const availableLanguageList = getAvailableLanguageList();
  //   LocalizationHelper.prototype.initializeLocalization(
  //     availableLanguageList,
  //     'en',
  //     true,
  //   );
  // });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const token = await getJwttoken();
    if (token != null) {
      setToken(token);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* <SplashScreen /> */}
      {token == null ? <Onboarding /> : <MainStack />}

      <SlideUpPanel />
    </View>
  );
};

export default Root;

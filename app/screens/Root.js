import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform, Text} from 'react-native';
import {connect} from 'react-redux';

import {Onboarding, MainStack} from '../routes/NavigationStack';
import LocalizationHelper, {
  getAvailableLanguageList,
} from '../lib/LocalizationHelper';
import SlideUpPanel from '../components/SlideUpPanel';
import {LoadingSpinner} from '../components/LoadingSpinner';

import Subj from '../screens/subjects/SubjectsMain';
import {getJwttoken} from '../lib/Utils';

const Root = props => {
  const [token, setToken] = useState(null);
  const [loggingStatus, setLoggingStatus] = useState(false);
  // useEffect(() => {
  //   const availableLanguageList = getAvailableLanguageList();
  //   LocalizationHelper.prototype.initializeLocalization(
  //     availableLanguageList,
  //     'en',
  //     true,
  //   );
  // });
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    //const token = await getJwttoken();

    // if (token != null) {
    //   setToken(token);
    // }
    if (props.isLoggedIn != undefined) {
      // setToken(token);
      console.log('props.isLoggedIn', props.isLoggedIn);
      setLoggingStatus(props.isLoggedIn);
    }
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [props.isLoggedIn]);

  if (loggingStatus != null) {
    return (
      <View style={{flex: 1}}>
        {/* <SplashScreen /> */}
        <LoadingSpinner showLoading={props.loading} />
        {loggingStatus == false ? <Onboarding /> : <MainStack />}

        <SlideUpPanel />
      </View>
    );
  } else {
    return <View style={{flex: 1}} />;
  }
};

const mapStateToProps = state => {
  return {
    loading: state.common.loading,
    isLoggedIn: state.common.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Root);

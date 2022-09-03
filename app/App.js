import React, {useEffect, useState} from 'react';
import {Animated, View, Text, StyleSheet, Dimensions} from 'react-native';
import {LocalizeProvider} from 'react-localize-redux';
import {Provider} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { PersistGate } from 'redux-persist/integration/react'

import Root from '../app/screens/Root';
import {NavigationContainer} from '@react-navigation/native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import {
  navigationRef,
  routeNameRef,
  onNavigationStateChange,
} from '../app/routes/NavigationHelper';

import LocalizationHelper from './lib/LocalizationHelper';

import configureStore from './Store';

const {store, persistor} = configureStore();
global.store = store;

const initialLanguageList = [
  {id: 'si', value: 'සිංහල', name: 'Sinhala'},
  // {id: 'ta', value: 'தமிழ்', name: 'Tamil'},
  {id: 'en', value: 'English', name: 'English'},
  // {id: 'ch', value: '中文', name: 'Chinese'},
  // {id: 'hi', value: 'हिन्दी', name: 'Hindi00'},
];

const {width, height} = Dimensions.get('window');

const App = () => {
  const [isInternetConnected, setIsInternetConnected] = useState(true);
  let fadeAnim = new Animated.Value(0);

  useEffect(() => {
    console.log('availableLanguageList', initialLanguageList);
    LocalizationHelper.prototype.initializeLocalization(
      initialLanguageList,
      'en',
      true,
    );

    Animated.timing(
      // Animate over time
      fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: true,
      },
    ).start();

    NetInfo.addEventListener(state => {
      handleConnectionChange(state.isConnected);
    });

    return () => {
      NetInfo.fetch().then(state => {
        console.log('Is connected?', state.isConnected);
        handleConnectionChange(state.isConnected);
      });
    };
  });

  const handleConnectionChange = isConnected => {
    setIsInternetConnected(isConnected);
  };

  const _renderNoInternet = () => {
    if (!isInternetConnected) {
      return (
        <Animated.View // Special animatable View
          style={{
            ...styles.animateBox,
            opacity: fadeAnim, // Bind opacity to animated value
          }}>
          <View style={styles.noInternet}>
            {/* <FastImage style={styles.noInternetIco} source={icons.noInternet} /> */}
            <Text style={styles.noInternetText}> {'No Internet'}</Text>
          </View>
        </Animated.View>
      );
    }
  };

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <LocalizeProvider store={store}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() =>
            (routeNameRef.current =
              navigationRef.current.getCurrentRoute().name)
          }
          onStateChange={() => onNavigationStateChange()}>
          <Root />
          {_renderNoInternet()}
        </NavigationContainer>
      </LocalizeProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  // rootView: {
  //   flex: 1,
  //   backgroundColor: colors.appBgColor,
  // },
  // loadingContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: colors.colorWhite,
  // },
  animateBox: {
    position: 'absolute',
    width: width - 40,
    bottom: 70,
    backgroundColor: '#7C7C7C',
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  noInternet: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noInternetText: {
    color: 'white',
    fontSize: 18,
  },
  noInternetIco: {
    width: 30,
    height: 30,
  },
});

export default gestureHandlerRootHOC(App);

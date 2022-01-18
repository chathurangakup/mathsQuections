import React, {useEffect} from 'react';
import {LocalizeProvider} from 'react-localize-redux';
import {Provider} from 'react-redux';

import Splash from '../app/screens/onboarding/Splash';
import Root from '../app/screens/Root';
import {NavigationContainer} from '@react-navigation/native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import {
  navigationRef,
  routeNameRef,
  onNavigationStateChange,
} from '../app/routes/NavigationHelper';

import LocalizationHelper from './lib/LocalizationHelper';



import configureStore from './Store';

const store = configureStore();

global.store = store;

const initialLanguageList = [
  {id: 'si', value: 'සිංහල', name: 'Sinhala'},
  {id: 'ta', value: 'தமிழ்', name: 'Tamil'},
  {id: 'en', value: 'English', name: 'English'},
  // {id: 'ch', value: '中文', name: 'Chinese'},
  // {id: 'hi', value: 'हिन्दी', name: 'Hindi'},
];

const App = () => {
  useEffect(() => {
    console.log("availableLanguageList",initialLanguageList);
    LocalizationHelper.prototype.initializeLocalization(
      initialLanguageList,
      'en',
      true,
    );
  });

  return (
    <Provider store={store}>
      <LocalizeProvider store={store}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() =>
            (routeNameRef.current =
              navigationRef.current.getCurrentRoute().name)
          }
          onStateChange={() => onNavigationStateChange()}>
          <Root />
        </NavigationContainer>
      </LocalizeProvider>
    </Provider>
  );
};

export default gestureHandlerRootHOC(App);

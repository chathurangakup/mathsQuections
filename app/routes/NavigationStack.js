import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import LanguageChange from '../screens/onboarding/LanguageChange';
import Splash from '../screens/onboarding/Splash';
import Login from '../screens/onboarding/Login';

import QuectionMain from '../screens/quectionsMain/QuectionsMain';

const onboardingScreens = {
  splash: {screen: Splash},
  languageChange: {screen: LanguageChange},
  login: {screen: Login},
};

const signInScreens = {
  quectionMain: {screen: QuectionMain},
};

const Stack = createNativeStackNavigator();


export const MainStack = () => {
  let screens = [];
  for (let key in signInScreens) {
    if (signInScreens.hasOwnProperty(key)) {
      screens.push(
        <Stack.Screen
          key={key}
          name={key}
          component={signInScreens[key].screen}
        />,
      );
    }
    console.log('kiki');
  }
  return (
    <Stack.Navigator
      initialRouteName="quectionMain"
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      {screens}
    </Stack.Navigator>
  );
};

export const Onboarding = () => {
  let screens = [];
  for (let key in onboardingScreens) {
    if (onboardingScreens.hasOwnProperty(key)) {
      screens.push(
        <Stack.Screen
          key={key}
          name={key}
          component={onboardingScreens[key].screen}
        />,
      );
    }
  }
  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      {screens}
    </Stack.Navigator>
  );
};

import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import LanguageChange from '../screens/onboarding/LanguageChange';
import Splash from '../screens/onboarding/Splash';
import Login from '../screens/onboarding/Login';

const onboardingScreens = {
  splash: {screen: Splash},
  languageChange: {screen: LanguageChange},
  login: {screen: Login},
};

const Stack = createNativeStackNavigator();

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
    console.log('kiki');
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

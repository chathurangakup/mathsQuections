import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import LanguageChange from '../screens/onboarding/LanguageChange';
import Splash from '../screens/onboarding/Splash';
import Login from '../screens/onboarding/Login';

import SubjectMain from '../screens/subjects/SubjectsMain';
import GradesMain from '../screens/grades/GradesMain';
import TitleMain from '../screens/titles/TitleMain';
import TeacherQuote from '../screens/teacherQuotes/TeacherQuote';
import QuectionMain from '../screens/quectionsMain/QuectionsMain';
import PinchScreen from '../screens/pinchScreen/PinchScreen';
import ProfileMain from '../screens/profile/ProfileMain';
import Categories from '../screens/categories/Categories';
import BattleLevels from '../screens/batttleLevels/BattleLevels';

import {BottomTabs} from './BottomTabNavigation'

const onboardingScreens = {
  splash: {screen: Splash},
  languageChange: {screen: LanguageChange},
  login: {screen: Login},
};

const signInScreens = {
  splash: {screen: Splash},
  bottomTabs: {screen: BottomTabs},
  subjectMain: {screen: SubjectMain},
  categories: {screen: Categories},
  battleLevels: {screen: BattleLevels},
  gradesMain: {screen: GradesMain},
  titleMain: {screen: TitleMain},
  teacherQuote: {screen: TeacherQuote},
  quectionMain: {screen: QuectionMain},
  pinchScreen: {screen: PinchScreen},
  profileMain: {screen: ProfileMain},
 
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
  }
  return (
    <Stack.Navigator
      initialRouteName="bottomTabs"
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

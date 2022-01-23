import * as React from 'react';

import {StackActions} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef();
export const routeNameRef = React.createRef();

export function onNavigationStateChange() {
  // Restructure the current and previous route objects to avoid the breaking of usage of react-navigation <v5
  const previousRoute = {
    routeName: routeNameRef?.current,
  };
  const currentRouteObject = navigationRef.current.getCurrentRoute();

  const currentRoute = {
    routeName: currentRouteObject?.name,
  };

  if (previousRoute.routeName !== currentRoute.routeName) {
    global.currentScreen = currentRoute;
    global.previousScreen = previousRoute;
    global.routeName = currentRoute.routeName;
    console.log('currentRoute', currentRoute.routeName);
  }

  if (global.PlayerIns != null) {
    global.PlayerIns.destroy();
  }

  // Save the current route name for later comparison
  routeNameRef.current = currentRouteObject.name;
}


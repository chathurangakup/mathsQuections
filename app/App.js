
 import React from 'react';
 import {LocalizeProvider} from 'react-localize-redux';
 import {Provider} from 'react-redux';
 
 import Splash from '../app/screens/onboarding/Splash';
 import Root from '../app/screens/Root';
 import {NavigationContainer} from '@react-navigation/native';
 
 import {
   navigationRef,
   routeNameRef,
   onNavigationStateChange,
 } from '../app/routes/NavigationHelper';

 import configureStore from './Store';
 
 const store = configureStore();
 
 const App = () => {
   return (
     <Provider  store={store}>
     <LocalizeProvider>
     <NavigationContainer
       ref={navigationRef}
       onReady={() =>
         (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
       }
       onStateChange={() => onNavigationStateChange()}>
       <Root />
     </NavigationContainer>
     </LocalizeProvider>
     </Provider>
   );
 };
 
 export default App;
 
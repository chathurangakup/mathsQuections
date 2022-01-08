import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

const Splash = props => {
  useEffect(() => {
    props.navigation.navigate('languageChange');
  });

  return (
    <View style={{flex: 1,backgroundColor:'red'}}>
      <Text>Hello,Splash!</Text>
    </View>
  );
};

export default Splash;

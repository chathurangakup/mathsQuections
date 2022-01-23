import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import Images from '../../config/Images';
import Lottie from '../../config/Lottie';
import {colors} from '../../config/styles';

const {width} = Dimensions.get('window');

let timer1;
const Splash = props => {
  const [time, setTime] = useState(0);

  const timeOut = () => {
    setTimeout(() => alert('lolo'), 5000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(5);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={Images.Welcome}
        resizeMode="cover"
        style={styles.mainComp}>
        <View style={{flex: 1}}>
          <LottieView source={Lottie.Welcome} autoPlay loop />
        </View>

        <View style={{padding: 30}}>
          <View style={{paddingBottom: 70}}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: colors.white,
                width: width / 2,
              }}>
              Grow your Education & Level Up with
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{fontSize: 45, fontWeight: 'bold', color: colors.white}}>
                Apē Iscole
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', flex: 1, paddingBottom: 40}}>
            <View style={{flexDirection: 'row', paddingTop: 20, flex: 3}}>
              <View
                style={{
                  width: 50,
                  height: 15,
                  backgroundColor: colors.white,
                  borderRadius: 20,
                  margin: 5,
                }}></View>
              <View
                style={{
                  width: 35,
                  height: 15,
                  backgroundColor: colors.white,
                  borderRadius: 20,
                  margin: 5,
                  opacity: 0.7,
                }}></View>
              <View
                style={{
                  width: 25,
                  height: 15,
                  backgroundColor: colors.white,
                  borderRadius: 20,
                  margin: 5,
                  opacity: 0.5,
                }}></View>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: colors.white,
                  borderRadius: 20,
                  margin: 5,
                  opacity: 0.4,
                }}></View>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: colors.white,
                  borderRadius: 20,
                  margin: 5,
                  opacity: 0.3,
                }}></View>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: colors.white,
                  borderRadius: 20,
                  margin: 5,
                  opacity: 0.2,
                }}></View>
            </View>
          
            <Animatable.View
              animation="slideInDown"
              duration={1500}
              style={{
                borderRadius: 10,
                backgroundColor: colors.white,
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('languageChange')}>
              <Icon
                name="play-outline"
                size={50}
                color={colors.primaryColor1}
              />
                </TouchableOpacity>
            </Animatable.View>
          
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainComp: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    position: 'relative',
  },
});

export default Splash;

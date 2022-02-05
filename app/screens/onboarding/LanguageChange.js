import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {initialize, addTranslationForLanguage} from 'react-localize-redux';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';

import LocalizationHelper from '../../lib/LocalizationHelper';

import Lottie from '../../config/Lottie';

import engFile from '../../locales/en.json';
import {colors} from '../../config/styles';
import Images from '../../config/Images';
import {setLanguageId} from '../../lib/Utils';

const Language = props => {
  const _changeLanguage = (selectedLangCode, needInit, langList) => {
    LocalizationHelper.prototype.changeAppLanguage(
      selectedLangCode,
      needInit,
      langList,
    );
  };

  const back = false;

  const initialLanguageList = [
    {id: 'si', value: 'සිංහල', name: 'Sinhala'},
    {id: 'ta', value: 'தமிழ்', name: 'Tamil'},
    {id: 'en', value: 'English', name: 'English'},
    // {id: 'ch', value: '中文', name: 'Chinese'},
    // {id: 'hi', value: 'हिन्दी', name: 'Hindi'},
  ];

  const clickNext = id => {
    setLanguageId(id);
    _changeLanguage(id, true, false);
    props.navigation.navigate('login');
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={Images.Welcome}
        resizeMode="cover"
        style={styles.mainComp}>
        <View style={{}}>
          <Text style={{color: colors.white, fontSize: 25}}>
            Select your language
          </Text>
          <View style={{paddingLeft: 30, paddingBottom: 30}}>
            <LottieView
              source={Lottie.TeachingGirl}
              autoPlay
              loop
              style={{width: 300, height: 300}}
            />
          </View>
        </View>

        <View style={{justifyContent: 'center'}}>
          {initialLanguageList.map((item, index) => (
            <Animatable.View
              animation="slideInUp"
              duration={1500}
              // delay={delay}
              // easing={t => Math.pow(t, 1.7)}
              // iterationCount="infinite"
              style={{
                borderColor: colors.secondaryColor2,
                borderWidth: 1,
                padding: 5,
                margin: 20,
                borderRadius: 20,
                shadowColor: '#fff',
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                  height: 1,
                  width: 1,
                },
              }}>
              <TouchableOpacity
                style={styles.languageView}
                onPress={() => clickNext(item.id)}>
                <Animatable.Text
                  style={styles.languageText}
                  animation="slideInUp"
                  duration={1500}>
                  {item.value}
                </Animatable.Text>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  languageListView: {
    marginTop: 20,
    width: '80%',
  },
  languageList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderTopColor: '#EBEBEB',
    height: 50,
  },
  languageText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 25,
  },
  mainComp: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    position: 'relative',
  },
});

export default Language;

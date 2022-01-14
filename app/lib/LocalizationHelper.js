// import AsyncStorage from '@react-native-community/async-storage';

import {initialize, addTranslationForLanguage} from 'react-localize-redux';

import siFile from '../locales/si.json'

// import {getConfig, setConfig, ajaxCall, createUrl} from './Utils';

import {
  //LANG_FLAG,
  // LOCALIZATION_VERSION_FLAG,
  // LOCALIZATION_COLLECTION_PATH,
  // FIREBASE_USER_CREDENTIAL_FLAG,
  LANG_LIST_FLAG,
} from '../config/settings';

export const initialLanguageList = [
  {id: 'si', value: 'සිංහල', name: 'Sinhala'},
  {id: 'ta', value: 'தமிழ்', name: 'Tamil'},
  {id: 'en', value: 'English', name: 'English', code: "en"},
  // {id: 'ch', value: '中文', name: 'Chinese'},
  // {id: 'hi', value: 'हिन्दी', name: 'Hindi'},
];

export const getAvailableLanguageList = async () => {
//  const cachedList = await AsyncStorage.getItem(LANG_LIST_FLAG);
  return  initialLanguageList;
};

// const FS = RNFetchBlob.fs;
// const LOCALIZATION_FILE_PATH = FS.dirs.DocumentDir + '/localization';

let formattedList = {};

export default class LocalizationHelper {
  initializeLocalization(listOfLanguages, currentLang, basicOnly) {
    this._languageMaker(currentLang, false, listOfLanguages, basicOnly);
  }

  changeAppLanguage(newLang, needToInitialize = false, listOfLanguages = null) {
    this._languageMaker(newLang, !needToInitialize, listOfLanguages);
  }

  
  async _languageMaker(
    newLang,
    fromChange = false,
    listOfLanguages = null,
    basicOnly = false,
  ) {
      let defaultLanguage = newLang;
    // if (!defaultLanguage) {
    //   defaultLanguage = 'en';
    //   setConfig(LANG_FLAG, defaultLanguage);
    // }
    if (listOfLanguages) {
     // AsyncStorage.setItem(LANG_LIST_FLAG, JSON.stringify(listOfLanguages));
      formattedList = this._formatLocalizationList(listOfLanguages);
    }
    global.lang = defaultLanguage;

    if (__DEV__) {
      this._fetchLocalizationFromBinary(defaultLanguage, basicOnly);
    } else {
      this._initLanguage(defaultLanguage, basicOnly);
    }
  }

  async _initLanguage(defaultLanguage, basicOnly) {
    this._fetchLocalizationFromBinary(defaultLanguage, basicOnly);
    // this._updateLocalizationFromFirestore(defaultLanguage, basicOnly);
  }

  _fetchLocalizationFromBinary(defaultLanguage, basicOnly) {
    let langFile = {};
    switch (defaultLanguage) {
      case 'si':
        langFile = require('../locales/si.json');
        break;
      case 'ta':
        langFile = require('../locales/ta.json');
        break;
      case 'en':
        langFile = require('../locales/en.json');
        break;
      default:
        langFile = require('../locales/en.json');
        break;
    }
    const onMissingTranslation = ({translationId}) => {
      return `${translationId}`;
    };

    global.store.dispatch(
      initialize({
        languages: formattedList,
        options: {
          renderToStaticMarkup: false,
          ignoreTranslateChildren: true,
          defaultLanguage: defaultLanguage,
          onMissingTranslation,
        },
      }),
    );
    this._updateLocalization(langFile, defaultLanguage);
  }


  _updateLocalization(currentLang, defaultLanguage) {
    console.log(global.store);
    console.log("currentLang",currentLang);
    global.store.dispatch(
      addTranslationForLanguage(currentLang, defaultLanguage),
    );
  }

  _formatLocalizationList(langList) {
    let tmpList = [];
    langList?.map(langItem => {
      tmpList.push({
        name: langItem.name,
        code: langItem.id,
      });
    });
    return tmpList;
  }
}

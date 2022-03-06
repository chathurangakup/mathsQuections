import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image,
  Keyboard,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {TextInput} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';

import {colors} from '../../config/styles';
import Images from '../../config/Images';
import {LoadingSpinner} from '../../components/LoadingSpinner';
import {Button} from '../../components/Button';
import {AppBar} from '../../components/AppBar';
import {
  showErrorSlideUpPanel,
  setJwttoken,
  setUserId,
  getLanguageId,
  setLanguageId,
} from '../../lib/Utils';
import {LOGOUT_IMAGE} from '../../config/settings';
import {LOGOUT} from '../../actyonTypes/Common';
import {UPDATE_USER_INFO, GET_USER_INFO} from './ProfileActionsTypes';

import LocalizationHelper from '../../lib/LocalizationHelper';

const {width, height} = Dimensions.get('window');

const Profile = props => {
  const t = props.translate;
  const [data, setData] = useState([]);
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isErrorUserName, setIsErrorUsername] = useState(false);
  const [designtion, setDesignation] = useState('');
  const [language, setLanguage] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [imagePath, setImagePath] = useState(Images.ProfilePic);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const initialLanguageList = [
    {id: 'si', value: 'සිංහල', name: 'Sinhala'},
    // {id: 'ta', value: 'தமிழ்', name: 'Tamil'},
    {id: 'en', value: 'English', name: 'English'},
    // {id: 'ch', value: '中文', name: 'Chinese'},
    // {id: 'hi', value: 'हिन्दी', name: 'Hindi'},
  ];

  const getPlatformURI = imagePath => {
    let imgSource = imagePath;

    console.log('imagePath', isNaN(imagePath));
    if (isNaN(imagePath)) {
      imgSource = {uri: imagePath};
      if (Platform.OS == 'android') {
        imgSource.uri = imgSource.uri;
      }
    } else {
      if (image != null) {
        imgSource = {uri: image};
        if (Platform.OS == 'android') {
          imgSource.uri = imgSource.uri;
        }
      } else {
        imgSource = Images.ProfilePic;
      }
    }

    return imgSource;
  };

  let imgSource = getPlatformURI(imagePath);

  const setLan = async () => {
    const language = await getLanguageId();
    if (language == 'en') {
      setLanguage('English');
    } else {
      setLanguage('සිංහල');
    }
  };

  useEffect(() => {
    // console.log('teachersQ', titleId);
    // let params = {titleId: titleId};
    // props.getTeachersQuotes(params);
    setLan();
    console.log('userData', props.userinfo);
    setUsername(props.userinfo.data.userData.userName);
    setRole(props.userinfo.data.userData.role);
    setImage(props.userinfo.data.userData.image);
    setEmail(props.userinfo.data.userData.email);
    if (props.userinfo.data.userData.role !== 'student') {
      setPhoneNum(props.userinfo.data.userData.phoneno);
    }
  }, []);

  useEffect(() => {
    console.log('profileUpdateConfig', props.profileUpdateConfig);
    console.log('profileUpdateConfig', props.userinfo.data.userData._id);
    if (props.profileUpdateConfig != undefined) {
      props.getUserInfo(props.userinfo.data.userData._id);
    }
  }, [props.profileUpdateConfig]);

  const clickNextBtn = async (imgPath, fileName) => {
    if (userName == '') {
      alert('enter userName');
    } else {
      if (fileName !== '' && userName !== '') {
        await uploadImage(imgPath, fileName);
      } else if (fileName === '' && userName !== '') {
        let params = {
          role: 'student',
          userName: userName,
          designation: '',
          phoneno: '',
          image: image,
        };
        console.log('userData', params);
        // const userId=JSON.parse(userData).userId
        props.updateUserInfo(params, props.userinfo.data.userData._id);
      }
    }
  };

  const clickLogout = async () => {
    setJwttoken('');
    setUserId('');
    props.changeLoginStatus(false);
    try {
      await GoogleSignin.signOut();
      props.navigation.navigate('splash');
    } catch (error) {
      console.error(error);
    }
  };

  const onPressLogout = () => {
    showErrorSlideUpPanel(
      'Logout',
      'Are you sure, you want to logout?',
      true,
      LOGOUT_IMAGE,
      'CANCEL',
      () => {},
      'Logout',
      () => clickLogout(),
    );
  };

  /**
   * Get the file name and handle the invalid null case
   */
  const getFileName = (name, path) => {
    console.log(name + path + 'hhhhhh');
    if (name != null) {
      return name;
    }

    // if (Platform.OS === "ios") {
    //     path = "~" + path.substring(path.indexOf("/Documents"));
    // }
    return path.split('/').pop();
  };

  /**
   * Get platform specific value from response
   */
  const getPlatformPath = response => {
    return Platform.select({
      android: {value: response.assets[0].uri},
      ios: {value: response.assets[0].uri},
    });
  };

  const chooseCamera = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true, // do not backup to iCloud
        path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
      },
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker', storage());
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let path = getPlatformPath(response).value;
        let fileName = getFileName(response.fileName, path);
        setImagePath(path);
        setImageFileName(fileName);
        // getUrl(path, fileName);
      }
    });
  };

  useEffect(() => {
    if (profileImageUrl !== '') {
      let params = {
        role: 'student',
        userName: userName,
        designation: '',
        phoneno: '',
        image: profileImageUrl,
      };
      console.log('userData', params);
      // const userId=JSON.parse(userData).userId
      props.updateUserInfo(params, props.userinfo.data.userData._id);
      console.log('add profileImageUrl with img', profileImageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileImageUrl !== '']);

  const uploadImage = async (uri, name) => {
    setIsLoading(true);
    const firebasePath = props.userinfo.data.userData.email;
    const imageRef = storage().ref(`${firebasePath}/${name}`);
    await imageRef.putFile(uri, {contentType: 'image/jpg'}).catch(error => {
      throw error;
    });
    const url = await imageRef.getDownloadURL().catch(error => {
      throw error;
    });
    setProfileImageUrl(url);
    setIsLoading(false);
    return url;
  };

  const chooseLib = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true, // do not backup to iCloud
        path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker', storage());
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let path = getPlatformPath(response).value;
        let fileName = getFileName(response.fileName, path);
        setImagePath(path);
        setImageFileName(fileName);
        console.log(fileName);
        // getUrl(path, fileName);
      }
    });
  };

  const _changeLanguage = (selectedLangCode, needInit, langList) => {
    LocalizationHelper.prototype.changeAppLanguage(
      selectedLangCode,
      needInit,
      langList,
    );
  };

  const clickChangeLanguage = value => {
    if (value === 'English') {
      setLanguageId('en');
      _changeLanguage('en', true, false);
    }
    if (value === 'සිංහල') {
      setLanguageId('si');
      _changeLanguage('si', true, false);
    }

    props.navigation.navigate('subjectMain');
  };

  return (
    <View
      style={{flex: 1, backgroundColor: '#fff'}}
      showsHorizontalScrollIndicator={false}>
      <AppBar navigation={props.navigation} isShowProfile={false} />
      <ImageBackground
        source={
          data != '' ? {uri: data[0].TeachersInfo[0].image} : Images.Welcome
        }
        style={{height: height / 3}}>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <TouchableOpacity>
            <Image style={styles.image} source={imgSource} />
          </TouchableOpacity>
          {role == 'student' ? (
            <View style={styles.eightyWidthStyle}>
              <TouchableOpacity
                onPress={chooseCamera}
                style={styles.camOrlibStyles}>
                <Text style={styles.camOrlibTextStyles}> Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={chooseLib}
                style={styles.camOrlibStyles}>
                <Text style={styles.camOrlibTextStyles}>Library</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ImageBackground>
      {isLoading == true ? <LoadingSpinner showLoading={true} /> : null}

      <View style={styles.bottomView}>
        <ScrollView>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}} />
            <View style={{flex: 0.5, paddingTop: 40, paddingRight: 20}}>
              <TouchableOpacity onPress={() => onPressLogout()}>
                <Text style={{color: 'black', fontSize: 18}}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.changeLanStyle}>
            <View style={{flex: 3, paddingLeft: 40}}>
              <Text style={{color: 'black'}}>Change language</Text>
            </View>
            <View style={{flex: 2, paddingRight: 40}}>
              <Dropdown
                rippleCentered
                label="Select Language"
                data={initialLanguageList}
                value={language}
                onChangeText={value => clickChangeLanguage(value)}
              />
            </View>
          </View>

          <View
            style={{
              paddingTop: 40,
              paddingLeft: 40,
              paddingBottom: 20,
              paddingRight: 40,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>Email </Text>
              </View>
              <View style={{flex: 3}}>
                <Text style={{color: 'black'}}>: {email}</Text>
              </View>
            </View>

            <View style={{padding: 10}} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>Role </Text>
              </View>
              <View style={{flex: 3}}>
                <Text style={{color: 'black'}}>
                  : {props.userinfo.data.userData.role}
                </Text>
              </View>
            </View>

            <View style={{padding: 10}} />
            {role == 'student' ? (
              <TextInput
                onSubmit={Keyboard.dismiss}
                theme={{
                  colors: {
                    // primary: '#7B1B67',
                    underlineColor: 'transparent',
                    marginTop: 5,
                    marginBottom: 5,
                    // placeholder: colors.npsOutlineTextHeader,
                    // text: colors.npsOutlineText,
                  },
                }}
                style={{backgroundColor: colors.white}}
                label="Username"
                value={userName}
                onChangeText={text => setUsername(text)}
                mode={'outlined'}
                error={userName == '' ? true : false}
                multiline={false}
                numberOfLines={1}
              />
            ) : (
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={{color: 'black'}}>UserName </Text>
                </View>
                <View style={{flex: 3}}>
                  <Text style={{color: 'black'}}>
                    : {props.userinfo.data.userData.userName}
                  </Text>
                </View>
              </View>
            )}

            <View style={{padding: 10}} />

            {role == 'student' ? null : (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text style={{color: 'black'}}>Designation </Text>
                  </View>
                  <View style={{flex: 3}}>
                    <Text style={{color: 'black'}}>
                      : {props.userinfo.data.userData.designation}
                    </Text>
                  </View>
                </View>
                <View style={{padding: 10}} />
              </View>
            )}

            {role == 'student' ? null : (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text style={{color: 'black'}}>Phone No </Text>
                  </View>
                  <View style={{flex: 3}}>
                    <Text style={{color: 'black'}}>: {phoneNum}</Text>
                  </View>
                </View>
                <View style={{padding: 10}} />
              </View>
            )}
          </View>
        </ScrollView>
        {role !== 'student' ? null : (
          <View
            style={{
              width: width / 2,
              justifyContent: 'center',
              alignSelf: 'center',
              paddingTop: 20,
            }}>
            <Button
              buttonStyle={{color: colors.primaryColor2}}
              onPressBtn={() => clickNextBtn(imagePath, imageFileName)}
              addText={'Update'}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    color: 'black',
    width: width / 3,
    height: width / 3,
    borderRadius: width / 2,
  },
  bottomView: {
    flex: 1,
    backgroundColor: 'white',
    bottom: 30,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  eightyWidthStyle: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: 10,
    justifyContent: 'center',
  },
  camOrlibStyles: {
    height: 30,
    backgroundColor: colors.secondaryColor2,
    margin: 10,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  camOrlibTextStyles: {
    color: colors.white,
  },
  changeLanStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
  },
});

const mapStateToProps = (state, props) => {
  return {
    translate: getTranslate(state.localize),
    default: state.common.defaultResult,
    loading: state.common.loading,
    userinfo: state.profiledata.profileInfoConfig,
    profileUpdateConfig: state.profiledata.profileUpdateConfig,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    changeLoginStatus: isLoggin => {
      dispatch({type: LOGOUT, payload: isLoggin});
    },
    updateUserInfo: (payload, userId) => {
      dispatch({type: UPDATE_USER_INFO, payload: payload, userId: userId});
    },
    getUserInfo: userIdData => {
      dispatch({
        type: GET_USER_INFO,
        userId: userIdData,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

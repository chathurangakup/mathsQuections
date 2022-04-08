import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import LottieView from 'lottie-react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {TextInput, HelperText} from 'react-native-paper';

import {fontSizes, materialTextFieldStyle, colors} from '../../config/styles';
import {LOGOUT_IMAGE} from '../../config/settings';

import {
  setConfig,
  getConfig,
  createUrl,
  ajaxCall,
  setJwttoken,
  setUserId,
  showErrorSlideUpPanel,
  validateEmail,
} from '../../lib/Utils';
import Images from '../../config/Images';
import Lottie from '../../config/Lottie';
import {Button} from '../../components/Button';
import {LOGIN} from '../../actyonTypes/Common';

const {width, height} = Dimensions.get('window');

var currentdate = new Date();
var datetime =
  'Last Sync: ' +
  currentdate.getDate() +
  '/' +
  (currentdate.getMonth() + 1) +
  '/' +
  currentdate.getFullYear() +
  ' @ ' +
  currentdate.getHours() +
  ':' +
  currentdate.getMinutes() +
  ':' +
  currentdate.getSeconds();
//debug
// GoogleSignin.configure({
//   // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
//   androidClientId:
//     '72837180619-kk62m0opp5mauj9ivv1qulp2ul5t95mc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//   // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   // hostedDomain: '', // specifies a hosted domain restriction
//   // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//   // accountName: '', // [Android] specifies an account name on the device that should be used
//   // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//   // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//   // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
// });

//live
GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
  androidClientId:
    '471820526676-c643e7l6hj4t37seno7dhv56upsrsmem.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

const Login = props => {
  const t = props.translate;
  const [email, setEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isErroeEmail, setIsErrorEmail] = useState(false);
  const [isErrorUserName, setIsErrorUserName] = useState(false);
  const [isHaveAccount, setIsHaveAccount] = useState(false);

  const setUser = () => {
    setConfig();
  };

  const getUser = () => {
    console.log(getConfig());
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const url = createUrl('users', 'signup');
      let params = {
        username: userInfo.user.name,
        email: userInfo.user.email,
        phoneno: '',
        designation: '',
        role: 'student',
        date: datetime,
        image: userInfo.user.photo,
      };

      const responce = await ajaxCall(url, params, true, 'POST', false);
      console.log('responce', responce);
      if (responce.result == 'success') {
        const loginUrl = createUrl('users', 'login');
        let params = {
          email: userInfo.user.email,
        };
        const responceLogin = await ajaxCall(
          loginUrl,
          params,
          true,
          'POST',
          false,
        );
        // eslint-disable-next-line eqeqeq
        if (responceLogin.success == true) {
          console.log('responce', responceLogin.userId);
          setJwttoken(responceLogin.token);
          setUserId(responceLogin.userId);
          props.changeLoginStatus(true);
          props.navigation.navigate('subjectMain');
        }
      }
    } catch (error) {
      console.log(error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const getTokenFunc = async () => {
    const loginUrl = createUrl('users', 'login');
    let params = {
      email: email,
    };
    const responce = await ajaxCall(loginUrl, params, true, 'POST', false);
    if (responce.success == true) {
      console.log('responce', responce);
      setJwttoken(responce.token);
      setUserId(responce.userId);
      props.changeLoginStatus(true);
    }
  };

  const clickLogin = async () => {
    const url = createUrl('users', 'signup');
    let params = {
      username: userName,
      email: email,
      phoneno: '',
      designation: '',
      role: 'student',
      date: datetime,
      image: '',
    };
    // auth.login();
    if (isHaveAccount) {
      if (email == null || userName == null) {
        setIsErrorEmail(true);
        setIsErrorUserName(true);
      } else {
        if (isErroeEmail !== true) {
          const responce = await ajaxCall(url, params, true, 'POST', false);
          console.log('responce', responce);
          if (responce.result == 'success') {
            getTokenFunc();
          }
        }
      }
    } else {
      if (email == null) {
        setIsErrorEmail(true);
      } else {
        if (isErroeEmail !== true) {
          const responce = await ajaxCall(url, params, true, 'POST', false);
          console.log('responce', responce);
          if (responce.result == 'success') {
            getTokenFunc();
          } else if (responce.result == 'error') {
            showErrorSlideUpPanel(
              'Oops',
              'You dont have an accout, please Register',
              false,
              LOGOUT_IMAGE,
              'CANCEL',
              () => {},
              'Logout',
              () => {},
              () => {},
              'OK',
            );
          }
        }
      } // isShowUsername false
    }
  };

  useEffect(() => {
    if (props.isLoggedIn) {
      props.navigation.navigate('subjectMain');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isLoggedIn]);

  const checkEmail = () => {
    let isEmailValidate = validateEmail(email);
    setIsErrorEmail(!isEmailValidate);
  };

  const checkUserName = () => {
    if (userName == '') {
      setIsErrorUserName(true);
    } else {
      setIsErrorUserName(false);
    }
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      showsHorizontalScrollIndicator={false}>
      <ImageBackground source={Images.Welcome} style={{height: height / 2.5}}>
        <View>
          <View style={styles.rootStyle}>
            <LottieView
              source={Lottie.UserProfile}
              autoPlay
              loop
              style={{width: 250, height: 250}}
            />
            <View>
              <Text style={{color: 'black', fontSize: 30}}>Login</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.bottomView}>
        <View style={{paddingTop: 40, paddingLeft: 40, paddingBottom: 20}}>
          <Text style={{color: 'black'}}>{t('login.title')}</Text>
        </View>

        <View style={{width: width / 1.2, marginLeft: 40}}>
          {/* <LoadingSpinner showLoading={true} /> */}
          <TextInput
            theme={{
              colors: {
                underlineColor: 'transparent',
                // placeholder: colors.npsOutlineTextHeader,
                // text: colors.npsOutlineText,
              },
            }}
            style={{backgroundColor: colors.white}}
            label="Email"
            //value={this.state.otherText}
            onBlur={text => checkEmail(text)}
            onChangeText={text => setEmail(text)}
            mode={'outlined'}
            numberOfLines={1}
          />
          <HelperText type="error" visible={isErroeEmail}>
            Email address is invalid!
          </HelperText>
          {isHaveAccount ? (
            <View>
              <TextInput
                theme={{
                  colors: {
                    underlineColor: 'transparent',
                    // placeholder: colors.npsOutlineTextHeader,
                    // text: colors.npsOutlineText,
                  },
                }}
                style={styles.usernameTextStyles}
                label="UserName"
                //value={this.state.otherText}
                onBlur={() => checkUserName()}
                onChangeText={text => setUserName(text)}
                mode={'outlined'}
                numberOfLines={1}
              />
              <HelperText type="error" visible={isErrorUserName}>
                Please enter UserName
              </HelperText>
            </View>
          ) : null}
        </View>
        <View
          style={{
            width: width / 2,
            justifyContent: 'center',
            alignSelf: 'center',
            paddingTop: 20,
          }}>
          <Button
            buttonStyle={{color: colors.primaryColor2}}
            onPressBtn={() => clickLogin()}
            addText={
              isHaveAccount
                ? t('login.registerBtnText')
                : t('login.loginBtnText')
            }
          />
        </View>
        <View style={{alignItems: 'center', padding: 20}}>
          <View>
            <Text style={{color: colors.blackColor, padding: 10}}> Or </Text>
          </View>
          <GoogleSigninButton
            style={{width: width / 2, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            //disabled={this.state.isSigninInProgress}
          />
        </View>

        <View style={styles.loginBtnRootStyle}>
          <Text style={{color: 'black'}}>
            {isHaveAccount ? t('login.text2') : t('login.text1')}
          </Text>
          <TouchableOpacity onPress={() => setIsHaveAccount(!isHaveAccount)}>
            <Text style={styles.loginBtnTextStyle}>
              {isHaveAccount
                ? t('login.loginBtnText')
                : t('login.registerBtnText')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    flex: 1,
    backgroundColor: 'white',
    bottom: 40,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  loginBtnRootStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: 20,
  },
  loginBtnTextStyle: {
    paddingLeft: 10,
    paddingBottom: 20,
    color: colors.red,
  },
  rootStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  usernameTextStyles: {
    backgroundColor: colors.white,
    marginTop: 20,
  },
});

const mapStateToProps = (state, props) => {
  return {
    translate: getTranslate(state.localize),
    default: state.common.defaultResult,
    loading: state.common.loading,
    isLoggedIn: state.common.isLoggedIn,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    changeLoginStatus: isLoggin => {
      dispatch({type: LOGIN, payload: isLoggin});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

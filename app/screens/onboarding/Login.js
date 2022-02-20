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
import {TextInput} from 'react-native-paper';

import {fontSizes, materialTextFieldStyle, colors} from '../../config/styles';

import {
  setConfig,
  getConfig,
  createUrl,
  ajaxCall,
  setJwttoken,
  setUserId,
} from '../../lib/Utils';
import Images from '../../config/Images';
import Lottie from '../../config/Lottie';
import {LoadingSpinner} from '../../components/LoadingSpinner';
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

GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
  androidClientId:
    '72837180619-kk62m0opp5mauj9ivv1qulp2ul5t95mc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
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

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      //  this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  const clickLogin = async () => {
    //  props.changeLoginStatus(true);
    //  props.navigation.navigate('subjectMain');
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
        alert('Please enter email and username');
      } else {
        const responce = await ajaxCall(url, params, true, 'POST', false);
        console.log('responce', responce);
      }
    } else {
      if (email == null) {
        alert('Please enter email');
      } else {
        const responce = await ajaxCall(url, params, true, 'POST', false);
        console.log('responce', responce);
        if (responce.result == 'success') {
          const loginUrl = createUrl('users', 'login');
          let params = {
            email: email,
          };
          const responce = await ajaxCall(
            loginUrl,
            params,
            true,
            'POST',
            false,
          );
          if (responce.success == true) {
            console.log('responce', responce);
            setJwttoken(responce.token);
            setUserId(responce.userId);
            props.changeLoginStatus(true);
          }
        }
      }
    } // isShowUsername false
  };

  useEffect(() => {
    if (props.isLoggedIn) {
      props.navigation.navigate('subjectMain');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isLoggedIn]);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      showsHorizontalScrollIndicator={false}>
      <ImageBackground source={Images.Welcome} style={{height: height / 2.5}}>
        <View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 30,
            }}>
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
          <Text style={{color: 'black'}}>Warmly welcome to Ape Iscole</Text>
        </View>
        <View style={{paddingLeft: 40, flexDirection: 'row'}}>
          <Text style={{color: 'black'}}>
            {isHaveAccount
              ? 'I already have an account'
              : 'I Dont have account'}
          </Text>
          <TouchableOpacity onPress={() => signOut()}>
            <Text
              style={{
                color: 'black',
                paddingLeft: 10,
                paddingBottom: 20,
                color: colors.red,
              }}>
              {isHaveAccount ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: width / 1.2, marginLeft: 40}}>
          <LoadingSpinner showLoading={props.loading} />
          <TextInput
            theme={{
              colors: {
                primary: '#7B1B67',
                underlineColor: 'transparent',
                // placeholder: colors.npsOutlineTextHeader,
                // text: colors.npsOutlineText,
              },
            }}
            style={{backgroundColor: colors.white}}
            label="Email"
            //value={this.state.otherText}
            onChangeText={text => setEmail(text)}
            mode={'outlined'}
            numberOfLines={1}
          />
          {isHaveAccount ? (
            <TextInput
              theme={{
                colors: {
                  primary: '#7B1B67',
                  underlineColor: 'transparent',
                  // placeholder: colors.npsOutlineTextHeader,
                  // text: colors.npsOutlineText,
                },
              }}
              style={{
                backgroundColor: colors.white,
                marginTop: 20,
                marginBottom: 30,
              }}
              label="UserName"
              //value={this.state.otherText}
              onChangeText={text => setUserName(text)}
              mode={'outlined'}
              numberOfLines={1}
            />
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
            addText={isHaveAccount ? 'Register' : 'Login'}
          />
        </View>
        <View style={{alignItems: 'center', padding: 20}}>
          <View>
            <Text style={{color: colors.blackColor}}> Or </Text>
          </View>
          <GoogleSigninButton
            style={{width: width / 2, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            //disabled={this.state.isSigninInProgress}
          />
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

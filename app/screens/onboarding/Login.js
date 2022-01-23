import React, {useEffect} from 'react';
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

import {setConfig, getConfig, createUrl,ajaxCall} from '../../lib/Utils';
import Images from '../../config/Images';
import Lottie from '../../config/Lottie';
import { LoadingSpinner} from '../../components/LoadingSpinner';
import {Button} from '../../components/Button';

const {width, height} = Dimensions.get('window');

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

  useEffect(async() => {
    console.log("loading",props.loading);
    const url = createUrl('users','userRole/teacher');
    const param ={
      userName: null,
      email:"malaaa10@gmail.com",
      phoneno:"255652",
      designation:"student",
      role:"student",
      date:"2022/1/15",
      image:""
    }
     const responce=await ajaxCall(url, param,true,'GET');
    console.log("responce",responce)

    console.log("createUrl")
  }, []);

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
          </View>
        </View>
      </ImageBackground>
      <View style={styles.bottomView}>
        <View style={{padding: 40}}>
          <Text style={{color: 'black'}}>Warmly welcome to Ape Iscole</Text>
        </View>
        <View style={{width: width / 1.2, marginLeft: 40}}>
        <LoadingSpinner showLoading={props.loading}/>
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
            label="Enter your feedback"
            //value={this.state.otherText}
            // onChangeText={text =>
            //  // this.setState({otherText: text, otherTxtError: ''})
            // }
            mode={'outlined'}
            multiline={true}
            numberOfLines={1}
          />
      
     <TextInput
            theme={{
              colors: {
                primary: '#7B1B67',
                underlineColor: 'transparent',
                // placeholder: colors.npsOutlineTextHeader,
                // text: colors.npsOutlineText,
              },
            }}
            style={{backgroundColor: colors.white,marginTop:20,marginBottom:30}}
            label="Enter your feedback"
            //value={this.state.otherText}
            // onChangeText={text =>
            //  // this.setState({otherText: text, otherTxtError: ''})
            // }
            mode={'outlined'}
            multiline={true}
            numberOfLines={1}
          />

        </View>
        <View
          style={{
            width: width / 2,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Button
            buttonStyle={{color: colors.primaryColor2}}
            onPressBtn={signOut}
            addText={'Login'}
          />
        </View>
        <View style={{alignItems:'center',padding:20}}>
          <View>
            <Text style={{color:colors.blackColor}}> Or </Text>
          </View>
          <GoogleSigninButton
            style={{width: width/2, height: 48}}
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
  };
};

export default connect(mapStateToProps)(Login);

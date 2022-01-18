import React,{useEffect} from 'react';
import {Text, View,TouchableOpacity, ScrollView, ImageBackground, Dimensions,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import LottieView from 'lottie-react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {fontSizes, materialTextFieldStyle, colors} from '../../config/styles';
import TextField from '../../components/TextField';

import {setConfig, getConfig} from '../../lib/Utils';
import Images from '../../config/Images';
import Lottie from '../../config/Lottie';
import {Button} from '../../components/Button';

const {width,height} = Dimensions.get('window');

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
})

const Login = props => {
   const t = props.translate;

   useEffect(()=>{
   },[]);

   const setUser = () =>{
       setConfig()
   }

   const getUser = () =>{
     console.log(getConfig())
     
   }

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
    <ScrollView style={{flex:1,backgroundColor:'#fff'}} showsHorizontalScrollIndicator={false}>
      <ImageBackground source={Images.Welcome} style={{height:height/2.5}}>
        <View>
        <View style={{alignItems:'center',justifyContent:'center',paddingTop:30}}>
          <LottieView source={Lottie.UserProfile} autoPlay loop style={{width:250,height:250}} />
        </View>
        </View>
      </ImageBackground>
      <View style={styles.bottomView}>
        <View style={{padding:40}}>
           <Text style={{color:'black'}}>Warmly welcome to Ape Iscole</Text>
        </View>
        <View style={{width: width/2, justifyContent:'center',alignSelf:'center'}}>
         <Button 
         buttonStyle={{color: colors.primaryColor2}}
         onPressBtn={signOut}
         addText={"Login"}
         />
        </View>

        <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      //disabled={this.state.isSigninInProgress}
    />
         
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bottomView:{
    flex: 1,
    backgroundColor:'white',
    bottom:40,
    borderTopStartRadius: 60,
    borderTopEndRadius:60
  }
});

const mapStateToProps = (state, props) => {
  return {
    translate: getTranslate(state.localize),
    default: state.common.defaultResult,
  };
};

export default connect(mapStateToProps)(Login);

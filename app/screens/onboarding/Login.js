import React,{useEffect} from 'react';
import {Text, View,TouchableOpacity, ScrollView, ImageBackground, Dimensions,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import LottieView from 'lottie-react-native';

import {fontSizes, materialTextFieldStyle, colors} from '../../config/styles';
import TextField from '../../components/TextField';

import {setConfig, getConfig} from '../../lib/Utils';
import Images from '../../config/Images';
import Lottie from '../../config/Lottie';
import {Button} from '../../components/Button';

const {width,height} = Dimensions.get('window');

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
         onPressBtn={()=>alert('juj')}
         />
        </View>
         
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

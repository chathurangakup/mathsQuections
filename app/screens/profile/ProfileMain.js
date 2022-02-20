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
} from 'react-native';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {TextInput} from 'react-native-paper';

import {colors} from '../../config/styles';
import Images from '../../config/Images';
import {LoadingSpinner} from '../../components/LoadingSpinner';
import {Button} from '../../components/Button';
import {AppBar} from '../../components/AppBar';
import {showErrorSlideUpPanel, setJwttoken, setUserId} from '../../lib/Utils';
import {LOGOUT_IMAGE} from '../../config/settings';
import {LOGOUT} from '../../actyonTypes/Common';

const {width, height} = Dimensions.get('window');

const Profile = props => {
  const t = props.translate;
  const [data, setData] = useState([]);

  // const {titleId, subjectId, gradesId} = props.route.params;

  useEffect(() => {
    // console.log('teachersQ', titleId);
    // let params = {titleId: titleId};
    // props.getTeachersQuotes(params);
    //console.log("subjectsConfig".props.subjectsConfig);
  }, []);

  useEffect(() => {
    console.log('teachersQ', props.config);
    // if (props.config != undefined) {
    //   console.log('teachersQ', props.config);
    //   setData(props.config.data.result);
    // }
  }, [props.config]);

  const clickNextBtn = () => {
    if (data.length != 0) {
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
        <View style={{alignItems: 'center', marginTop: 60}}>
          <TouchableOpacity onPress={() => onPressProfile()}>
            <Image
              style={styles.image}
              source={
                props.profilePicImage == null
                  ? Images.ProfilePic
                  : props.profilePicImage
              }
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.bottomView}>
        <ScrollView>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}} />
            <View style={{flex: 0.5, paddingTop: 40, paddingRight: 20}}>
              <TouchableOpacity onPress={() => onPressLogout()}>
                <Text style={{color: 'black'}}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              paddingTop: 40,
              paddingLeft: 40,
              paddingBottom: 20,
              paddingRight: 40,
            }}>
            <Text style={{color: 'black'}}>Email: </Text>
            <View style={{padding: 10}} />
            <Text style={{color: 'black'}}>Role: </Text>
            <View style={{padding: 10}} />
            <TextInput
              onSubmit={Keyboard.dismiss}
              theme={{
                colors: {
                  primary: '#7B1B67',
                  underlineColor: 'transparent',
                  marginTop: 5,
                  marginBottom: 5,
                  // placeholder: colors.npsOutlineTextHeader,
                  // text: colors.npsOutlineText,
                },
              }}
              style={{backgroundColor: colors.white}}
              label="Username"
              //value={this.state.otherText}
              // onChangeText={text => setEmail(text)}
              mode={'outlined'}
              multiline={false}
              onBlur={() => alert('kk')}
              numberOfLines={1}
            />
            <View style={{padding: 10}} />

            <TextInput
              onSubmit={Keyboard.dismiss}
              theme={{
                colors: {
                  primary: '#7B1B67',
                  underlineColor: 'transparent',
                  marginTop: 5,
                  marginBottom: 5,
                  // placeholder: colors.npsOutlineTextHeader,
                  // text: colors.npsOutlineText,
                },
              }}
              style={{backgroundColor: colors.white}}
              label="Email"
              //value={this.state.otherText}
              // onChangeText={text => setEmail(text)}
              mode={'outlined'}
              multiline={false}
              onBlur={() => alert('kk')}
              numberOfLines={1}
            />

            <View style={{padding: 10}} />

            <TextInput
              onSubmit={Keyboard.dismiss}
              theme={{
                colors: {
                  primary: '#7B1B67',
                  underlineColor: 'transparent',
                  marginTop: 5,
                  marginBottom: 5,
                  // placeholder: colors.npsOutlineTextHeader,
                  // text: colors.npsOutlineText,
                },
              }}
              style={{backgroundColor: colors.white}}
              label="Email"
              //value={this.state.otherText}
              // onChangeText={text => setEmail(text)}
              mode={'outlined'}
              multiline={false}
              onBlur={() => alert('kk')}
              numberOfLines={1}
            />
            <View style={{padding: 10}} />

            <TextInput
              onSubmit={Keyboard.dismiss}
              theme={{
                colors: {
                  primary: '#7B1B67',
                  underlineColor: 'transparent',
                  marginTop: 5,
                  marginBottom: 5,
                  // placeholder: colors.npsOutlineTextHeader,
                  // text: colors.npsOutlineText,
                },
              }}
              style={{backgroundColor: colors.white}}
              label="Email"
              //value={this.state.otherText}
              // onChangeText={text => setEmail(text)}
              mode={'outlined'}
              multiline={false}
              onBlur={() => alert('kk')}
              numberOfLines={1}
            />
          </View>

          <View style={{width: width / 1.2, marginLeft: 40}}>
            <LoadingSpinner showLoading={props.loading} />
          </View>
        </ScrollView>
        <View
          style={{
            width: width / 2,
            justifyContent: 'center',
            alignSelf: 'center',
            paddingTop: 20,
          }}>
          <Button
            buttonStyle={{color: colors.primaryColor2}}
            onPressBtn={() => clickNextBtn()}
            addText={'Update'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    color: 'black',
    width: width / 3,
    height: width / 3,
    borderRadius: width / 3,
  },
  bottomView: {
    flex: 1,
    backgroundColor: 'white',
    bottom: 30,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
});

const mapStateToProps = (state, props) => {
  return {
    translate: getTranslate(state.localize),
    default: state.common.defaultResult,
    loading: state.common.loading,
    userinfo: state.profiledata.profileInfoConfig,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    changeLoginStatus: isLoggin => {
      dispatch({type: LOGOUT, payload: isLoggin});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

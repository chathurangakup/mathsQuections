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

import {TextInput} from 'react-native-paper';

import {fontSizes, materialTextFieldStyle, colors} from '../../config/styles';

import Images from '../../config/Images';
import {LoadingSpinner} from '../../components/LoadingSpinner';
import {Button} from '../../components/Button';
import {GET_TEACHERS_QUOTES} from './TeachersQuotesActionTypes';
import {AppBar} from '../../components/AppBar';

const {width, height} = Dimensions.get('window');

const TeacherQuotes = props => {
  const t = props.translate;
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const {titleId, subjectId, gradesId} = props.route.params;

  useEffect(() => {
    console.log('teachersQ', titleId);
    let params = {titleId: titleId};
    props.getTeachersQuotes(params);
    //console.log("subjectsConfig".props.subjectsConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('teachersQ', props.config);
    if (props.config != undefined) {
      console.log('teachersQ', props.config);
      setData(props.config.data.result);
    }
  }, [props.config]);

  const clickNextBtn = () => {
    if (data.length != 0) {
      props.navigation.navigate('quectionMain', {
        titleId: titleId,
        subjectId: subjectId,
        gradesId: gradesId,
        teacherId: data[0].TeachersInfo[0]._id,
      });
    }
  };

  useEffect(() => {
    if (props.userinfo !== undefined) {
      setUserInfo(props.userinfo.data.userData);
      console.log('props.userinfo.userData', props.userinfo.data);
    }
  }, [props.userinfo]);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      showsHorizontalScrollIndicator={false}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('pinchScreen', {
            imgUrl: data != '' ? data[0].TeachersInfo[0].image : null,
          })
        }>
        <ImageBackground
          source={
            data != '' ? {uri: data[0].TeachersInfo[0].image} : Images.Welcome
          }
          style={{height: height / 2.5}}>
          <View>
            <AppBar
              navigation={props.navigation}
              profilePicImage={
                userInfo ? (userInfo.image == '' ? null : userInfo.image) : null
              }
            />
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                top: height / 4,
                marginLeft: 20,
                marginRight: 40,
                backgroundColor: colors.white,
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 30,
                    fontWeight: 'bold',
                    paddingLeft: 10,
                  }}>
                  {data != '' ? data[0].TeachersInfo[0].userName : ''}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: 'bold',
                    width: width / 1.5,
                    paddingLeft: 10,
                  }}>
                  {data != '' ? data[0].TeachersInfo[0].designation : ''}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.bottomView}>
        <View style={{paddingTop: 40, paddingLeft: 40, paddingBottom: 20}}>
          <Text style={{color: 'black'}}>{t('teacherQuote.first')},</Text>
        </View>
        <View
          style={{
            paddingTop: 20,
            paddingLeft: 40,
            paddingBottom: 20,
            paddingRight: 40,
          }}>
          <Text style={{color: 'black'}}>
            {data != '' ? data[0].quote : ''}
          </Text>
        </View>

        <View style={{width: width / 1.2, marginLeft: 40}}>
          <LoadingSpinner showLoading={props.loading} />
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
            onPressBtn={() => clickNextBtn()}
            addText={'Next'}
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
    config: state.teacherquote.teachersQuotesConfig,
    loading: state.common.loading,
    userinfo: state.profiledata.profileInfoConfig,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getTeachersQuotes: payload => {
      dispatch({type: GET_TEACHERS_QUOTES, payload: payload});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherQuotes);

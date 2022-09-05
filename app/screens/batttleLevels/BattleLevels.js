import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  Image,
  Text,
  Animated,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
var sortBy = require('lodash').sortBy;

import {colors} from '../../config/styles';
import Images from '../../config/Images';
import {AppBar} from '../../components/AppBar';

import {GET_BATTLE_NUMS, GET_USER_BATTLE_MARKS} from './BattleActionTypes';
import {GET_USER_INFO} from '../profile/ProfileActionsTypes';
import {getUserId} from '../../lib/Utils';

const {width, height} = Dimensions.get('window');

const SubjectMain = props => {
  const animated = new Animated.Value(0);
  const duration = 1000;
  const t = props.translate;
  const {subjectId, gradesId} = props.route.params;

  //   let commonArray=[
  // {battleName: "1",
  // battleNumber: 1,
  // gradesId: "61f6493910c3e78e03c6df4e",
  // isLocked: true,
  // isShowStudents: false,
  // isShowTeachers: true,
  // subjectId: "62245b0704bfaee17214ac08",
  // teachersId: "61e2b2ee234bfec7a1bc8a2d",
  // _id: "6309836992441659337cf69f"}
  //   ];

  const [battlenumData, setBattleNumData] = useState([]);
  const [userBattleMarks, setuserbattleMarksData] = useState([]);
  const [commonArray, setCommonArray] = useState([]);
  const [commonArrayASO, setCommonArrayASO] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  // useEffect(() => {
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(animated, {
  //         toValue: 20,
  //         duration: duration,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(animated, {
  //         toValue: 0,
  //         duration: duration,
  //         useNativeDriver: true,
  //       }),
  //     ]),
  //   ).start();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const getUserInfoFunction = async () => {
    const userId = await getUserId();
    props.getUserInfo(userId);
  };

  useEffect(() => {
    const userBattleMarksObj = {
      subjectId: subjectId,
      gradesId: '61f6493910c3e78e03c6df4e',
      userId: "62f874e87be1bdc149c23d4d",
    };
    props.getReleventUserBattleMarks(userBattleMarksObj);
    getUserInfoFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('getReleventUserBattleMarks', props.userBattlenInfoConfig);
    if (props.userBattlenInfoConfig !== undefined) {
      if (props.userBattlenInfoConfig.data !== undefined) {
        console.log(
          'getReleventUserBattleMarks',
          props.userBattlenInfoConfig.data.result,
        );
        setuserbattleMarksData(props.userBattlenInfoConfig.data.result);
        const battleNumObj = {
          subjectId: subjectId,
          gradesId: '61f6493910c3e78e03c6df4e',
        };
        props.getBattleNumbers(battleNumObj);
      }
    }
  }, [props.userBattlenInfoConfig]);

  useEffect(() => {
    setCommonArray([]);

    if (props.battlenumConfig !== undefined && props !== undefined) {
      if (props.battlenumConfig.data !== undefined) {
        // console.log('battlenumConfig', props.battlenumConfig.data.result);
        // console.log('userBattleMarks', userBattleMarks);
        setBattleNumData(props.battlenumConfig.data.result);
        let arrayObj = {
          battleName: props.battlenumConfig.data.result[0].battleName,
          battleNumber: props.battlenumConfig.data.result[0].battleNumber,
          gradesId: props.battlenumConfig.data.result[0].gradesId,
          isShowStudents:
            props.battlenumConfig.data.result[0].isShowStudents,
          isShowTeachers:
            props.battlenumConfig.data.result[0].isShowTeachers,
          subjectId: props.battlenumConfig.data.result[0].subjectId,
          teachersId: props.battlenumConfig.data.result[0].teachersId,
          _id: props.battlenumConfig.data.result[0]._id,
          isLocked: false,
        };
        setCommonArray(commonArray => [...commonArray, arrayObj]);


        
        for (let i = 1; i < props.battlenumConfig.data.result.length; i++) {

          console.log('userBattleMarks1', userBattleMarks);
          if (userBattleMarks.length == 0) {
            console.log('userBattleMarks', userBattleMarks);
            let arrayObj = {
              battleName: props.battlenumConfig.data.result[i].battleName,
              battleNumber: props.battlenumConfig.data.result[i].battleNumber,
              gradesId: props.battlenumConfig.data.result[i].gradesId,
              isShowStudents:
                props.battlenumConfig.data.result[i].isShowStudents,
              isShowTeachers:
                props.battlenumConfig.data.result[i].isShowTeachers,
              subjectId: props.battlenumConfig.data.result[i].subjectId,
              teachersId: props.battlenumConfig.data.result[i].teachersId,
              _id: props.battlenumConfig.data.result[i]._id,
              isLocked: true,
            };
            setCommonArray(commonArray => [...commonArray, arrayObj]);
          } else {
            for (let j = 0; j < userBattleMarks.length; j++) {
              if (userBattleMarks[j].battleId !== undefined) {
                if (
                  props.battlenumConfig.data.result[i]._id ===
                  userBattleMarks[j].battleId
                ) {
                  let arrayObj = {
                    battleName: props.battlenumConfig.data.result[i].battleName,
                    battleNumber:
                      props.battlenumConfig.data.result[i].battleNumber,
                    gradesId: props.battlenumConfig.data.result[i].gradesId,
                    isShowStudents:
                      props.battlenumConfig.data.result[i].isShowStudents,
                    isShowTeachers:
                      props.battlenumConfig.data.result[i].isShowTeachers,
                    subjectId: props.battlenumConfig.data.result[i].subjectId,
                    teachersId: props.battlenumConfig.data.result[i].teachersId,
                    _id: props.battlenumConfig.data.result[i]._id,
                    isLocked: false,
                  };
                  setCommonArray(commonArray => [...commonArray, arrayObj]);
                } else {
                  let arrayObj = {
                    battleName: props.battlenumConfig.data.result[i].battleName,
                    battleNumber:
                      props.battlenumConfig.data.result[i].battleNumber,
                    gradesId: props.battlenumConfig.data.result[i].gradesId,
                    isShowStudents:
                      props.battlenumConfig.data.result[i].isShowStudents,
                    isShowTeachers:
                      props.battlenumConfig.data.result[i].isShowTeachers,
                    subjectId: props.battlenumConfig.data.result[i].subjectId,
                    teachersId: props.battlenumConfig.data.result[i].teachersId,
                    _id: props.battlenumConfig.data.result[i]._id,
                    isLocked: true,
                  };
                  setCommonArray(commonArray => [...commonArray, arrayObj]);
                }
              }
            }
          }
        }
        console.log('commonArray', commonArray);
        // setBattleNumData(props.config.data.result)
      }
    }
  }, [props.battlenumConfig]);

  const BattleItems = ({categories}) => {
    console.log('categories', categories);
    return (
      <TouchableOpacity
        activeOpacity={0.0}
        onPress={() => {
          categories.item.isLocked == false
            ? props.navigation.navigate('quectionMain', {
                titleId: categories.item._id,
                subjectId: subjectId,
                gradesId: gradesId,
                teacherId: categories.item.teachersId,
                catagoryName: 'battle',
              })
            : null;

          // props.navigation.navigate('gradesMain', {
          //   subjectId: subjectId,
          //   // categoryName: categories.item.categoryName
          // });
        }}
        style={[
          categories.item.isLocked == false
            ? styles.subjectItemBtn
            : styles.subjectItemBtnDisable,
        ]}>
        {/* <Image
          style={styles.subjectItemImgStyle}
          source={{
            uri: categories.item.image,
          }}
        /> */}
        <Text style={styles.subjName}>{categories.item.battleNumber}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (props.userinfo !== undefined) {
      if (props.userinfo.data !== undefined) {
        console.log('props.userinfo.userData', props.userinfo);
        setUserInfo(props.userinfo.data.userData);
      }
    }
  }, [props.userinfo]);

  return (
    <SafeAreaView style={styles.root}>
      <AppBar
        navigation={props.navigation}
        title={t('battles.title')}
        profilePicImage={
          userInfo ? (userInfo.image == '' ? null : userInfo.image) : null
        }
      />
      <View style={styles.header}>
        <Image source={Images.SubjectTeach} style={styles.imgStyles} />

        <View style={styles.animateIconRoot}>
          <Animated.View
            style={[styles.animateIcon, {transform: [{translateY: animated}]}]}
          />
        </View>
        <ScrollView style={{marginBottom: 20}}>
          <Text style={styles.subjSubTitle}>{t('battles.subTitle')}</Text>
        </ScrollView>
      </View>

      <View>
        <FlatList
          data={commonArray}
          style={{paddingHorizontal: 20, marginTop: -60, marginBottom: 80}}
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          // keyExtractor={item=> item.value}
          renderItem={item => <BattleItems categories={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, position: 'relative'},
  subjectItemBtn: {
    backgroundColor: colors.darkGreen,
    justifyContent: 'center',
    margin: 10,
    width: width / 4,
    height: width / 4,
    borderRadius: 10,
    borderRadius: 50,
    // padding: 15,
    shadow: '#9e9808',
    elevation: 5,
  },
  subjectItemBtnDisable: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    margin: 10,
    width: width / 4,
    height: width / 4,
    borderRadius: 10,
    borderRadius: 50,
    // padding: 15,
    shadow: '#9e9808',
    elevation: 5,
  },
  subjectItemImgStyle: {
    width: width / 2.2,
    height: height / 5,
    borderRadius: 10,
  },
  header: {
    width: '100%',
    height: height / 2.5,
    padding: 30,
    backgroundColor: colors.primaryColor1,
    position: 'relative',
  },
  imgStyles: {
    position: 'absolute',
    opacity: 0.3,
    top: 40,
    left: 15,
    borderRadius: 200,
    width: 300,
    height: 300,
  },
  animateIconRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  animateIcon: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  subjName: {
    color: colors.white,
    fontSize: 25,
    alignSelf: 'center',
    alignSelf: 'center',
  },
  subjSubName: {color: colors.white, alignSelf: 'center', padding: 5},
  subjSubTitle: {color: colors.white, fontSize: 18, paddingTop: 20},
});

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.localize),
    battlenumConfig: state.battlenums.battlenumConfig,
    userBattlenInfoConfig: state.battlenums.userBattlenInfoConfig,
    loading: state.common.loading,
    userinfo: state.profiledata.profileInfoConfig,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getReleventUserBattleMarks: payload => {
      dispatch({type: GET_USER_BATTLE_MARKS, payload: payload});
    },
    getBattleNumbers: payload => {
      dispatch({type: GET_BATTLE_NUMS, payload: payload});
    },
    getUserInfo: userIdData => {
      dispatch({
        type: GET_USER_INFO,
        userId: userIdData,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectMain);

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
  ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';

import {colors} from '../../config/styles';
import Images from '../../config/Images';
import {AppBar} from '../../components/AppBar';

import {GET_BATTLE_NUMS, GET_USER_BATTLE_MARKS} from './BattleMarksActionTypes';
import {GET_USER_INFO} from '../profile/ProfileActionsTypes';
import {getUserId, showSubjectBattleMarksModal} from '../../lib/Utils';




const {width, height} = Dimensions.get('window');
let data = [{
  value: 'Banana',
}, {
  value: 'Mango',
}, {
  value: 'Pear',
}];

const SubjectMain = props => {
  const animated = new Animated.Value(0);
  const duration = 1000;
  const t = props.translate;
  // const {subjectId,gradesId} = props.route.params;

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
  const [userInfo, setUserInfo] = useState(null);




  const BattleItems = ({categories}) => {
    console.log("categories",categories)
    return (
      <TouchableOpacity
        activeOpacity={0.0}
         onPress={() => {
          categories.item.isLocked==false?
          props.navigation.navigate('quectionMain', {
            titleId: categories.item._id,
            subjectId: subjectId,
            gradesId: gradesId,
            teacherId: categories.item.teachersId,
            catagoryName:'battle'
         })
         :
         null

          // props.navigation.navigate('gradesMain', {
          //   subjectId: subjectId,
          //   // categoryName: categories.item.categoryName
          // });
        }}
        style={[ categories.item.isLocked==false?styles.subjectItemBtn:styles.subjectItemBtnDisable]}>
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
    console.log(" props.subjectConfig", props.subjectConfig)
  }, [props.gradesConfig]);

  return (
    <SafeAreaView style={styles.root}>
      <AppBar
        navigation={props.navigation}
        isShowBack={false}
        title={t('battles.title')}
        // profilePicImage={
        //   userInfo ? (userInfo.image == '' ? null : userInfo.image) : null
        // }
      />
      <View style={styles.header}>
        <Image source={Images.SubjectTeach} style={styles.imgStyles} />

        <View style={styles.animateIconRoot}>
          <Animated.View
            style={[styles.animateIcon, {transform: [{translateY: animated}]}]}
          />
        </View>
        <ScrollView style={{marginBottom:20}}>
           {/* <Text style={styles.subjSubTitle}>{t('battles.subTitle')}</Text> */}
           <View style={{flex: 2}}>
              <Dropdown
                rippleCentered
                label="Select Grade"
                data={props.gradesConfig}
                style={{backgroundColor:'white'}}
                //value={language}
                onChangeText={value => clickChangeLanguage(value)}
              />
            </View>
        </ScrollView>
       
      </View>

      <View>
        {/* <FlatList
          data={commonArray}
          style={{paddingHorizontal: 20, marginTop: -60, marginBottom: 80}}
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          // keyExtractor={item=> item.value}
          renderItem={item => <BattleItems categories={item} />}
        /> */}
      </View>
  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, position: 'relative'},
  subjectItemBtn: {
    backgroundColor: colors.darkGreen,
    justifyContent:'center',
    margin: 10,
    width: width / 4,
    height: width / 4,
    borderRadius: 10,
    borderRadius:50,
    // padding: 15,
    shadow: '#9e9808',
    elevation: 5,
  },
  subjectItemBtnDisable: {
    backgroundColor: 'gray',
    justifyContent:'center',
    margin: 10,
    width: width / 4,
    height: width / 4,
    borderRadius: 10,
    borderRadius:50,
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
  subjName: {color: colors.white, fontSize: 25, alignSelf: 'center', alignSelf:'center'},
  subjSubName: {color: colors.white, alignSelf: 'center', padding: 5},
  subjSubTitle: {color: colors.white, fontSize: 18, paddingTop: 20},
});

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.localize),
    // battlenumConfig: state.battlenums.battlenumConfig,
    // userBattlenInfoConfig: state.battlenums.userBattlenInfoConfig,
    // loading: state.common.loading,
    // userinfo: state.profiledata.profileInfoConfig,
    gradesConfig: state.grades.gradesConfig,
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

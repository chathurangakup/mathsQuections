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
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';

import {colors} from '../../config/styles';
import Images from '../../config/Images';
import {AppBar} from '../../components/AppBar';

import {GET_GRADES} from '../grades/GradesActionTypes';
import {GET_USER_BATTLE_MARKS} from '../batttleLevels/BattleActionTypes';
import {GET_USER_INFO} from '../profile/ProfileActionsTypes';
import {getUserId, showSubjectBattleMarksModal} from '../../lib/Utils';
import { GET_ALL_STUDENTS_INFO, GET_ALL_STUDENTS_MARKS_INFO } from './BattleMarksActionTypes';

const {width, height} = Dimensions.get('window');
let data = [
  {
    value: 'Banana',
  },
  {
    value: 'Mango',
  },
  {
    value: 'Pear',
  },
];

const SubjectMain = props => {
  const animated = new Animated.Value(0);
  // const duration = 1000;
  const t = props.translate;
  let usermarks = 0;

  const [battlenumData, setBattleNumData] = useState([]);
  const [userBattleMarks, setuserbattleMarksData] = useState([]);
  const [gradesArray, setGradesArray] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedGradeId, setSelectedGradeId] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [userMarksSum, setUserMarksSum] = useState();
  const [allUserMarksSum, setAllUserMarksSum] = useState(null);
  const [releventUserSumOfmarks, setReleventUserSumOfmarks] = useState([]);

  useEffect(() => {
    setGradesArray([]);
    console.log('mkmk', props.gradesConfig);
    if (props.gradesConfig !== undefined) {
      for (let i = 0; i < props.gradesConfig.data.grades.length; i++) {
        let obj = {
          value: props.gradesConfig.data.grades[i].grade,
          id: props.gradesConfig.data.grades[i]._id,
        };
        if (i == 0) {
          setSelectedGrade(props.gradesConfig.data.grades[0].grade);
          setSelectedGradeId(props.gradesConfig.data.grades[0]._id);
        }

        setGradesArray(gradesArray => [...gradesArray, obj]);
      }
    } else {
      let params = {
        subjectId: '61fbfb630c79b7b21bc82f05',
      };

      props.getGrades(params, '');
    }
  }, [props.gradesConfig]);

  const callUserData = async () => {
    const userId = await getUserId();
    props.getUserInfo(userId);
    const userBattleMarksObj = {
      subjectId: '62245b0704bfaee17214ac08',
      gradesId: '61f6493910c3e78e03c6df4e',
      userId: '61e826fcf719c471f396846b',
    };

    props.getReleventUserBattleMarks(userBattleMarksObj);
  };

  useEffect(() => {
    callUserData();
    getOtherUsersMarks()
  }, []);

  useEffect(() => {
    if (props.userinfo !== undefined) {
      if (props.userinfo.data !== undefined) {
        console.log('props.userinfo.userData', props.userinfo);
        setUserInfo(props.userinfo.data.userData);
      }
    }
  }, [props.userinfo]);

  function battleMarksCalUser(item) {
    usermarks += item.battleMarks;
    setUserMarksSum(usermarks);
    console.log(usermarks);
  }

  useEffect(() => {
    if (props.userBattlenInfoConfig != undefined) {
      props.userBattlenInfoConfig.data.result.forEach(battleMarksCalUser);
    }
    console.log("userBattlenInfoConfig",props.userBattlenInfoConfig)
  }, [props.userBattlenInfoConfig]);

  const clickChangeGrade = grade => {

    console.log(gradesArray)
    gradesArray.forEach((item)=>{
       if(item.value==grade){
         setSelectedGrade(grade);
        usermarks=0;
        setUserMarksSum(0)
        const userBattleMarksObj = {
          subjectId: '62245b0704bfaee17214ac08',
          gradesId: item._id,
          userId: '61e826fcf719c471f396846b',
        };
        props.getReleventUserBattleMarks(userBattleMarksObj);
      }
    });
   
  };


  //get other users marks
  const getOtherUsersMarks=()=>{
     
      const userMarksObj = {
        subjectId: '62245b0704bfaee17214ac08',
        gradesId: selectedGradeId,
      };
    
      props.getAllStudentsMarksInfo(userMarksObj); 
      
  }
  

 

  useEffect(()=>{
    setReleventUserSumOfmarks([])
    if(props.allStudentsInfoConfig!=undefined && allUserMarksSum!=null){
       props.allStudentsInfoConfig.data.users.forEach((items)=>{
          //  console.log("allStudentsInfoConfig",items.userDetails._id);
          //  console.log("allStudentsmarksInfoConfig",allUserMarksSum);
           let sumofUsermarks = 0
           allUserMarksSum.forEach((items2)=>{
           
              if(items.userDetails._id==items2.userId){
                sumofUsermarks+= items2.battleMarks
              }
           })
           let obj={
              userName: items.userDetails.userName,
              image: items.userDetails.image,
              sumofUsermarks: sumofUsermarks
             }
             console.log("allStudentsmarksInfoConfig1",obj);
            setReleventUserSumOfmarks(releventUserSumOfmarks=>[...releventUserSumOfmarks, obj])
 
       });
    }
    // console.log("allusers",   props.allStudentsInfoConfig.data.users)
  
    console.log("releventUserSumOfmarks", releventUserSumOfmarks)
   },[props.allStudentsInfoConfig])

  
  useEffect(()=>{
 
   if(props.allStudentsMarksInfoConfig!=undefined){
    console.log("allstu",props.allStudentsMarksInfoConfig)
    if(props.allStudentsMarksInfoConfig.data.result!=undefined){
        setAllUserMarksSum(props.allStudentsMarksInfoConfig.data.result)
    }
    
    props.getAllStudentsInfo();
  
   }
   
   },[props.allStudentsMarksInfoConfig])


   const SumOfTheMarks = ({users}) => {
    console.log("users", users)
    return (
      <View
      style={{
        height: 70,
        backgroundColor: '#B00020',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 20,
        margin:10,
        width: width/1.2,
      }}>
      <Image
        style={styles.image}
        source={
  
          userInfo == null ? Images.ProfilePic : {uri: users.item.image}
        }
      />
      <View style={{paddingTop: 10}}>
        {userInfo != null ? <Text style={{color: 'white', fontWeight:'bold'}}>{users.item.userName}</Text> : null}
      </View>
      <View style={{paddingTop: 10, paddingRight: 15}}>
         <Text style={{color: 'white',fontWeight:'bold'}}>{users.item.sumofUsermarks}</Text>
      </View>
    </View>

    );
  };


  return (
    <SafeAreaView style={styles.root}>
      <AppBar
        navigation={props.navigation}
        isShowBack={false}
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
          {/* <Text style={styles.subjSubTitle}>{t('battles.subTitle')}</Text> */}
          <View style={{flex: 2}}>
            <Dropdown
              rippleCentered
              label="Select Grade"
              data={gradesArray}
              style={{backgroundColor: 'white'}}
              value={selectedGrade}
              onChangeText={data => clickChangeGrade(data)}
            />
          </View>
        </ScrollView>

        <View
          style={{
            height: 70,
            backgroundColor: '#B00020',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            borderRadius: 20,
          }}>
          <Image
            style={styles.image}
            source={
      
              userInfo == null ? Images.ProfilePic : {uri: userInfo.image}
            }
          />
          <View style={{paddingTop: 10}}>
            {userInfo != null ? <Text style={{color: 'white', fontWeight:'bold'}}>{userInfo.userName}</Text> : null}
          </View>
          <View style={{paddingTop: 10, paddingRight: 15}}>
             <Text style={{color: 'white',fontWeight:'bold'}}>{userMarksSum}</Text>
          </View>
        </View>
      </View>

      <View style={{flex:1}}>
        <FlatList
          data={releventUserSumOfmarks}
          style={{margin:5}}
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          // keyExtractor={item=> item.value}
          renderItem={item => <SumOfTheMarks users={item} />}
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
  image: {
    color: 'black',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.localize),
    allStudentsMarksInfoConfig: state.battlemarks.allStudentsMarksInfoConfig,
    allStudentsInfoConfig: state.battlemarks.allStudentsInfoConfig,
    userBattlenInfoConfig: state.battlenums.userBattlenInfoConfig,
    loading: state.common.loading,
    userinfo: state.profiledata.profileInfoConfig,
    gradesConfig: state.grades.gradesConfig,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getAllStudentsMarksInfo: payload => {
      dispatch({type: GET_ALL_STUDENTS_MARKS_INFO, payload: payload});
    },
    getAllStudentsInfo: payload => {
      dispatch({type: GET_ALL_STUDENTS_INFO, payload: payload});
    },
    getReleventUserBattleMarks: payload => {
      dispatch({type: GET_USER_BATTLE_MARKS, payload: payload});
    },
    getGrades: (payloadObj, search) => {
      dispatch({type: GET_GRADES, payload: payloadObj, searchPharam: search});
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

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
} from 'react-native';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';

import {colors} from '../../config/styles';
import Images from '../../config/Images';
import {AppBar} from '../../components/AppBar';

// import {GET_SUBJECTS} from './SubjectActionTypes';
// import {GET_USER_INFO} from '../profile/ProfileActionsTypes';
import {getUserId} from '../../lib/Utils';



const {width, height} = Dimensions.get('window');

const SubjectMain = props => {
  const animated = new Animated.Value(0);
  const duration = 1000;
  const t = props.translate;
  const {subjectId} = props.route.params;

  const [subjectData, setSubjectData] = useState([]);
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
    // props.getSubjects({});
    // getUserInfoFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('subjectsConfig', props.config);
    // if (props.config !== undefined) {
    //   if (props.config.data !== undefined) {
    //     // console.log('subjectsConfig', props.config.data.subjects);

    //     setSubjectData(props.config.data.subjects);

    //   }
    // }
    const data=[
        {
            categoryName: "Learn",
            image: "https://firebasestorage.googleapis.com/v0/b/apescole-bb52b.appspot.com/o/commonImages%2Fgrade6.jpg?alt=media&token=85a7ee33-9560-4547-8add-94ed9c1b2bea",
            id: 1,
        },
        {
            categoryName: "Battle",
            image: "https://firebasestorage.googleapis.com/v0/b/apescole-bb52b.appspot.com/o/commonImages%2Fgrade6.jpg?alt=media&token=85a7ee33-9560-4547-8add-94ed9c1b2bea",
            id: 2,
        },
    ]
    setSubjectData(data);
  }, [props.config]);

  const SubjectItem = ({categories}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.0}
        onPress={() => {
          props.navigation.navigate('gradesMain', {
            subjectId: subjectId,
            categoryName: categories.item.categoryName
          });
        }}
        style={styles.subjectItemBtn}>
        <Image
          style={styles.subjectItemImgStyle}
          source={{
            uri: categories.item.image,
          }}
        />
        <Text style={styles.subjName}>{categories.item.categoryName}</Text>
      </TouchableOpacity>
    );
  };

//   useEffect(() => {
//     if (props.userinfo !== undefined) {
//       if (props.userinfo.data !== undefined) {
//         console.log('props.userinfo.userData', props.userinfo);
//         setUserInfo(props.userinfo.data.userData);
//       }
//     }
//   }, [props.userinfo]);

  return (
    <SafeAreaView style={styles.root}>
      <AppBar
        navigation={props.navigation}
        title={t('subjects.title')}
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
        <Text style={styles.subjSubTitle}>{t('subjects.subTitle')}</Text>
      </View>

      <View>
        <FlatList
          data={subjectData}
          style={{paddingHorizontal: 20, marginTop: -60, marginBottom: 80}}
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          // keyExtractor={item=> item.value}
          renderItem={item => <SubjectItem categories={item} />}
        />
      </View>
  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, position: 'relative'},
  subjectItemBtn: {
    backgroundColor: colors.darkGreen,
    margin: 10,
    width: width / 2.2,
    height: height / 3.5,
    borderRadius: 10,
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
  subjName: {color: colors.white, fontSize: 25, alignSelf: 'center'},
  subjSubName: {color: colors.white, alignSelf: 'center', padding: 5},
  subjSubTitle: {color: colors.white, fontSize: 18, paddingTop: 20},
});

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.localize),
    config: state.subjects.subjectsConfig,
    loading: state.common.loading,
    userinfo: state.profiledata.profileInfoConfig,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getSubjects: () => {
      dispatch({type: GET_SUBJECTS, payload: {}});
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

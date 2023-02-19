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
import LottieView from 'lottie-react-native';

import {colors} from '../../config/styles';
import Images from '../../config/Images';
import {AppBar} from '../../components/AppBar';

// import {GET_SUBJECTS} from './SubjectActionTypes';
// import {GET_USER_INFO} from '../profile/ProfileActionsTypes';
import {getUserId} from '../../lib/Utils';
import Lottie from '../../config/Lottie';



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
    props.navigation.navigate('gradesMain', {
      subjectId: subjectId,
      categoryName: 'Learn'
    });

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
            categorySubName: "ඔයාට අවශ්‍ය විෂය කරුණු ඉගෙන ගන්න මේකට යන්න",
            image: Lottie.Learn,
            id: 1,
        },
        {
           categoryName: "Battle",
           categorySubName: "ඔයාගේ දැනුම අනිත්‍ යාළුවෝ එක්ක සංසන්දනය කරන්න මේකට යන්න",
            image: Lottie.Battle,
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
        {/* <Image
          style={styles.subjectItemImgStyle}
          source={{
            uri: categories.item.image,
          }}
        /> */}
        <LottieView
              source={categories.item.image}
              autoPlay
              loop
              style={styles.subjectItemImgStyle}
            />
        <Text style={styles.subjName}>{categories.item.categoryName}</Text>
        <Text style={styles.subjSubName}>{categories.item.categorySubName}</Text>
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
        title={t('categories.title')}
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
        <Text style={styles.subjSubTitle}>{t('categories.subTitle')}</Text>
      </View>

      <View>
        <FlatList
          data={subjectData}
          style={{margin: 10, marginTop: -60, marginBottom: 60}}
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
    backgroundColor: colors.white,
    margin: 10,
    width: width / 2.2,
    height: height / 3,
    borderRadius: 10,
    // padding: 15,
    alignItems:'center',
    shadow: '#9e9808',
    elevation: 5,
  },
  subjectItemImgStyle: {
    width: width ,
    height: height / 8,
    borderRadius: 10,
    alignItems:'center'
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
  subjName: {color: colors.primaryColor1, fontSize: 25, alignSelf: 'center'},
  subjSubName: {color: colors.primaryColor1, alignSelf: 'center', padding: 5},
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

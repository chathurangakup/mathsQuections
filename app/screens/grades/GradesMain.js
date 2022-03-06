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
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';

import {colors} from '../../config/styles';
import Images from '../../config/Images';
import {GET_GRADES} from './GradesActionTypes';
import {Search} from '../../components/Search';
import {AppBar} from '../../components/AppBar';

const {width, height} = Dimensions.get('window');

const GradesMain = props => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animated = new Animated.Value(0);
  const duration = 1000;
  const t = props.translate;

  const [gradesData, setGradesData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const {subjectId} = props.route.params;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animated, {
          toValue: 20,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(animated, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [animated]);

  useEffect(() => {
    let params = {
      subjectId: subjectId,
    };
    props.getGrades(params, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('gradesConfig', props.config);
    if (props.config != undefined) {
      console.log('gradesConfig', props.config.data.grades);
      setGradesData(props.config.data.grades);
    }
  }, [props.config]);

  const GradesItem = ({grades}) => {
    console.log('grades', grades);
    return (
      <TouchableOpacity
        activeOpacity={0.0}
        onPress={() => {
          props.navigation.navigate('titleMain', {
            subjectId: subjectId,
            gradesId: grades.item._id,
          });
        }}
        style={styles.subjectItemBtn}>
        <Image
          style={styles.subjectItemImgStyle}
          source={{
            uri: grades.item.image,
          }}
        />
        <Text style={styles.subjName}>{grades.item.grade}</Text>
      </TouchableOpacity>
    );
  };

  const searchText = text => {
    let params = {
      subjectId: subjectId,
    };
    console.log(text);
    props.getGrades(params, text);
  };

  useEffect(() => {
    if (props.userinfo !== undefined) {
      setUserInfo(props.userinfo.data.userData);
      console.log('props.userinfo.userData', props.userinfo.data);
    }
  }, [props.userinfo]);

  return (
    <SafeAreaView style={styles.root}>
      <AppBar
        navigation={props.navigation}
        title={t('grades.title')}
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

        <Search onChange={text => searchText(text)} />
      </View>

      <View>
        {gradesData.length == 0 ? (
          <View style={{alignItems: 'center', paddingTop: 40}}>
            <Text style={{color: colors.blackColor}}>Not Data Found</Text>
          </View>
        ) : (
          <FlatList
            data={gradesData}
            style={{paddingHorizontal: 20, marginTop: -60, marginBottom: 80}}
            contentContainerStyle={{alignItems: 'center'}}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            // keyExtractor={item=> item.value}
            renderItem={item => <GradesItem grades={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, position: 'relative'},
  subjectItemBtn: {
    backgroundColor: colors.lightBlue,
    margin: 10,
    width: width / 2.4,
    height: height / 3.5,
    borderRadius: 10,
    // padding: 15,
    shadow: '#9e9808',
    elevation: 5,
  },
  subjectItemImgStyle: {
    width: width / 2.4,
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
  subjName: {color: 'black', fontSize: 22, alignSelf: 'center', paddingTop: 15},
});

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.localize),
    config: state.grades.gradesConfig,
    loading: state.common.loading,
    userinfo: state.profiledata.profileInfoConfig,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getGrades: (payloadObj, search) => {
      dispatch({type: GET_GRADES, payload: payloadObj, searchPharam: search});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GradesMain);

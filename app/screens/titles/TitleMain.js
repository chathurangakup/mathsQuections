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
import {GET_TITLES} from './TitleActionTypes';
import {Search} from '../../components/Search';
import {AppBar} from '../../components/AppBar';

const {width, height} = Dimensions.get('window');

const GradesMain = props => {
  const animated = new Animated.Value(0);
  const duration = 1000;
  const t = props.translate;

  const [titleData, setTitlesData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const {subjectId, gradesId} = props.route.params;

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
  }, []);

  useEffect(() => {
    console.log('getTitles', props.config);
    let params = {
      subjectId: subjectId,
      gradesId: gradesId,
    };
    props.getTitles(params, '');
    //console.log("subjectsConfig".props.subjectsConfig);
  }, []);

  useEffect(() => {
    console.log('titles', props.config);
    if (props.config != undefined) {
      //console.log('gradesConfig', props.config.data.grades);
      setTitlesData(props.config.data.result);
    }
  }, [props.config]);

  const TitlesItem = ({titles}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.0}
        onPress={() => {
          props.navigation.navigate('teacherQuote', {
            subjectId: subjectId,
            gradesId: gradesId,
            titleId: titles.item._id,
            titleName: titles?.item?.battleNumber
          });
        }}
        style={styles.subjectItemBtn}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingLeft: 20,
          }}>
          <View style={{}}>
            <Text style={styles.subjName}>{titles.item.titleNumber}. </Text>
          </View>
          <View style={{}}>
            <Text style={styles.subjName}>{titles.item.titleName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const searchText = text => {
    let params = {
      subjectId: subjectId,
      gradesId: gradesId,
    };
    props.getTitles(params, text);
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
        title={t('titles.title')}
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
        <FlatList
          data={titleData}
          style={{
            marginTop: -60,
            marginBottom: 80,
            marginLeft: 10,
            marginRight: 10,
          }}
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          // keyExtractor={item=> item.value}
          keyExtractor={(item, index) => item.titleNumber}
          renderItem={item => <TitlesItem titles={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, position: 'relative'},
  subjectItemBtn: {
    backgroundColor: colors.lightBlue,
    margin: 10,
    width: width,
    height: 70,
    borderRadius: 20,
    padding: 20,
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
  subjName: {
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  subjSubName: {color: 'black', alignSelf: 'center', padding: 5},
});

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.localize),
    config: state.titles.titlesConfig,
    loading: state.common.loading,
    userinfo: state.profiledata.profileInfoConfig,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getTitles: (payloadObj, search) => {
      dispatch({type: GET_TITLES, payload: payloadObj, searchPharam: search});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GradesMain);

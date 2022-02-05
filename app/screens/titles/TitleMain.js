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

import {colors} from '../../config/styles';
import Images from '../../config/Images';
import {GET_TITLES} from './TitleActionTypes';
import {LoadingSpinner} from '../../components/LoadingSpinner';

const {width, height} = Dimensions.get('window');

const GradesMain = props => {
  const animated = new Animated.Value(0);
  const duration = 1000;

  const [titleData, setTitlesData] = useState([]);

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
    props.getTitles(params);
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

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image source={Images.SubjectTeach} style={styles.imgStyles} />

        <View style={styles.animateIconRoot}>
          <Animated.View
            style={[styles.animateIcon, {transform: [{translateY: animated}]}]}
          />
        </View>
        <Text style={{color: colors.blackColor, top: 40, left: 15}}>
          Good Morning Uditha
        </Text>
      </View>

      <View>
        <LoadingSpinner showLoading={props.loading} />
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
    config: state.titles.titlesConfig,
    loading: state.common.loading,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getTitles: payloadObj => {
      dispatch({type: GET_TITLES, payload: payloadObj});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GradesMain);

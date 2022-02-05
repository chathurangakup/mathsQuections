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
import {GET_GRADES} from './GradesActionTypes';
import {LoadingSpinner} from '../../components/LoadingSpinner';

const {width, height} = Dimensions.get('window');

const GradesMain = props => {
  const animated = new Animated.Value(0);
  const duration = 1000;

  const [gradesData, setGradesData] = useState([]);

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
  }, []);

  useEffect(() => {
    console.log('subId', subjectId);

    props.getGrades({});
    //console.log("subjectsConfig".props.subjectsConfig);
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
          data={gradesData}
          style={{paddingHorizontal: 20, marginTop: -60, marginBottom: 80}}
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          // keyExtractor={item=> item.value}
          renderItem={item => <GradesItem grades={item} />}
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
  subjName: {color: 'black', fontSize: 25, alignSelf: 'center'},
  subjSubName: {color: 'black', alignSelf: 'center', padding: 5},
});

const mapStateToProps = state => {
  return {
    config: state.grades.gradesConfig,
    loading: state.common.loading,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getGrades: () => {
      dispatch({type: GET_GRADES, payload: {}});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GradesMain);

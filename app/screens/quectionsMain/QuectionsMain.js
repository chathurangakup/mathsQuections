import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground,
  Dimensions,
  ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {fontSizes, materialTextFieldStyle, colors} from '../../config/styles';
import Images from '../../config/Images';
import TextField from '../../components/TextField';

import {quectionsSet} from '../../config/DefaultJson';

const {width, height} = Dimensions.get('window');

const Login = props => {
  const t = props.translate;
  const allQuections = quectionsSet;
  const [currentQuectionIndex, setCurrentQuectionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisable, setIsOptionsDisable] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);

  const validateAns = selectOption => {
    let correct_option = allQuections[currentQuectionIndex]['correctAns'];
    setCurrentOptionSelected(selectOption);
    setCorrectOption(correct_option);
    setIsOptionsDisable(true);
    if (selectOption == correct_option) {
      setScore(score + 1);
    }
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuectionIndex == allQuections.length) {
    } else {
      setCurrentQuectionIndex(currentQuectionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisable(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuectionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderOptions = () => {
    return (
      <ScrollView>
        {allQuections[currentQuectionIndex]?.textOrImageAns == 'text'
          ? allQuections[currentQuectionIndex].answers.map(option => (
              <TouchableOpacity
                onPress={() => validateAns(option)}
                key={option}
                style={[
                  styles.ansButton,
                  {
                    borderColor:
                      option == correctOption
                        ? colors.green
                        : option == currentOptionSelected
                        ? colors.red 
                        : colors.secondaryColor1,
                    backgroundColor:
                      option == correctOption
                        ? colors.green1
                        : option == currentOptionSelected
                        ? colors.red + '60'
                        : colors.secondaryColor1,
                  },
                ]}>
                <View style={{flex:5}}>
                <Text style={{fontSize: 20, color: colors.white}}>
                  {option}
                </Text>
                </View>

               <View  style={{flex:0.5}}>
                {option == correctOption ? (
                  <View
                    style={styles.correctAnsStyle}>
                    <MaterialCommunityIcons
                      name="check"
                      style={styles.iconStyle}
                    />
                  </View>
                ) : option == currentOptionSelected ? (
                  <View
                    style={styles.wrongAnsStyle}>
                    <MaterialCommunityIcons
                      name="close"
                      style={styles.iconStyle}
                    />
                  </View>
                ) : null}
                </View>
              </TouchableOpacity>
            ))
          : allQuections[currentQuectionIndex].answers.map(option => (
              <TouchableOpacity  onPress={() => validateAns(option)}
              key={option}
              style={[
                styles.ansButton,
                {
                  borderColor:
                    option == correctOption
                      ? colors.green
                      : option == currentOptionSelected
                      ? colors.red 
                      : colors.secondaryColor1,
                  backgroundColor:
                    option == correctOption
                      ? colors.green1
                      : option == currentOptionSelected
                      ? colors.red + '60'
                      : colors.secondaryColor1,
                },
              ]}>
                 <View style={{flex:5}}>
                 <Image style={{width: width/3, height: height/5}} source={{uri: option}}></Image>
                 </View>
              

                <View  style={{flex:0.5}}>
                {option == correctOption ? (
                  <View
                    style={styles.correctAnsStyle}>
                    <MaterialCommunityIcons
                      name="check"
                      style={styles.iconStyle}
                    />
                  </View>
                ) : option == currentOptionSelected ? (
                  <View
                    style={styles.wrongAnsStyle}>
                    <MaterialCommunityIcons
                      name="close"
                      style={styles.iconStyle}
                    />
                  </View>
                ) : null}
                </View>
                
              </TouchableOpacity>
            ))}
      </ScrollView>
    );
  };

  const renderQuections = () => {
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text style={styles.quectionTextStyle}>{currentQuectionIndex} </Text>
          <Text style={{color: colors.white, fontSize: 20, opacity: 0.6}}>
            {' '}
            / {allQuections.length}{' '}
          </Text>
        </View>
        <Text style={{color: colors.white, fontSize: 20}}>
          {allQuections[currentQuectionIndex]?.quection == '' ? '' :allQuections[currentQuectionIndex]?.quection}
        </Text>
        <View>
        {/* {allQuections[currentQuectionIndex]?.image == '' ? '' :allQuections[currentQuectionIndex]?.quection} */}
        {/* {(() => {
              if ( allQuections[currentQuectionIndex]?.image !=''){
                let uri = require((allQuections[currentQuectionIndex]?.image).toString());
                  return (
                    <Image style={{width: 40, height: 30}} />
                  );
              }
              
              return null;
            })()} */}
{allQuections[currentQuectionIndex].image == '' ? <View></View>:
<View style={{alignItems:'center',padding:10}}>
<Image style={{width: width/2, height: height/5}} source={{uri:allQuections[currentQuectionIndex].image }} />
</View>

 }

          
        </View>
      </View>
    );
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          style={{
            marginTop: 20,
            width: '100%',
            backgroundColor: colors.secondaryColor2,
            padding: 15,
            borderRadius: 35,
          }}
          onPress={() => handleNext()}>
          <Text
            style={{fontSize: 20, color: colors.white, textAlign: 'center'}}>
            NEXT
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuections.length],
    outputRange: ['0%', '100%'],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 20,
          borderRadius: 20,
          backgroundColor: '#000020',
        }}>
        <Animated.View
          style={[
            styles.animatedbarStyle,
            {width: progressAnim},
          ]}></Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
     <ImageBackground source={Images.Background} resizeMode="cover"  style={styles.mainComp}>
        {renderProgressBar()}

        {renderQuections()}

        {renderOptions()}

        {renderNextButton()}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainComp: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: colors.primaryColor2,
    position: 'relative',
  },
  quectionTextStyle: {
    color: colors.white,
    fontSize: 20,
    opacity: 0.6,
    marginRight: 2,
  },
  answerBtnstyle: {
    borderWidth: 3,
    borderColor: colors.green + '40',
    backgroundColor: colors.green + '20',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  ansButton: {
    borderWidth: 3,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  animatedbarStyle: {height: 20, borderRadius: 20, backgroundColor: '#009988'},
  wrongAnsStyle:{
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctAnsStyle:{
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle:{color: colors.white, fontSize: 20}
});

const mapStateToProps = (state, props) => {
  return {
    translate: getTranslate(state.localize),
  };
};

export default connect(mapStateToProps)(Login);

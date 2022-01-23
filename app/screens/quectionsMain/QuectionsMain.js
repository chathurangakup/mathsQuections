import React, {useState, useRef} from 'react';
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
  ScrollView,
  Modal,
  Alert,
  Platform,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import {Modalize} from 'react-native-modalize';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {fontSizes, materialTextFieldStyle, colors} from '../../config/styles';
import {Button} from '../../components/Button';
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
  const [isVisibleModel, setIsVisibleModel] = useState(false);
  // const [imagePath, setImagePath] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [imagePath, setImagePath] = useState(Images.NoDataImage);

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
                <View style={{flex: 5}}>
                  <Text style={{fontSize: 20, color: colors.white}}>
                    {option}
                  </Text>
                </View>

                <View style={{flex: 0.5}}>
                  {option == correctOption ? (
                    <View style={styles.correctAnsStyle}>
                      <MaterialCommunityIcons
                        name="check"
                        style={styles.iconStyle}
                      />
                    </View>
                  ) : option == currentOptionSelected ? (
                    <View style={styles.wrongAnsStyle}>
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
                <View style={{flex: 5}}>
                  <Image
                    style={{width: width / 3, height: height / 5}}
                    source={{uri: option}}></Image>
                </View>

                <View style={{flex: 0.5}}>
                  {option == correctOption ? (
                    <View style={styles.correctAnsStyle}>
                      <MaterialCommunityIcons
                        name="check"
                        style={styles.iconStyle}
                      />
                    </View>
                  ) : option == currentOptionSelected ? (
                    <View style={styles.wrongAnsStyle}>
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
          {allQuections[currentQuectionIndex]?.quection == ''
            ? ''
            : allQuections[currentQuectionIndex]?.quection}
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
          {allQuections[currentQuectionIndex].image == '' ? (
            <View></View>
          ) : (
            <View style={{alignItems: 'center', padding: 10}}>
              <Image
                style={{width: width / 2, height: height / 5}}
                source={{uri: allQuections[currentQuectionIndex].image}}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <View>
           <View>
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
           </View>
           <View style={{flexDirection:'row'}}>
             <View style={{flex:2}}>

             </View>
             <View style={{flex:1}}>
             <TouchableOpacity
          style={{
            marginTop: 20,
            width: '100%',
            backgroundColor: colors.secondaryColor2,
            padding: 15,
            borderRadius: 35,
          }}
          onPress={() => onOpen()}>
          <Text
            style={{fontSize: 12, color: colors.white, textAlign: 'center'}}>
            Review
          </Text>
        </TouchableOpacity>
             </View>
           </View>
        </View>
      
       
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
  const modalizeRef = useRef(null);
  const animated = useRef(new Animated.Value(0)).current;

  const onOpen = () => {
    modalizeRef.current?.open();
  };

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

  const renderFloatingComponent = () => {
    return (
     
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            position: 'absolute',
            bottom: 10,
            right: 0,
            width: 70,
            height: 70,
            alignSelf: 'flex-end',
            justifyContent: 'space-between',
            backgroundColor: colors.primaryColor1,
            borderWidth: 0,
            margin: 20,
            borderRadius: 70,
            alignItems:'center',
            justifyContent:'center'
          }}>
             <TouchableOpacity onPress={() => setIsVisibleModel(true)}>
                <MaterialCommunityIcons
                        name="file-plus-outline"
                        style={styles.floatIconStyle}
                      />
            </TouchableOpacity>
          </View>
     
    );
  };

  const chooseCamera = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true, // do not backup to iCloud
        path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
      },
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker', storage());
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let path = getPlatformPath(response).value;
        let fileName = getFileName(response.fileName, path);
        setImagePath(path);
        setImageFileName(fileName);
        // getUrl(path, fileName);
      }
    });
  };

  const uploadImage = async (uri, name) => {
    const firebasePath = 'kupchaturanga1@gmail.com';
    const imageRef = storage().ref(`${firebasePath}/${name}`);
    await imageRef.putFile(uri, {contentType: 'image/jpg'}).catch(error => {
      throw error;
    });
    const url = await imageRef.getDownloadURL().catch(error => {
      throw error;
    });
    return url;
  };

  const chooseLib = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true, // do not backup to iCloud
        path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker', storage());
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let path = getPlatformPath(response).value;
        let fileName = getFileName(response.fileName, path);
        setImagePath(path);
        setImageFileName(fileName);
        console.log(fileName);
        // getUrl(path, fileName);
      }
    });
  };

  const getUrl = async (path, fileName) => {
    const url = await uploadImage(path, fileName);
    console.log(url);
  };

  /**
   * Get the file name and handle the invalid null case
   */
  const getFileName = (name, path) => {
    console.log(name + path + 'hhhhhh');
    if (name != null) {
      return name;
    }

    // if (Platform.OS === "ios") {
    //     path = "~" + path.substring(path.indexOf("/Documents"));
    // }
    return path.split('/').pop();
  };

  /**
   * Get platform specific value from response
   */
  const getPlatformPath = response => {
    return Platform.select({
      android: {value: response.assets[0].uri},
      ios: {value: response.assets[0].uri},
    });
  };

  const getPlatformURI =(imagePath)=> {
    let imgSource = imagePath;
    console.log("imagePath",imagePath)
    if (isNaN(imagePath)) {
        imgSource = { uri:imagePath };
        if (Platform.OS == 'android') {
            imgSource.uri =  imgSource.uri;
        }
    }
    return imgSource
}

  const renderModalizeModel = () => {
    return (
      <Modalize
        ref={modalizeRef}
        panGestureAnimatedValue={animated}
        FloatingComponent={renderFloatingComponent}>
        <View >
          <View style={{flexDirection:'row',paddingLeft:20}}>
            <View style={{flex:1,}}>
              <Image style={{color:'black', width:50,height:50}} source={Images.ProfilePic} />
            </View>
            <View style={{flex:4,padding:10}}>
                <Text style={{color:'black'}}>Uditha Chathuranga</Text>
                <Text style={{color:'black'}}>2022/12/10</Text>
            </View>
          </View>
          <View>
            <Text style={{color:'black',paddingLeft:25}}>Uditha Chathuranga</Text>
            <View style={{padding:10,backgroundColor:colors.primaryColor2,margin:20,alignItems:'center'}}>
              <TouchableOpacity onPress={()=>props.navigation.navigate('pinchScreen',{imgUrl:'https://firebasestorage.googleapis.com/v0/b/apescole-bb52b.appspot.com/o/kupchaturanga1%40gmail.com%2Frn_image_picker_lib_temp_2a246cd3-8329-4f21-9e31-d47b8ae45c92.jpg?alt=media&token=85ec057a-e75e-49b0-a3d5-7ce95d087b3f'})}>
                 <Image style={{color:'black', width:width/3,height:height/6}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/apescole-bb52b.appspot.com/o/kupchaturanga1%40gmail.com%2Frn_image_picker_lib_temp_2a246cd3-8329-4f21-9e31-d47b8ae45c92.jpg?alt=media&token=85ec057a-e75e-49b0-a3d5-7ce95d087b3f'}} />
              </TouchableOpacity>
              
            </View>
           
          </View>
        </View>
      </Modalize>
    );
  };

  const renderaddCommentModel = () => {
     let imgSource = getPlatformURI(imagePath);
    return(
      <Modal
      animationType="slide"
      transparent={true}
      visible={isVisibleModel}
      onRequestClose={() => {
        setIsVisibleModel(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
             <View style={{alignItems:'center'}}>
              <View style={styles.textAreaContainer} >
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Type something"
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  multiline={true}
                />
              </View>
                <View style={{flexDirection:'row'}}>
                   <Image style={{color:'black', width:width/2,height:height/5,borderColor:'black',borderWidth:1}} source={imgSource} />
                   <Text style={{color:'black',alignSelf:'center'}}> (Optional)</Text>
                </View>
              
                
              </View>
            

            <View style={styles.eightyWidthStyle}>
              <TouchableOpacity
                onPress={chooseCamera}
                style={{height: 30, backgroundColor: '#000', margin: 10}}>
                <Text>Choose Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={chooseLib}
                style={{height: 30, backgroundColor: '#000', margin: 10}}>
                <Text>Choose Library</Text>
              </TouchableOpacity>
            </View>
            <Button 
               buttonStyle={{color: colors.primaryColor2}}
               addText={"Add Comment"}
             onPressBtn={()=>  getUrl(imagePath,imageFileName)}
            />

          <View style={{alignItems:'center'}}>
            <Text style={{color:'black'}}>Or</Text>
            <TouchableOpacity onPress={()=>  setIsVisibleModel(false)}>
              <Text style={{color:'black'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          
          </View>
        </View>
      </View>
    </Modal>
    )

  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={Images.Background}
        resizeMode="cover"
        style={styles.mainComp}>
        {renderProgressBar()}

        {renderQuections()}

        {renderOptions()}

        {renderNextButton()}

        {renderModalizeModel()}

        {renderaddCommentModel()}
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
  wrongAnsStyle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctAnsStyle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {color: colors.white, fontSize: 20},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: "center",
    // marginTop: 0,
    // width:width,
    // height:height/2,
  },
  modalView: {
    marginLeft: 20,
    marginRight:20,
 
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  eightyWidthStyle: {
    flexDirection: 'row',
    width: '80%',
    margin: 2,
  },
  uploadImage: {
    width: '80%',
    height: 300,
  },
  textAreaContainer: {
    borderColor: '#777',
    borderWidth: 1,
    padding: 5,
    borderRadius:10,
    margin:10
  },
  textArea: {
    height: 150,
    width: width/1.5,
    justifyContent: "flex-start",
    color:'black'
  },
  floatIconStyle:{
    color: colors.white, fontSize: 30
  }

});

const mapStateToProps = (state, props) => {
  return {
    translate: getTranslate(state.localize),
  };
};

export default connect(mapStateToProps)(Login);

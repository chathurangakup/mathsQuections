import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground,
  Dimensions,
  ScrollView,
  Modal,
  Platform,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/AntDesign';
import {Modalize} from 'react-native-modalize';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';

import {colors} from '../../config/styles';
import {Button} from '../../components/Button';
import Images from '../../config/Images';
import {AppBar} from '../../components/AppBar';
import {showErrorSlideUpPanel, showAdverticeModal} from '../../lib/Utils';
import {LOGOUT_IMAGE} from '../../config/settings';
import {UPDATE_LOADING_SPINNER_STATE} from '../../actyonTypes/Common';

import {quectionsSet} from '../../config/DefaultJson';
import {
  GET_QUECTIONS,
  GET_USER_REVIEW,
  ADD_REVIEW,
  DELETE_REVIEW,
  SHOW_ADVERTICE,
} from './QuectionsMainActionTypes';
import {styles} from './Styles';

const {width, height} = Dimensions.get('window');

const QuectionMain = props => {
  const t = props.translate;
  const {titleId, subjectId, gradesId, teacherId} = props.route.params;
  const allQuections = quectionsSet;
  const [currentQuectionIndex, setCurrentQuectionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  // const [isOptionsDisable, setIsOptionsDisable] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isVisibleModel, setIsVisibleModel] = useState(false);
  const [imageFileName, setImageFileName] = useState('');
  const [imagePath, setImagePath] = useState(Images.NoDataImage);
  const [quections, setQuections] = useState(allQuections);
  const [reviews, setReviews] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [comment, setComment] = useState('');
  const [isShowMarksModel, setIsShowMarksModel] = useState(false);
  const [commentImageUrl, setCommentImageUrl] = useState('');
  let today = new Date();
  let date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  const validateAns = selectOption => {
    let correct_option = quections[currentQuectionIndex].correctAns;
    setCurrentOptionSelected(selectOption);
    setCorrectOption(correct_option);
    // setIsOptionsDisable(true);
    if (selectOption == correct_option) {
      setScore(score + 1);
    }
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuectionIndex + 1 == quections.length) {
      setIsShowMarksModel(true);
    } else {
      setCurrentQuectionIndex(currentQuectionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      // setIsOptionsDisable(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuectionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    console.log('teachersQ', titleId);
    let params = {
      subjectId: subjectId,
      gradesId: gradesId,
      titleId: titleId,
      teacherId: teacherId,
    };
    props.getQuections(params);
    //console.log("subjectsConfig".props.subjectsConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('props.showAdverticeConfig', props.showAdverticeConfig);
    if (props.showAdverticeConfig !== undefined) {
      showAdverticeModal(
        props.showAdverticeConfig.data.result[0].image,
        props.showAdverticeConfig.data.result[0].image,
        () => {},
        'OK',
      );
    }
  }, [props.showAdverticeConfig]);

  useEffect(() => {
    if (commentImageUrl !== '') {
      let params = {
        subjectId: subjectId,
        gradesId: gradesId,
        titleId: titleId,
        userId: userInfo ? userInfo._id : null,
        quectionId: quections[currentQuectionIndex]?._id,
        review: comment,
        role: userInfo ? userInfo.role : null,
        image: commentImageUrl,
        date: date,
        time: time,
        isPinned: false,
      };
      console.log(userInfo);
      console.log(params);
      props.addReview(params);
      setIsVisibleModel(false);
      setCommentImageUrl('');
      console.log('add comment with img', commentImageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentImageUrl !== '']);

  useEffect(() => {
    console.log('quections', props.config);
    if (props.config != undefined) {
      console.log('quections', props.config);
      setQuections(props.config.data.result);
    }
  }, [props.config]);

  useEffect(() => {
    console.log('reviewInfoConfig', props.reviewInfoConfig);
    if (props.reviewInfoConfig != undefined) {
      console.log('reviewInfoConfig', props.reviewInfoConfig);
      setReviews(props.reviewInfoConfig.data.result);
    }
  }, [props.reviewInfoConfig]);

  useEffect(() => {
    console.log('addReviewConfig', props.addReviewConfig);
    if (props.addReviewConfig != undefined) {
      console.log('addReviewConfig', props.addReviewConfig);
      if (props.addReviewConfig.data.result == 'success') {
        let params = {
          quectionid: quections[currentQuectionIndex]?._id,
        };
        props.getReviews(params);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.addReviewConfig]);

  const renderOptions = () => {
    return (
      <ScrollView>
        {quections[currentQuectionIndex]?.answerType == 'Text'
          ? quections[currentQuectionIndex].ansList.map((option, index) => (
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0.2, paddingTop: 25}}>
                  <Text style={{color: 'black'}}>{index + 1}. </Text>
                </View>
                <View style={{flex: 5}}>
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
                            : colors.primaryColor1,
                        backgroundColor:
                          option == correctOption
                            ? colors.green1
                            : option == currentOptionSelected
                            ? colors.red + '60'
                            : colors.white,
                      },
                    ]}>
                    <View style={styles.renderOptMain}>
                      <Text
                        style={[
                          styles.renderOptMainFont,
                          {
                            color:
                              option == correctOption
                                ? colors.white
                                : option == currentOptionSelected
                                ? colors.white
                                : colors.blackColor,
                          },
                        ]}>
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
                </View>
              </View>
            ))
          : quections[currentQuectionIndex].ansList.map((option, index) => (
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
                  {quections[currentQuectionIndex].imageAnsList != undefined
                    ? quections[currentQuectionIndex].imageAnsList.map(
                        (opt, index1) =>
                          index == index1 ? (
                            <Image
                              style={styles.quectionOpt}
                              source={{
                                uri: opt,
                              }}
                            />
                          ) : null,
                      )
                    : null}
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
      <View style={{paddingBottom: 30}}>
        <Text style={{color: colors.blackColor, fontSize: 15}}>
          {quections[currentQuectionIndex]?.quection == ''
            ? ''
            : currentQuectionIndex +
              1 +
              '. ' +
              quections[currentQuectionIndex]?.quection}
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
          {quections[currentQuectionIndex].imageQuection == '' ? (
            <View />
          ) : (
            <View style={{alignItems: 'center', padding: 10}}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('pinchScreen', {
                    imgUrl: quections[currentQuectionIndex].imageQuection,
                  })
                }>
                <Image
                  style={{width: width / 2, height: height / 5}}
                  source={{uri: quections[currentQuectionIndex].imageQuection}}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <View style={styles.nextBtnRoot}>
          <View styles={styles.nxtBtnMain}>
            <TouchableOpacity
              style={styles.nextBtnStyles}
              onPress={() => handleNext()}>
              <Text style={styles.nextBtnTextStyles}>NEXT</Text>
            </TouchableOpacity>
          </View>
          <View styles={styles.reviewBtnMain}>
            <TouchableOpacity
              style={styles.reviewBtnStyles}
              onPress={() =>
                onOpenReviewModel(quections[currentQuectionIndex]?._id)
              }>
              <Text style={styles.reviewBtnTextStyles}>
                {quections[currentQuectionIndex]?.quection == ''
                  ? ''
                  : quections[currentQuectionIndex]?.review_count}{' '}
                Review
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, quections.length],
    outputRange: ['0%', '100%'],
  });
  const modalizeRef = useRef(null);
  const animated = useRef(new Animated.Value(0)).current;

  const onOpenReviewModel = quectionId => {
    setReviews([]);

    let params = {
      quectionid: quectionId,
    };
    console.log('params', params);
    props.getReviews(params);
    modalizeRef.current?.open();
  };

  const renderProgressBar = () => {
    return (
      <View>
        <View
          style={{flexDirection: 'row', alignItems: 'flex-end', padding: 5}}>
          <Text style={styles.quectionTextStyle}>
            {currentQuectionIndex + 1}{' '}
          </Text>
          <Text style={styles.inProgressTxtstyle}> / {quections.length} </Text>
        </View>

        <View style={styles.InprogressAnimated}>
          <Animated.View
            style={[styles.animatedbarStyle, {width: progressAnim}]}
          />
        </View>
      </View>
    );
  };

  const visibleAddCommentModel = () => {
    setIsVisibleModel(true);
    setImagePath(Images.NoDataImage);
    setImageFileName('');
    setComment('');
  };

  const renderFloatingComponent = () => {
    return (
      <View style={styles.floatActionStyle}>
        <TouchableOpacity onPress={() => visibleAddCommentModel()}>
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
    setCommentImageUrl(url);
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
        global.store.dispatch({
          type: UPDATE_LOADING_SPINNER_STATE,
          payload: false,
        });
        // getUrl(path, fileName);
      }
    });
  };

  const getUrlAndAddCommit = async (path, fileName) => {
    console.log('comment' + comment);

    if (comment == '') {
      alert('please add comment');
    } else {
      setIsVisibleModel(false);
      if (fileName !== '' && comment !== '') {
        global.store.dispatch({
          type: UPDATE_LOADING_SPINNER_STATE,
          payload: true,
        });
        await uploadImage(path, fileName);
      } else if (fileName === '' && comment !== '') {
        let params = {
          subjectId: subjectId,
          gradesId: gradesId,
          titleId: titleId,
          userId: userInfo ? userInfo._id : null,
          quectionId: quections[currentQuectionIndex]?._id,
          review: comment,
          role: userInfo ? userInfo.role : null,
          image: '',
          date: date,
          time: time,
          isPinned: false,
        };
        console.log(userInfo);
        console.log(params);
        props.addReview(params);
        setIsVisibleModel(false);
      }
    }
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

  const getPlatformURI = imagePath => {
    let imgSource = imagePath;
    console.log('imagePath', imagePath);
    if (isNaN(imagePath)) {
      imgSource = {uri: imagePath};
      if (Platform.OS == 'android') {
        imgSource.uri = imgSource.uri;
      }
    }
    return imgSource;
  };

  useEffect(() => {
    if (props.deleteReviewConfig != undefined) {
      console.log('props.deleteReviewConfig', props.deleteReviewConfig);
      let params = {
        quectionid: quections[currentQuectionIndex]?._id,
      };
      props.getReviews(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.deleteReviewConfig]);

  const onPressDelete = reviewId => {
    showErrorSlideUpPanel(
      'Delete',
      'Are you sure, you want to delete?',
      true,
      LOGOUT_IMAGE,
      'CANCEL',
      () => {},
      'Delete',
      () => props.deleteReview(reviewId),
    );
  };

  const renderModalizeModel = () => {
    return (
      <Modalize
        ref={modalizeRef}
        panGestureAnimatedValue={animated}
        // scrollViewProps={{contentContainerStyle: {height: '120%'}}}
        FloatingComponent={renderFloatingComponent}>
        <ScrollView style={{marginBottom: 30}}>
          {reviews.length !== 0 ? (
            <View>
              <Text style={styles.ModalizeTextStyle}>Reviews</Text>
              {reviews.map((options, index) => (
                <View>
                  <View style={styles.reviewRoot}>
                    <View style={{flex: 1, paddingTop: 10}}>
                      <Image
                        style={styles.reviewImgStyles}
                        source={
                          options.userInfo[0].image === '' ||
                          options.userInfo[0].image == null
                            ? Images.ProfilePic
                            : {uri: options.userInfo[0].image}
                        }
                      />
                    </View>
                    <View style={{flex: 4, paddingTop: 5}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>
                          {options.userInfo[0].userName}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            paddingLeft: 5,
                          }}>
                          ({options.userInfo[0].role})
                        </Text>
                      </View>
                      <Text style={{color: 'black', fontSize: 10}}>
                        {' '}
                        {options.date} {options.time}
                      </Text>
                    </View>

                    <View style={{flex: 1, padding: 10}}>
                      {userInfo._id == options.userId ? (
                        <Icons
                          name="delete"
                          size={30}
                          color={colors.blackColor}
                          onPress={() => onPressDelete(options._id)}
                        />
                      ) : null}
                    </View>
                  </View>

                  <View style={{padding: 5}}>
                    <Text style={{color: 'black', paddingLeft: 25}}>
                      {options.review}
                    </Text>
                    {options.image == '' ? null : (
                      <View style={styles.ModalizeModelStyles}>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('pinchScreen', {
                              imgUrl: options.image,
                            })
                          }>
                          <Image
                            style={styles.reviewImgStyle2}
                            source={{
                              uri: options.image,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noReviews}>
              <Text
                style={{
                  color: 'black',
                }}>
                {' '}
                No Reviews{' '}
              </Text>
            </View>
          )}
        </ScrollView>
      </Modalize>
    );
  };

  const clickCancel = () => {
    setIsVisibleModel(false);
    setImagePath(Images.NoDataImage);
    setImageFileName('');
  };

  const clickRetryBtn = () => {
    // const params = {
    //   titleId: titleId,
    // };
    // props.showAdvertice(params);

    setIsShowMarksModel(false);
    setCurrentQuectionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setShowNextButton(false);

    setProgress(new Animated.Value(0));
    AdMobInterstitial.setAdUnitID('ca-app-pub-2295070264667994/5607241205');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  };

  const clickGotoNectBtn = () => {
    setIsShowMarksModel(false);
    setCurrentQuectionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setShowNextButton(false);

    setProgress(new Animated.Value(0));

    props.navigation.navigate('titleMain');
  };

  const renderaddCommentModel = () => {
    let imgSource = getPlatformURI(imagePath);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisibleModel}
        onRequestClose={() => {
          setIsVisibleModel(false);
          setImagePath(Images.NoDataImage);
          setImageFileName('');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <View style={{alignItems: 'center'}}>
                <View style={styles.textAreaContainer}>
                  <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Type something"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    value={comment}
                    onChangeText={text => setComment(text)}
                    multiline={true}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={styles.commentModelImgStyle}
                    source={imgSource}
                  />
                  <Text style={{color: 'black', alignSelf: 'center'}}>
                    {' '}
                    (Optional)
                  </Text>
                </View>
              </View>

              <View style={styles.eightyWidthStyle}>
                <TouchableOpacity
                  onPress={chooseCamera}
                  style={styles.camOrlibStyles}>
                  <Text style={styles.camOrlibTextStyles}> Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={chooseLib}
                  style={styles.camOrlibStyles}>
                  <Text style={styles.camOrlibTextStyles}>Library</Text>
                </TouchableOpacity>
              </View>
              <Button
                buttonStyle={{color: colors.primaryColor2}}
                addText={'Add Comment'}
                onPressBtn={() => getUrlAndAddCommit(imagePath, imageFileName)}
              />

              <View style={{alignItems: 'center'}}>
                <Text style={{color: 'black'}}>Or</Text>
                <TouchableOpacity onPress={() => clickCancel()}>
                  <Text style={{color: 'black'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const onPressBackIcon = () => {
    setCurrentQuectionIndex(currentQuectionIndex - 1);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    // setIsOptionsDisable(false);
    setShowNextButton(false);

    Animated.timing(progress, {
      toValue: currentQuectionIndex - 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (props.userinfo !== undefined) {
      setUserInfo(props.userinfo.data.userData);
      console.log('props.userinfo.userData', props.userinfo.data);
    }
  }, [props.userinfo]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={Images.Welcome}
        resizeMode="cover"
        style={styles.mainComp}>
        <AppBar
          navigation={props.navigation}
          title={t('quectionsMain.title')}
          profilePicImage={
            userInfo ? (userInfo.image == '' ? null : userInfo.image) : null
          }
        />
        <View style={{marginTop: 60, marginLeft: 20, marginRight: 20}}>
          {renderProgressBar()}
        </View>

        <View style={styles.bottomView}>
          {currentQuectionIndex + 1 === 1 ? null : (
            <Icons
              name="back"
              size={30}
              color={colors.blackColor}
              onPress={() => onPressBackIcon()}
            />
          )}

          <ScrollView>
            {renderQuections()}

            {renderOptions()}

            {renderaddCommentModel()}

            {/* Score Model */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={isShowMarksModel}>
              <View style={styles.rootModel}>
                <View style={styles.rootModalTextWrap}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: score > quections / 2 ? colors.green : colors.red,
                    }}>
                    {' '}
                    {score > quections / 2 ? 'Congratulations' : 'Oops!'}
                  </Text>
                  <View style={styles.rootModalTextWrap2}>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color:
                          score > quections / 2 ? colors.green : colors.red,
                      }}>
                      {score}
                    </Text>
                    <Text style={styles.quectionCountStyle}>
                      /{quections.length}
                    </Text>
                  </View>
                  {/* Retry button */}
                  {score > quections / 2 ? (
                    <TouchableOpacity
                      style={styles.nextBtnStyles}
                      onPress={() => clickGotoNectBtn()}>
                      <Text style={styles.nextBtnTextStyles}>Go to Next</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.nextBtnStyles}
                      onPress={() => clickRetryBtn()}>
                      <Text style={styles.nextBtnTextStyles}>RETRY</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Modal>
          </ScrollView>

          {renderNextButton()}
          {renderModalizeModel()}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const mapStateToProps = (state, props) => {
  return {
    translate: getTranslate(state.localize),
    config: state.quectionmain.quectionsConfig,
    loading: state.common.loading,
    reviewInfoConfig: state.quectionmain.reviewInfoConfig,
    addReviewConfig: state.quectionmain.addReviewConfig,
    deleteReviewConfig: state.quectionmain.deleteReviewConfig,
    userinfo: state.profiledata.profileInfoConfig,
    showAdverticeConfig: state.quectionmain.showAdverticeConfig,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getQuections: payload => {
      dispatch({type: GET_QUECTIONS, payload: payload});
    },
    getReviews: payload => {
      dispatch({
        type: GET_USER_REVIEW,
        payload: payload,
      });
    },
    addReview: payload => {
      dispatch({
        type: ADD_REVIEW,
        payload: payload,
      });
    },

    deleteReview: reviewId => {
      dispatch({
        type: DELETE_REVIEW,
        reviewId: reviewId,
      });
    },

    showAdvertice: payload => {
      dispatch({
        type: SHOW_ADVERTICE,
        payload: payload,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuectionMain);

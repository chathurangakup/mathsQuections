import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Modal,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// import {Navigation} from 'react-native-navigation';

import {Button} from './Button';
import {colors} from '../config/styles';

import {HIDE_SUBJECT_BATTLEMARKS_MODAL} from '../actyonTypes/Common';
import Images from '../config/Images';

const {width, height} = Dimensions.get('window');

const SlideUpPanel = props => {
  const [isVisibleModel, setIsVisibleModel] = useState(false);

  const handleClosed = () => {
    props.hideAdverticeModel();
    // if (modalizeRef.current) {
    //   modalizeRef.current.close();
    // }
  };

  const okPress = () => {
    props.hideAdverticeModel();
    props.config.okPress();
  };

  const SubjectItem = ({subjects}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.0}
        onPress={() => {
          props.navigation.navigate('categories', {
            subjectId: subjects.item._id,
          });
        }}
        style={styles.subjectItemBtn}>
        <Image
          style={styles.subjectItemImgStyle}
          source={{
            uri: subjects.item.image,
          }}
        />
        <Text style={styles.subjName}>{subjects.item.subjectName}</Text>
        <Text style={styles.subjSubName}>{subjects.item.subjectSubName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.config.visible}
        onRequestClose={() => {
          setIsVisibleModel(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
                data={props.config.subjectarray}
                style={{paddingHorizontal: 20, marginTop: -60, marginBottom: 80}}
                contentContainerStyle={{alignItems: 'center'}}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                // keyExtractor={item=> item.value}
                renderItem={item => <SubjectItem subjects={item} />}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  okbtnStyle: {
    padding: 10,
    width: 200,
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    marginLeft: 20,
    marginRight: 20,
    width: width,
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
  },
  image: {
    width: width,
    height: '90%',
  },
});

SlideUpPanel.defaultProps = {
  config: {
    alertType: 'TYPE_SUBJECT_MODAL',
    visible: false,
    subjectarray: [],
    okBtnText: '',
    okPress: () => {},
  },
};

const mapStateToProps = (state, props) => {
  return {
    config: state.common.adverticeModalConfig,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideAdverticeModel: () => {
      dispatch({
        type: HIDE_SUBJECT_BATTLEMARKS_MODAL,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlideUpPanel);

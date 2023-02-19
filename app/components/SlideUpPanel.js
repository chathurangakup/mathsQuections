import React, {useEffect, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, Image} from 'react-native';
// import {Navigation} from 'react-native-navigation';

import {Button} from './Button';
import {colors} from '../config/styles';
import Images from '../config/Images';
import {LOGOUT_IMAGE} from '../config/settings';

const SlideUpPanel = props => {
  const modalizeRef = useRef(null);
  // const onOpen = () => {
  //     modalizeRef.current?.open();
  // };

  useEffect(() => {
    // Update the document title using the browser API
    if (props.config.visible == true) {
      modalizeRef.current?.open();
    }

    console.log('props.config', props.config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.config.visible == true]);

  const handleClose = () => {
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
    props.config.onPressLeft();
  };

  const handleClosed = () => {
    props.hideSlidUpPanel();
    // if (modalizeRef.current) {
    //   modalizeRef.current.close();
    // }
  };

  const onPressRight = () => {
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
    props.hideSlidUpPanel();
    props.config.onPressRight();
  };

  const okPress = () => {
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
    props.hideSlidUpPanel();
    props.config.okPress();
  };

  return (
    <Modalize
      ref={modalizeRef}
      handlePosition="inside"
      onClosed={() => handleClosed()}
      onBackButtonPress={() => false}
      adjustToContentHeight={true}>
      <View style={{paddingBottom: 50, paddingTop: 20, alignItems: 'center'}}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
          {props.config.title}
        </Text>
      </View>

      <View style={{alignItems: 'center'}}>
        {props.config.imgType == LOGOUT_IMAGE ? (
          <Image style={styles.image} source={Images.Logout} />
        ) : (
          <Image style={styles.image} source={Images.ProfilePic} />
        )}
      </View>

      <Text style={{color: 'black', alignSelf: 'center', padding: 30}}>
        {props.config.msg}
      </Text>

      {props.config.twoButtons == true ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <View style={{flex: 1, padding: 10}}>
            <Button
              buttonStyle={{
                color: colors.blackColor,
                backgroundColor: 'transparent',
              }}
              textStyles={{color: colors.blackColor}}
              onPressBtn={() => handleClose()}
              addText={props.config.leftBtnText}
            />
          </View>

          <View style={{flex: 1, padding: 10}}>
            <Button
              buttonStyle={{color: colors.primaryColor2}}
              onPressBtn={() => onPressRight()}
              addText={props.config.rightBtnText}
            />
          </View>
        </View>
      ) : (
        <View style={styles.okbtnStyle}>
          <Button
            buttonStyle={{color: colors.primaryColor2}}
            onPressBtn={() => okPress()}
            addText={props.config.okBtnText}
          />
        </View>
      )}
    </Modalize>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 150,
  },
  okbtnStyle: {
    flex: 1,
    padding: 10,
    width: 200,
    alignSelf: 'center',
  },
});

SlideUpPanel.defaultProps = {
  config: {
    alertType: 'TYPE_SUCCESS_POSITIVE_ALERT',
    visible: false,
    title: null,
    msg: null,
    okText: null,
    okFn: () => {},
    btnCancel: () => {},
    twoButtons: false,
    leftBtnText: 'CANCEL',
    onPressLeft: () => {},
    rightBtnText: '',
    onPressRight: () => {},
    okBtnText: '',
    okPress: () => {},
  },
};

const mapStateToProps = (state, props) => {
  return {
    config: state.common.slideUpPanelConfig,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideSlidUpPanel: () => {
      dispatch({
        type: 'HIDE_BOTTOM_ALERT',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlideUpPanel);

import React from 'react';
import {View, Dimensions, Modal, Image, Text} from 'react-native';

import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import {AppBar} from '../../components/AppBar';

const {width, height} = Dimensions.get('window');

const Pinch = props => {
  const images = [
    {
      url: props.route.params.imgUrl,
      props: {
        // Or you can set source directory.
        // source: require('../../assests/images/profilepic.png'),
      },
    },
    {
      props: {
        // Or you can set source directory.
        source: require('../../assests/images/profilepic.png'),
      },
    },
  ];
  return (
    <View style={{flex: 1}}>
      <AppBar navigation={props.navigation} />
      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
        // onZoomAfter={this.logOutZoomState}
        style={{
          padding: 10,
          backgroundColor: 'white',
        }}>
        <Image
          style={{flex: 1, width: null, height: '100%'}}
          source={{uri: props.route.params.imgUrl}}
          resizeMode="contain"
        />
      </ReactNativeZoomableView>
    </View>
  );
};

export default Pinch;

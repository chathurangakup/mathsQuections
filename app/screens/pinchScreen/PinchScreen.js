import React from 'react';
import {View, Dimensions, Image} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const {width, height} = Dimensions.get('window');

const Pinch = props => {
  return (
    <ImageZoom
      cropWidth={Dimensions.get('window').width}
      cropHeight={Dimensions.get('window').height}
      imageWidth={Dimensions.get('window').width}
      imageHeight={Dimensions.get('window').height}>
      <Image
        style={{width: width, height: height / 2, marginTop: height / 5}}
        source={{uri: props.route.params.imgUrl}}
      />
    </ImageZoom>
  );
};

export default Pinch;

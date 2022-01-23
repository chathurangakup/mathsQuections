import React from 'react';
import { View, Dimensions,Image} from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';

const {width,height} = Dimensions.get('window');


const Pinch = props =>{

    return(
        <ImageZoom cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={width}
            imageHeight={height}>
                <Image style={{width:width, height:height}}
                        source={{uri: props.route.params.imgUrl}}/>
        </ImageZoom>
    )
}

export default Pinch;
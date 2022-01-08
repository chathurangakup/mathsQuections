import {Platform} from 'react-native';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');


export const fontSizes = {
  sixteenSize: 16,
  fourteenZise: 14,
};

export const fontWeights = {
  normal: 'normal',
  hard: '600',
  medium: '500',
  semiMedium: '400',
};

export const colors = {
    brown: '#80479a',
    purpleColor1: '#65246E', //purple
    primaryColor2: '#EB275A', //pink
    secondaryColor1: '#F88E13', //orange
    secondaryColor2: '#178DE7', //blue
    secondaryColor3: '#C42378', //pink+purple
    blackColor: '#000000',
}  

export const materialTextFieldStyle = {
  tintColor: colors.purpleColor1,
  activeLineWidth: 2,
  textColor: colors.blackColor,
  titleFontSize: fontSizes.sixteenSize,
  labelFontSize: fontSizes.sixteenSize,
};

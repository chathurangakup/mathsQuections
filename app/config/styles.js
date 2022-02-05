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
  primaryColor1: '#22C3FF', //purple
  lightBlue: '#add8e6',
  primaryColor2: '#EB275A', //pink
  secondaryColor1: '#CD853F', //orange
  secondaryColor2: '#C71585', //blue
  blackColor: '#000000',
  white: '#fff',
  green: '#00AE28',
  green1: '#20B2AA',
  red: '#FC0000',
};

export const materialTextFieldStyle = {
  tintColor: colors.purpleColor1,
  activeLineWidth: 2,
  textColor: colors.blackColor,
  titleFontSize: fontSizes.sixteenSize,
  labelFontSize: fontSizes.sixteenSize,
};

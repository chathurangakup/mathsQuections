import React from 'react';
import {Text, Platform} from 'react-native';

import {colors} from '../config/styles';

const StyledText = props => {
  const fontFamilies = {
    en_normal: {
      fontFamily: 'OpenSans',
    },
    en_medium: {
      fontFamily: 'OpenSans-Bold',
    },
    si_normal: {
      fontFamily: 'Roboto',
    },
    si_medium: {
      fontFamily: 'Roboto',
      fontWeight: '900',
    },
    ta: {
      fontFamily:
        Platform.os === 'ios' ? 'NotoSansTamil-Regular' : 'LathaRegular',
    },
    ta_medium: {
      fontFamily:
        Platform.os === 'ios' ? 'NotoSansTamil-Medium' : 'LathaRegular',
      fontWeight: '500',
    },
    ch_normal: {
      fontFamily: 'Roboto',
    },
    ch_medium: {
      fontFamily: 'Roboto',
      fontWeight: '900',
    },
  };

  const localizeStyles = (forceLang, propStyles, fontWeight = 'normal') => {
    const fontFamily =
      fontFamilies[(forceLang || global.lang) + '_' + fontWeight];
    const style = {...propStyles, ...fontFamily};
    return style;
  };

  return (
    <Text
      {...props}
      adjustsFontSizeToFit={true}
      style={[
        styles.text,
        localizeStyles(props.forceLang, props.style, props.fontWeight),
      ]}>
      {props.children}
    </Text>
  );
};

const txtColor = Platform.select({
  android: {
    color: colors.textColor4,
  },
  ios: {
    color: colors.textColor1,
  },
});
const styles = {
  text: {
    ...txtColor,
    backgroundColor: 'transparent',
  },
};

export default StyledText;

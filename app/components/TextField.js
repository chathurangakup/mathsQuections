import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import { fontSizes, materialTextFieldStyle } from '../config/styles';

export default class MaterialTextField extends Component {
  render() {
    return (
      <TextField
        activeLineWidth={materialTextFieldStyle.activeLineWidth}
        textColor={materialTextFieldStyle.textColor}
        tintColor={materialTextFieldStyle.tintColor}
        titleFontSize={fontSizes.body1}
        labelFontSize={fontSizes.body1}
        allowFontScaling={false}
        {...this.props}
      />
    );
  }
}

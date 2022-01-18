import React, { Component } from 'react';
import {TouchableOpacity,Text,StyleSheet, Dimensions} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { fontSizes, materialTextFieldStyle } from '../config/styles';

import {colors} from '../config/styles';

const {width,height} = Dimensions.get('window');

export const Button = props=> {
    return (
      <TouchableOpacity  onPress={props.onPressBtn} style={[styles.btnStyle,props.buttonStyle]}>
         <Text style={[styles.textStyle,props.textStyles]}>{props.addText}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
   btnStyle:{
    backgroundColor: colors.primaryColor1,
    alignItems:'center',
    justifyContent:'center', 
    borderRadius:30,
    height: height/20,
   },
   textStyle:{
     color:colors.white,
     fontSize: 15
   }
})

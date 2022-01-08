import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';

import {fontSizes, materialTextFieldStyle, colors} from '../../config/styles';
import TextField from '../../components/TextField';

const Login = props => {
   const t = props.translate;

  return (
    <View>
      <Text style={{color:'black'}}>login</Text>

      <TouchableOpacity
            style={styles.languageView}
            onPress={()=> props.navigation.navigate('login')}
          >
            <Text style={styles.languageText}>{item.name}</Text>
          </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state, props) => {
  return {
    translate: getTranslate(state.localize),
  };
};

export default connect(mapStateToProps)(Login);

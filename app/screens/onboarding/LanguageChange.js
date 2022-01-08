import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

import {language} from '../../config/DefaultJson';

const Language = props => {
  return (
    <View style={{flex:1,backgroundColor:'yellow'}}>
      <View style={{justifyContent: 'center'}}>
        {language.map((item, index) => (
          <TouchableOpacity
            style={styles.languageView}
            onPress={()=> props.navigation.navigate('login')}
          >
            <Text style={styles.languageText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  languageListView: {
    marginTop: 20,
    width: '80%',
  },
  languageList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderTopColor: '#EBEBEB',
    height: 50,

  },
  languageText: {
    justifyContent: 'center',
    alignItems: 'center',
    color:'black'
  },
});

export default Language;

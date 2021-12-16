import React from 'react';
import {Text, View,TouchableOpacity,StyleSheet} from 'react-native';

import {language} from '../../config/DefaultJson';

const Language = () => {
  return (
    <View>
      {language.map((item, index) => (
        <TouchableOpacity
        
          style={styles.languageView}
          //onPress={}
          >
          <Text style={styles.languageText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
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
    loaderContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  
 
  });

export default Language;

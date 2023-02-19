import React from 'react';
import {StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import Lottie from '../config/Lottie';
import LottieView from 'lottie-react-native';
import {colors} from '../config/styles';
const {height, width} = Dimensions.get('window');

export const LoadingSpinner = props => {
  return (
    <View>
      {props.showLoading && (
        <View style={styles.mainBox}>
          <View style={styles.contentNoShadow}>
            <LottieView
              source={Lottie.Loading}
              autoPlay
              loop
              style={styles.loadingGif}
            />
            <Text style={styles.loadingText}>Please wait</Text>
          </View>
        </View>
      )}
    </View>
  );
};
LoadingSpinner.defaultProps = {
  showLoading: true,
};

const styles = StyleSheet.create({
  mainBox: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1000,
    paddingTop: 400,
    // width: 100,
    // height: 100,
  },
  contentNoShadow: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.backdropColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  loadingGif: {width: 100, height: 100},
  loadingText: {color: colors.blackColor, fontSize: 15, paddingTop: 0},
});

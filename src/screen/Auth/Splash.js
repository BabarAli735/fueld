import React, {useEffect} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackArrow from '../../components/BackArrow';
import NormalHeader from '../../components/NormalHeader';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';
import Row from '../../components/Row';
import {
  SCREENS,
  IMAGES,
  COLORS,
  SIZES,
  FONTS,
  CONSTANTS,
  height,
  width,
} from '../../constants/theme';

export default function Splash({navigation}) {
  let isFirstTime = '';
  useEffect(async () => {
    isFirstTime = await AsyncStorage.getItem(CONSTANTS.CACHE.IS_FIRST_TIME);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
      }}>
      {/* <StatusBar backgroundColor={COLORS.transparent} /> */}
      <Image
        source={IMAGES.LogoSplash}
        resizeMode={'contain'}
        style={{marginTop: height / 5, height: SIZES.fifty * 1.5}}
      />
      <Image
        source={IMAGES.LogoFueldUser}
        resizeMode={'contain'}
        style={{
          position: 'absolute',
          bottom: height / 4.7,
          left: 0,
          height: SIZES.fifty * 1.5,
          zIndex: 1,
        }}
      />
      <Image
        source={IMAGES.fire}
        resizeMode={'cover'}
        style={{
          position: 'absolute',
          bottom: 0,
          height: height * 0.85,
          width: width,
        }}
      />
      {/* <Image
        source={IMAGES.fire}
        resizeMode={'cover'}
        style={{position: 'absolute', bottom: 0, height: height / 1.75}}
      /> */}
      <MyTouchableOpacity
        style={{
          position: 'absolute',
          bottom: SIZES.twentyFive * 1.5,
          right: SIZES.twentyFive * 1.5,
        }}
        onPress={() => {
          navigation.replace(
            isFirstTime === null ? SCREENS.TuturialScreens : SCREENS.Login,
          );
        }}>
        <Row style={{alignItems: 'center'}}>
          <Text style={[FONTS.boldFont18, {color: COLORS.black}]}>
            Get Started
          </Text>
          <Image
            resizeMode={'contain'}
            source={IMAGES.ArrowRight}
            style={{
              height: SIZES.fifteen * 1.25,
              marginLeft: SIZES.ten,
              tintColor: COLORS.black,
            }}
          />
        </Row>
      </MyTouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heart: {
    width: 50,
    height: 50,
  },
  heartShape: {
    width: 30,
    height: 45,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#6427d1',
  },
  leftHeart: {
    transform: [{rotate: '-45deg'}],
    left: 5,
  },
  rightHeart: {
    transform: [{rotate: '45deg'}],
    right: 5,
  },
});

/* @flow weak */
import React from 'react';
import {StyleSheet, Text, Platform} from 'react-native';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, FONTFAMILY, STYLES, SIZES, FONTS} from '../constants';
import {Icon} from 'native-base';
import Card from './Card';
import LinearGradient from 'react-native-linear-gradient';

export default ButtonHelp = ({onPress, style}) => {
  return (
    <Card style={[style, {borderRadius: SIZES.ten}]}>
      <LinearGradient
        colors={[COLORS.primary1, COLORS.secondary]}
        style={[styles.loginBtnBg, {}]}>
        <MyTouchableOpacity
          onPress={onPress}
          style={[
            styles.loginBtnBg,
            {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Icon
            type={FONTFAMILY.SimpleLineIcons}
            name={'question'}
            style={{fontSize: SIZES.twenty, color: COLORS.white}}
          />
          <Text
            style={[
              FONTS.mediumFont12,
              {
                color: COLORS.white,
                textAlign: 'center',
                marginLeft: SIZES.five,
              },
            ]}>
            Help
          </Text>
        </MyTouchableOpacity>
      </LinearGradient>
    </Card>
  );
};

const styles = StyleSheet.create({
  loginBtnBg: {
    padding: SIZES.five,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.ten,
  },
});

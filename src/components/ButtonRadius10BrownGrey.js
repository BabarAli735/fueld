/* @flow weak */
import React from 'react';
import {StyleSheet, Text, Platform} from 'react-native';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, FONTFAMILY, STYLES, SIZES, FONTS} from '../constants';
import {Icon} from 'native-base';
import Card from './Card';
import LinearGradient from 'react-native-linear-gradient';

const ButtonRadius10BrownGrey = ({
  label,
  onPress,
  style,
  icon,
  isBrightButton,
}) => {
  return (
    <Card style={[style, {borderRadius: SIZES.ten}]}>
      <LinearGradient
        colors={[COLORS.brownGrey, COLORS.brownGrey]}
        style={[styles.loginBtnBg, {}]}>
        <MyTouchableOpacity
          onPress={onPress}
          style={[
            styles.loginBtnBg,
            {
              justifyContent: icon ? 'space-between' : 'center',
            },
          ]}>
          <Text
            style={[
              FONTS.boldFont18,
              {
                color: isBrightButton ? COLORS.primary1 : COLORS.white,
                textAlign: 'center',
              },
            ]}>
            {label}
          </Text>
        </MyTouchableOpacity>
      </LinearGradient>
    </Card>
  );
};

export default ButtonRadius10BrownGrey;

const styles = StyleSheet.create({
  loginBtnBg: {
    paddingLeft: '10%',
    paddingRight: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.ten,
    width: '100%',
    height: 60,
  },
});

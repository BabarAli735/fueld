/* @flow weak */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, FONTFAMILY, STYLES, SIZES, FONTS, height} from '../constants';
import {Icon} from 'native-base';
import Card from './Card';

const ButtonRadius10 = ({
  label,
  onPress,
  style,
  icon,
  isBrightButton,
  disabled,
}) => {
  return (
    <Card style={[style, {borderRadius: SIZES.ten}]}>
      <View
        style={[
          styles.loginBtnBg,
          {
            backgroundColor: isBrightButton
              ? COLORS.darkBlueGrey
              : COLORS.primary,
          },
        ]}>
        <MyTouchableOpacity
          disabled={disabled}
          onPress={onPress}
          style={[
            styles.loginBtnBg,
            {
              justifyContent: icon ? 'space-between' : 'center',
            },
          ]}>
          <Text
            style={[
              FONTS.boldFont16,
              {
                color: isBrightButton ? COLORS.primary : COLORS.white,
                textAlign: 'center',
              },
            ]}>
            {label}
          </Text>
        </MyTouchableOpacity>
      </View>
    </Card>
  );
};

export default ButtonRadius10;

const styles = StyleSheet.create({
  loginBtnBg: {
    paddingLeft: '10%',
    paddingRight: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.ten,
    width: '100%',
    height: height * 0.06,
  },
});

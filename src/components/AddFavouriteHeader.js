import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NormalHeader from './NormalHeader';
import BackArrow from './BackArrow';
import {SIZES, FONTS, COLORS, FONTFAMILY} from './../constants/theme';
import Card from './Card';
import MyTouchableOpacity from './MyTouchableOpacity';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

export default function AddFavouriteHeader(props) {
  return (
    <View style={[styles.container, props.style]}>
      <BackArrow isBright={props.isBright} style={{}} />
      <View>
        <Text
          style={[
            FONTS.boldFont22,
            {color: props.isBright ? COLORS.white : COLORS.BLACK},
          ]}>
          {props.title}
        </Text>
      </View>
      <Card style={[{borderRadius: SIZES.ten}]}>
        <LinearGradient
          colors={[COLORS.primary1, COLORS.secondary]}
          style={[styles.loginBtnBg, {}]}>
          <MyTouchableOpacity
            onPress={props.onPress}
            style={[
              styles.loginBtnBg,
              {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Icon
              type={FONTFAMILY.AntDesign}
              name={'plus'}
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
              Add
            </Text>
          </MyTouchableOpacity>
        </LinearGradient>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loginBtnBg: {
    padding: SIZES.five,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.ten,
  },
});

import {Icon} from 'native-base';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  IMAGES,
  SCREENS,
  SIZES,
} from '../constants';
import CircularImage from './CircularImage';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import BackArrow from './BackArrow';

export default function LogoHeader(props) {
  const navigation = useNavigation();
  const USERPROFILE = useSelector(state => state.Profile.UserProfile);
  const Indicator = useSelector(
    state => state.Indicators.notificationIndicator,
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {props.isBackArrow ? (
        <BackArrow onPress={props.onPress} />
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={props.onMenuePress}>
          {Indicator ? (
            <View
              style={{
                height: SIZES.ten * 1.2,
                width: SIZES.ten * 1.2,
                borderRadius: SIZES.ten * 1.2,
                position: 'absolute',
                backgroundColor: 'red',
                zIndex: 1,
                right: 1,
                top: 0,
              }}
            />
          ) : null}
          <Icon
            name={'menu'}
            type={FONTFAMILY.Entypo}
            style={{
              color: COLORS.black,
              fontSize: 24,
            }}
          />
        </TouchableOpacity>
      )}

      <Image
        source={IMAGES.LogoFueldUser1}
        style={{height: SIZES.twenty * 2, width: SIZES.twenty * 4}}
        resizeMode={'contain'}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate(SCREENS.Profile);
        }}>
        <CircularImage
          style={{height: SIZES.twenty * 2, width: SIZES.twenty * 2}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

import React, {useState, memo} from 'react';
import {Text, StyleSheet, View, Image, ImageStore} from 'react-native';
import {useSelector} from 'react-redux';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  SIZES,
  IMAGES,
  width,
} from '../constants';

export default function CircularImage(props) {
  const UserProfile = useSelector(state => state.Profile.UserProfile);
  // console.log(
  //   'CircularImage ===========>>>>>>>>>> ',
  //   `${CONSTANTS.API_CALLS.IMAGE_URL}${UserProfile.image}`,
  // );

  return (
    <View style={[props.style, {overflow: 'hidden'}]}>
      <Image
        source={{
          uri:
            props.uri === null || props.uri === undefined
              ? `${CONSTANTS.API_CALLS.IMAGE_URL}${UserProfile.image}`
              : props.uri,
        }}
        resizeMode="cover"
        style={[styles.image, props.style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: SIZES.twenty * 3,
    width: SIZES.twenty * 3,
    borderRadius: width,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});

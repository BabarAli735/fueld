import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import BackArrow from './BackArrow';
import {IMAGES, SIZES} from './../constants/theme';
import ButtonHelp from './ButtonHelp';

export default function UploadPhotoHeader() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.fifteen,
      }}>
      <BackArrow />
      <Image
        source={IMAGES.LoginLogo}
        style={{flex: 0.5}}
        resizeMode={'contain'}
      />
      <ButtonHelp />
    </View>
  );
}

const styles = StyleSheet.create({});

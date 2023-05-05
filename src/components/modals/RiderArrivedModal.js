import React, {useState} from 'react';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View, Image} from 'react-native';

import {COLORS, FONTFAMILY, FONTS, IMAGES, SIZES} from '../../constants';
import ButtonRadius10 from '../ButtonRadius10';
import MessageEditText from '../MessageEditText';
export default function RiderArrivedModal({visibility, setVisibility}) {
  //   console.log('kuch bhiiiiii', ' ', props.visibility);

  //************rendorBottomSheet */
  const renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <Image
          source={IMAGES.LogoFueldUser1}
          style={{height: SIZES.twenty * 5, width: SIZES.twenty * 5}}
          resizeMode="contain"
        />
        <Text style={[FONTS.mediumFont18, {color: COLORS.brownGrey}]}>
          Your Rider is Arrived
        </Text>
        <ButtonRadius10
          label={'Ok'}
          style={{marginTop: SIZES.twenty * 2, marginBottom: SIZES.ten}}
          onPress={() => {
            setVisibility(false);
          }}
        />
      </View>
    );
  };

  return (
    <Modal isVisible={visibility} style={styles.modal}>
      {renderBottomSheetContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBody: {
    backgroundColor: COLORS.white,
    padding: SIZES.fifteen,
    borderRadius: SIZES.ten,
    marginHorizontal: SIZES.fifteen,
    marginBottom: SIZES.twenty,
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
});

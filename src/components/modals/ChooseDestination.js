import React, {useState} from 'react';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {COLORS, FONTFAMILY, FONTS, SIZES} from '../../constants';
import ButtonRadius10 from '../ButtonRadius10';

export default function ChooseDestination(props) {
  //   console.log('kuch bhiiiiii', ' ', props.visibility);

  //************rendorBottomSheet */
  const renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View
          style={{
            height: SIZES.five,
            backgroundColor: COLORS.brownGrey,
            width: SIZES.twentyFive * 3,
            alignSelf: 'center',
            borderRadius: 5,
          }}
        />
        <Text style={[FONTS.mediumFont16, {marginVertical: SIZES.ten}]}>
          Choose a Destination{' '}
        </Text>
        <Text style={[FONTS.lightFont12, {color: COLORS.brownGrey}]}>
          Please select a valid destination location on the map.{' '}
        </Text>
        <ButtonRadius10
          label={'Set Destination'}
          style={{marginTop: SIZES.twenty * 2, marginBottom: SIZES.ten}}
          onPress={() => {
            props.setVisibility(false);
          }}
        />
      </View>
    );
  };

  return (
    <Modal isVisible={props.visibility} style={styles.modal}>
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
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

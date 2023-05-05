import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import MyTouchableOpacity from '../MyTouchableOpacity';
import {COLORS, FONTS, height, SIZES} from '../../constants';

export default function ErrorView(props) {
  return (
    <Modal
      isVisible={props.visibility}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: SIZES.ten,
          borderRadius: SIZES.ten,
        }}>
        <Text
          style={[
            FONTS.boldFont24,
            {
              color: COLORS.black,
              marginTop: SIZES.five,
              textAlign: 'center',
              marginBottom: SIZES.twenty,
            },
          ]}>
          Error!!
        </Text>
        <Text
          style={[
            FONTS.mediumFont14,
            {textAlign: 'center', marginBottom: SIZES.ten},
          ]}>
          {props.msg}
        </Text>
        <View style={{marginTop: SIZES.twenty}}>
          <View
            style={[
              styles.loginBtnBg,
              {
                backgroundColor: COLORS.primary,
              },
            ]}>
            <MyTouchableOpacity
              onPress={() => {
                props.setVisibility(false);
                props.setErrorMsg('');
              }}
              style={[
                styles.loginBtnBg,
                {
                  justifyContent: 'center',
                },
              ]}>
              <Text
                style={[
                  FONTS.boldFont18,
                  {
                    color: COLORS.white,
                    textAlign: 'center',
                  },
                ]}>
                OK
              </Text>
            </MyTouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  loginBtnBg: {
    paddingLeft: '10%',
    paddingRight: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.ten,
    width: '100%',
    height: height * 0.07,
  },
});

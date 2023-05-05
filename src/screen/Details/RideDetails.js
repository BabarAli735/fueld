import React from 'react';
import {Icon} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';
import ButtonRadius10 from '../../components/ButtonRadius10';

import {
  COLORS,
  FONTFAMILY,
  IMAGES,
  SIZES,
  STYLES,
  SCREENS,
  FONTS,
} from '../../constants';
import BackArrow from '../../components/BackArrow';
import CircularImage from '../../components/CircularImage';

export default function RideDetails() {
  return (
    <View style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <BackArrow
          style={{
            marginVertical: SIZES.ten,
          }}
        />

        <CircularImage image={IMAGES.user1} style={styles.image} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginVertical: SIZES.twenty,
        }}>
        <CircularImage image={IMAGES.user1} style={styles.image} />
        <Text style={[FONTS.boldFont16, {flex: 1, marginLeft: SIZES.ten}]}>
          Earl Gurrero
        </Text>
        <View>
          <Text style={[FONTS.boldFont18, {color: COLORS.turquoiseBlue}]}>
            $150
          </Text>
          <Text>1.5km</Text>
        </View>
      </View>

      <View style={{marginVertical: SIZES.twenty}}>
        <Text style={[FONTS.lightFont16, {color: COLORS.brownGrey}]}>
          PICK UP
        </Text>
        <Text style={[FONTS.mediumFont16, {color: COLORS.black}]}>
          7958 Swift Village
        </Text>
      </View>

      <View style={{marginVertical: SIZES.twenty}}>
        <Text style={[FONTS.lightFont16, {color: COLORS.brownGrey}]}>
          Drop Off
        </Text>
        <Text style={[FONTS.mediumFont16, {color: COLORS.black}]}>
          105 Williams St, Chicago, US
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: SIZES.twenty,
        }}>
        <MyTouchableOpacity
          style={[styles.button2, {backgroundColor: COLORS.primary}]}>
          <View>
            <Icon
              name={'call-outline'}
              type={FONTFAMILY.Ionicons}
              style={{
                color: COLORS.white,
                fontSize: SIZES.twentyFive,
                textAlign: 'center',
              }}
            />
            <Text style={[FONTS.mediumFont12, {color: COLORS.white}]}>
              Call
            </Text>
          </View>
        </MyTouchableOpacity>

        <MyTouchableOpacity
          style={[
            styles.button2,
            {
              backgroundColor: COLORS.turqoise,
              marginHorizontal: SIZES.twenty,
            },
          ]}>
          <View>
            <Icon
              name={'message1'}
              type={FONTFAMILY.AntDesign}
              style={{
                color: COLORS.white,
                fontSize: SIZES.twentyFive,
                textAlign: 'center',
              }}
            />
            <Text style={[FONTS.mediumFont12, {color: COLORS.white}]}>
              Message
            </Text>
          </View>
        </MyTouchableOpacity>

        <MyTouchableOpacity
          style={[styles.button2, {backgroundColor: COLORS.darkBlueGrey}]}>
          <View>
            <Icon
              name={'delete'}
              type={FONTFAMILY.AntDesign}
              style={{
                color: COLORS.white,
                fontSize: SIZES.twentyFive,
                textAlign: 'center',
              }}
            />
            <Text style={[FONTS.mediumFont12, {color: COLORS.white}]}>
              Cancel
            </Text>
          </View>
        </MyTouchableOpacity>
      </View>
      <ButtonRadius10
        label={'Go to Pick-up'}
        style={{
          position: 'absolute',
          bottom: SIZES.fifteen * 1.2,
          right: SIZES.fifteen,
          left: SIZES.fifteen,
        }}
        onPress={() => props.navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: SIZES.fifty * 0.7,
    width: SIZES.fifty * 0.7,
    borderRadius: SIZES.fifty * 0.75,
    borderWidth: 1,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.fifteen,
    flex: 1,
    borderRadius: SIZES.ten,
  },
  image: {
    height: SIZES.fifty * 0.7,
    width: SIZES.fifty * 0.7,
    borderRadius: SIZES.fifty * 0.75,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: COLORS.brownGrey,
  },
});

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import MyTouchableOpacity from '../MyTouchableOpacity';
import {COLORS, FONTFAMILY, IMAGES, SIZES, STYLES} from '../../constants';
import Row from './../Row';

export default function RideCompleteModal(props) {
  const [dismiss, setDismiss] = React.useState();

  return (
    <View>
      <Modal
        isVisible={dismiss === false ? dismiss : props.isVisible}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: SIZES.ten,
            borderRadius: SIZES.ten,
            borderWidth: 0.5,
            borderColor: COLORS.primary,
          }}>
          <MyTouchableOpacity
            onPress={() => {
              setDismiss(false);
            }}
            style={{
              alignSelf: 'baseline',
              position: 'absolute',
              end: SIZES.ten,
              top: SIZES.five,
            }}>
            <Icon
              type={FONTFAMILY.Ionicons}
              name={'close'}
              style={{fontSize: SIZES.twenty}}
            />
          </MyTouchableOpacity>
          <Text
            style={[
              STYLES.boldText,
              {
                color: COLORS.black,
                marginTop: SIZES.five,
                textAlign: 'center',
                marginBottom: SIZES.twenty,
                fontSize: SIZES.fifteen + 1,
              },
            ]}>
            Ride Complete
          </Text>
          <Text
            style={[
              STYLES.lightText,
              {textAlign: 'auto', marginVertical: SIZES.ten},
            ]}>
            You’ve reached to the destination, please give rating and review to
            the driver
          </Text>
          <Row
            style={{
              marginHorizontal: SIZES.ten,
              marginVertical: SIZES.fifteen,
              justifyContent: 'space-between',
            }}>
            <MyTouchableOpacity
              style={{
                borderRadius: SIZES.fifty,
                padding: SIZES.ten,
                backgroundColor: COLORS.whitishGrey,
              }}>
              <Text style={[STYLES.mediumText, {textAlign: 'center'}]}>
                No, Thanks
              </Text>
            </MyTouchableOpacity>

            <MyTouchableOpacity
              style={{
                borderRadius: SIZES.fifty,
                flex: 1,
                padding: SIZES.ten,
                backgroundColor: COLORS.primary,
              }}>
              <Text style={[STYLES.mediumText, {textAlign: 'center'}]}>
                Rate & Review
              </Text>
            </MyTouchableOpacity>
          </Row>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});

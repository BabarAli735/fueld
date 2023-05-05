import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';
import MessageEditText from '../../components/MessageEditText';
import StarRating from 'react-native-star-rating';
import CircularImage from '../../components/CircularImage';
import {COLORS, FONTFAMILY, IMAGES, SIZES, STYLES} from '../../constants';

export default function ThankyouModal(props) {
  const [starCount, setStarCount] = React.useState(0);
  const [dismiss, setDismiss] = React.useState(true);

  return (
    <View>
      <Modal
        isVisible={dismiss}
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
            position: 'absolute',
            top: SIZES.twentyFive * 5,
          }}>
          <MyTouchableOpacity
            onPress={() => {
              setDismiss(false);
              //   alert('test');
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
                textAlign: 'center',
                marginVertical: SIZES.twenty,
              },
            ]}>
            You will be notified when Driver confirms your Booking.
          </Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});

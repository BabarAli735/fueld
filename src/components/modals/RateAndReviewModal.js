import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';
import MessageEditText from '../../components/MessageEditText';
import StarRating from 'react-native-star-rating';
import CircularImage from '../../components/CircularImage';
import {COLORS, FONTFAMILY, IMAGES, SIZES, STYLES} from '../../constants';

export default function RateAndReviewModal(props) {
  const [starCount, setStarCount] = React.useState(0);
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
            padding: SIZES.fifty,
            borderRadius: SIZES.fifty,
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
              end: SIZES.fifty,
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
                marginBottom: SIZES.twenty + 10,
              },
            ]}>
            Rate & Review
          </Text>
          <CircularImage
            image={IMAGES.User}
            style={{
              backgroundColor: 'red',
              height: SIZES.fifty + 30,
              width: SIZES.fifty + 30,
              marginBottom: SIZES.twenty,
            }}
          />
          <Text style={[STYLES.lightText, {textAlign: 'center'}]}>
            How was your trip with
          </Text>
          <Text style={[STYLES.mediumText, {textAlign: 'center'}]}>
            Frank Lucas?
          </Text>
          <StarRating
            disabled={false}
            animation={'rotate'}
            emptyStar={IMAGES.StarUnfilled}
            fullStar={IMAGES.StarFilled}
            maxStars={5}
            halfStarEnabled={false}
            rating={starCount}
            starSize={35}
            containerStyle={{
              width: '80%',
              marginVertical: SIZES.twenty + 10,
              alignSelf: 'center',
            }}
            selectedStar={rating => setStarCount(rating)}
          />

          <View style={{marginVertical: SIZES.twenty}}>
            <MessageEditText placeholder="Write a message" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}>
            <MyTouchableOpacity
              onPress={() => {
                setDismiss(false);
              }}
              style={{
                padding: SIZES.fifty,
                width: SIZES.fifty0,
                alignItems: 'center',
                borderRadius: SIZES.twenty + 10,
                backgroundColor: COLORS.primary,
                marginVertical: SIZES.fifty,
              }}>
              <Text
                style={[
                  STYLES.mediumText,
                  {
                    color: COLORS.white,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  },
                ]}>
                Send
              </Text>
            </MyTouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});

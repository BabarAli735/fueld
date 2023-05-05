import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import linearGradient from 'react-native-linear-gradient';
import {COLORS, FONTFAMILY, STYLES, SIZES, width} from '../constants';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

const NotificationsComponant = props => {
  const [cardshadow, setcardshadow] = useState(true);

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <LinearGradient
        colors={[COLORS.primary1, COLORS.secondary]}
        style={styles.deletButton}>
        <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.7}>
          <Icon
            type={FONTFAMILY.Ionicons}
            name="ios-trash-outline"
            style={{color: COLORS.white, alignSelf: 'center', fontSize: 20}}
          />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  return (
    <View>
      <Swipeable
        renderRightActions={leftSwipe}
        childrenContainerStyle={{
          // width: '100%',
          padding: SIZES.ten,
        }}
        containerStyle={{
          position: 'relative',
          overflow: 'scroll',
          backgroundColor: COLORS.darkSecondary,
          width: '95%',
        }}
        onSwipeableWillClose={() => {
          setcardshadow(true);
        }}
        onSwipeableRightWillOpen={() => {
          setcardshadow(false);
        }}>
        <View style={[cardshadow ? styles.card : styles.shadow, {}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/* <CircularImage
              style={{
                height: width * 0.1,
                width: width * 0.1,
                borderRadius: SIZES.twentyFive,
              }}
            /> */}
            <View
              style={{
                height: SIZES.twenty * 3,
                width: SIZES.twenty * 3,
                borderRadius: SIZES.twenty * 3,
                backgroundColor: COLORS.secondary,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type={FONTFAMILY.MaterialIcons}
                name="check"
                style={{color: COLORS.white, alignSelf: 'center', fontSize: 20}}
              />
            </View>
            <View style={{flex: 1, marginStart: SIZES.ten}}>
              <Text style={{fontSize: SIZES.body18}}> {props.data.name}</Text>
              <Text style={{fontSize: SIZES.body14, color: COLORS.brownGrey}}>
                {' '}
                {props.data.dayAgo}
              </Text>
            </View>
          </View>
        </View>
      </Swipeable>
      <View style={STYLES.horLine} />
    </View>
  );
};

export default NotificationsComponant;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // flex: 1,
    padding: SIZES.ten,
    backgroundColor: COLORS.darkSecondary,
    width: width,
  },
  shadow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.ten,
    // opacity: 0.5,
    backgroundColor: COLORS.darkSecondary,
    width: width,
  },
  deletButton: {
    paddingHorizontal: SIZES.twenty,
    marginVertical: SIZES.twenty,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: SIZES.fifteen,
    borderTopLeftRadius: SIZES.fifteen,
    backgroundColor: COLORS.secondary,
  },
});

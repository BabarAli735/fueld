import React, {useState} from 'react';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {COLORS, FONTFAMILY, FONTS, SIZES} from '../../constants';
import ButtonRadius10 from '../ButtonRadius10';
import {IMAGES} from './../../constants/theme';

export default function SuggestedRides(props) {
  const [destinationItem, setdestinationItem] = useState(FavData);

  //   console.log('kuch bhiiiiii', ' ', props.visibility);

  //  Methood on Selecting Destination Vehicle
  const onClickDestinationItem = (id, type) => {
    let newArray = destinationItem.map((val, i) => {
      if (id === val.id) {
        return {...val, isSelected: type};
      } else {
        return {...val, isSelected: false};
      }
    });
    setdestinationItem(newArray);
  };

  //************rendor Suggested Rides List ************/
  const renderSuggestedRides = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: SIZES.ten,
          flexDirection: 'row',
          backgroundColor: item.isSelected ? COLORS.primary1 : COLORS.brownGrey,
          padding: SIZES.five,
          marginTop: SIZES.ten,
        }}
        activeOpacity={0.7}
        onPress={() => onClickDestinationItem(item.id, !item.isSelected)}>
        <View style={{flex: 0.5}}>
          <Text
            style={[
              FONTS.mediumFont16,
              {color: item.isSelected ? COLORS.white : COLORS.BLACK},
            ]}>
            Jubergo
          </Text>
          <Text
            style={[
              FONTS.mediumFont12,
              {color: item.isSelected ? COLORS.BLACK : COLORS.primary1},
            ]}>
            Best Save
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: SIZES.ten,
            }}>
            <Text
              style={[
                FONTS.mediumFont14,
                {color: item.isSelected ? COLORS.white : COLORS.brownGrey2},
              ]}>
              US$250.00
            </Text>
            <View
              style={{flexDirection: 'row', paddingRight: SIZES.twentyFive}}>
              <Icon
                name={'time-outline'}
                type={FONTFAMILY.Ionicons}
                style={{
                  fontSize: SIZES.twenty,
                  color: item.isSelected ? COLORS.white : COLORS.brownGrey2,
                }}
              />
              <Text
                style={[
                  FONTS.lightFont10,
                  {
                    color: item.isSelected ? COLORS.white : COLORS.brownGrey2,
                    marginStart: SIZES.five,
                  },
                ]}>
                1-4 min
              </Text>
            </View>
          </View>
        </View>
        <Image
          source={IMAGES.car1}
          style={{
            flex: 0.5,
          }}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    );
  };
  //************rendorBottomSheet ************/
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
          Suggested Rides{' '}
        </Text>
        <View style={{height: SIZES.twentyFive * 19}}>
          <FlatList
            data={destinationItem}
            renderItem={renderSuggestedRides}
            keyExtractor={Item => Item.id}
            contentContainerStyle={{
              paddingBottom: SIZES.twentyFive,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            width: '30%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: SIZES.ten,
            alignSelf: 'flex-end',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
            // marginTop: SIZES.twenty,
          }}>
          <Text style={[FONTS.mediumFont16, {color: COLORS.BLACK}]}>Promo</Text>

          <Text style={[FONTS.mediumFont14, {color: COLORS.brownGrey}]}>|</Text>
          <Icon
            name={'calendar'}
            type={FONTFAMILY.Feather}
            style={{fontSize: SIZES.twenty, color: COLORS.BLACK}}
          />
          <Text style={[FONTS.mediumFont14, {color: COLORS.brownGrey}]}>|</Text>
          <Icon
            name={'pencil'}
            type={FONTFAMILY.SimpleLineIcons}
            style={{fontSize: SIZES.twenty, color: COLORS.BLACK}}
          />
        </View>
        <ButtonRadius10
          label={'Book Now'}
          style={{marginTop: SIZES.twenty, marginBottom: SIZES.ten}}
          onPress={() => {
            props.setVisibility(false);
          }}
        />
      </View>
    );
  };

  return (
    <Modal isVisible={props.visibility} style={styles.modal} propagateSwipe>
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
const FavData = [
  {
    id: 1,
    title: 'Home',
    icon: 'ios-home-outline',
    isSelected: false,
  },
  {
    id: 2,
    title: 'Work',
    icon: 'briefcase-outline',
    isSelected: false,
  },
  {
    id: 3,
    title: 'Other',
    icon: 'md-location-outline',
    isSelected: false,
  },
];

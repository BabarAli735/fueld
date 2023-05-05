import React, {useState} from 'react';
import {Icon, CheckBox} from 'native-base';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {COLORS, FONTFAMILY, FONTS, SIZES} from '../../constants';
import ButtonRadius10 from '../ButtonRadius10';
import DatePicker from 'react-native-date-picker';
import moment, {min} from 'moment';

export default function PickUpTime(props) {
  //   console.log('kuch bhiiiiii', ' ', props.visibility);
  //  const onDateChange=text => {
  //     console.log('=====', moment(text).format('mm'));
  //     let time = moment(text).format('HH:mm');
  //     settime(time);
  //     // setselectedTime(moment(text).format('HH:mm:ss'));
  //   }

  //************rendorBottomSheet */
  const renderBottomSheetContent = () => {
    const [date, setDate] = useState(new Date());
    const [showtext, setshowtext] = useState(false);
    const [time, settime] = useState();
    const [newTime, setminut] = useState();

    // console.log(
    //   'new1 formet ',
    //   moment(newTime.setMinutes(newTime.getMinutes() + 15)).format('hh:mm'),
    // );
    console.log(
      'new time added 15 minutes=====================================>>>>>>',
      newTime,
    );
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
          Pick-up Time
        </Text>
        <Text style={[FONTS.mediumFont14, {color: COLORS.primary1}]}>
          Immediate Pick-Up
        </Text>
        <Text style={[FONTS.lightFont12, {color: COLORS.brownGrey}]}>
          Get a ride in a minute.
        </Text>

        <View
          style={{
            flexDirection: 'row',
            borderRadius: SIZES.ten,
            borderWidth: 1.5,
            borderColor: COLORS.red,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: SIZES.twenty,
            backgroundColor: COLORS.redOpacity,
          }}>
          <View>
            <Text style={[FONTS.mediumFont16, {color: COLORS.red}]}>
              Schedule Ride
            </Text>
            <Text style={[FONTS.mediumFont12, {color: COLORS.red}]}>
              Schedule your ride in 15 minutes.
            </Text>
          </View>

          <CheckBox
            color={COLORS.red}
            checked={true}
            style={{marginRight: SIZES.ten}}
          />
        </View>

        <DatePicker
          //   minimumDate={new Date()}
          fadeToColor="none"
          androidVariant="iosClone" // “iosClone” & “nativeAndroid”
          mode="datetime"
          date={date}
          onDateChange={text => {
            setDate(text);
            // console.log(
            //   'text====================>>>>>>>',
            //   moment(text).add(15, 'm').format('hh:mm:ss'),
            // );
            // let mtext = text;
            setminut(moment(text).add(15, 'm').format('hh:mm A'));
            settime(moment(text).format('hh:mm A'));
            setshowtext(true);
          }}
        />
        {showtext ? (
          <Text
            style={
              ([FONTS.mediumFont12],
              {alignSelf: 'center', marginTop: SIZES.twenty})
            }>
            Driver may arrive between{' '}
            <Text style={[FONTS.boldFont16]}>
              {time} - {newTime}
            </Text>
          </Text>
        ) : null}
        <ButtonRadius10
          label={'Set Pick-up Time'}
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

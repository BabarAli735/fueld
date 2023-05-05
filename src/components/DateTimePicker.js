import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, height, SIZES, width} from '../constants';

// import this library before you use this component
import DatePicker from 'react-native-date-picker';

export default function DateTimePicker(props) {
  const OnChangeDate = value => {
    props.onChangeValue(value);
  };

  return (
    <View style={styles.container}>
      <DatePicker
        fadeToColor="none"
        androidVariant="iosClone" // "iosClone" & "nativeAndroid"
        date={props.value}
        onDateChange={text => {
          OnChangeDate(text);
        }}
        mode={props.mode}
        locale="en"
        textColor={COLORS.primary}
        style={styles.datepicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  datepicker: {
    backgroundColor: COLORS.secondary,
    height: height * 0.2,
    width: width - SIZES.twenty * SIZES.five,
    marginVertical: SIZES.five,
  },
});

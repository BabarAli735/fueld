import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {COLORS, SIZES} from '../constants';

export default function Dot(props) {
  return (
    <Avatar.Text
      size={props.size}
      label=" "
      style={[styles.dot, {backgroundColor: props.color}]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: COLORS.primary,
    marginVertical: SIZES.five - 1,
  },
});

import React, {useState} from 'react';
import {
  Dimensions,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {COLORS, FONTFAMILY, SIZES} from '../constants';
import {Icon} from 'native-base';
const {width, height} = Dimensions.get('window');

export function MultiDropdownPicker(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Icon type={props.iconType} name={props.icon} style={styles.icon} />

      <View>
        <Text
          style={{
            fontSize: SIZES.h18,
            fontFamily: FONTFAMILY.Medium,
            marginLeft: SIZES.twentyFive * 2,
          }}>
          {props.value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.five,
    backgroundColor: COLORS.veryLightPink,
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: SIZES.fifteen,
    paddingVertical: SIZES.five,
    margin: 2,
    flex: 1,
    marginHorizontal: SIZES.twenty,
  },
  icon: {
    color: COLORS.grey,
    fontSize: SIZES.twentyFive,
    fontSize: SIZES.h24,
  },
});

import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  COLORS,
  IMAGES,
  width,
  height,
  FONTS,
  SIZES,
  FONTFAMILY,
} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';

const CloseScreenHeader = props => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{}}
        onPress={() => navigation.goBack()}>
        <Icon
          type={FONTFAMILY.Ionicons}
          name={'close'}
          style={{
            fontSize: SIZES.twenty * 2,
            color: COLORS.white,
          }}
        />
      </TouchableOpacity>
      <Text style={[FONTS.boldFont22, {color: COLORS.white}]}>
        {props.title}
      </Text>
    </View>
  );
};

export default CloseScreenHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: SIZES.ten,
  },
});

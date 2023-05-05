import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY, SIZES} from '../constants';

export default function MessageEditText(props) {
  const [borderColor, setBorderColor] = React.useState(COLORS.brownGrey);
  const [secureText, setsecureText] = React.useState(true);
  const [eye, seteye] = React.useState('eye-off');

  const {value, onChangeText, placeholder} = props;
  return (
    <View
      style={[
        styles.card,
        props.style,
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: borderColor,
          borderWidth: 1.5,
          borderRadius: SIZES.ten,
          paddingHorizontal: SIZES.ten,
        },
      ]}>
      <TextInput
        secureTextEntry={false}
        placeholderTextColor={COLORS.brownGrey}
        autoCapitalize="none"
        blurOnSubmit={true}
        onFocus={() => setBorderColor(COLORS.turqoisehh)}
        onBlur={() => setBorderColor(COLORS.brownGrey)}
        selectionColor={COLORS.turqoisehh}
        placeholder={placeholder}
        keyboardType={'default'}
        value={value}
        onChangeText={onChangeText}
        style={[styles.textInput]}
        multiline={true}
        numberOfLines={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: SIZES.ten * 17,
    fontSize: SIZES.fifteen * 1.2,
    flex: 1,
    width: SIZES.ten,
    color: COLORS.black,
    textAlignVertical: 'top',
    fontFamily: FONTFAMILY.Medium,
  },
  iconPassword: {
    fontSize: SIZES.twenty,
    height: SIZES.twenty,
    width: SIZES.twenty,
    color: COLORS.darkBlueGrey,
  },
});

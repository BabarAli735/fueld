import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {COLORS} from '../constants';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import {
  FONTFAMILY,
  FONTS,
  height,
  SIZES,
  STYLES,
  width,
} from '../constants/theme';
import {Icon} from 'native-base';

export default function EditText(props) {
  const [borderColor, setBorderColor] = useState(COLORS.transparent);
  const [show, setshow] = useState('eye');
  const [showText, setShowText] = useState(true);

  const passwordShow = () => {
    if (show === 'eye') {
      setshow('eye-slash');
      setShowText(false);
    } else {
      setShowText(true);
      setshow('eye');
    }
  };

  return (
    <View
      style={[
        {
          width: '100%',
          marginVertical: SIZES.five,
        },
        props.style,
      ]}>
      <View>
        <Text
          style={[
            FONTS.mediumFont14,
            {
              color:
                borderColor === COLORS.transparent
                  ? COLORS.mushroom
                  : borderColor,
            },
          ]}>
          {props.placeholder}
        </Text>
        <View
          style={{
            height: 60,
            borderWidth: 1,
            marginTop: SIZES.ten,
            paddingHorizontal: SIZES.ten,
            borderRadius: SIZES.ten,
            backgroundColor: COLORS.iceBlue,
            borderColor: borderColor,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {props.hasIcon ? (
              <Icon
                type={props.type}
                name={props.name}
                style={{
                  color: COLORS.primary,
                  fontSize: SIZES.twentyFive,
                }}
              />
            ) : null}
            <TextInput
              ref={props.ref}
              {...props}
              secureTextEntry={props.password ? showText : false}
              selectionColor={COLORS.primary}
              placeholderTextColor={COLORS.mushroom}
              onFocus={() => {
                setBorderColor(COLORS.primary);
              }}
              onBlur={() => {
                setBorderColor(COLORS.transparent);
              }}
              style={[
                FONTS.mediumFont14,
                {
                  flex: 1,
                  height: 50,
                  color: COLORS.primary,
                  marginHorizontal: SIZES.five / 2,
                  paddingHorizontal: SIZES.five / 2,
                },
              ]}
            />
          </View>
          {props.password ? (
            <MyTouchableOpacity
              onPress={() => {
                passwordShow();
              }}>
              <Icon
                name={show}
                type={'FontAwesome'}
                style={{
                  fontSize: SIZES.twentyFive,
                  color: COLORS.mushroom,
                }}
              />
            </MyTouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}

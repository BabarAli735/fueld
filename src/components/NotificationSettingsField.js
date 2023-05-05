import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants';
import {
  FONTFAMILY,
  FONTS,
  height,
  SIZES,
  STYLES,
  width,
} from '../constants/theme';
import {Icon} from 'native-base';
import {Switch} from 'react-native-paper';

export default function NotificationSettingsField(props) {
  const [borderColor, setBorderColor] = useState(COLORS.blackWithOpacity);
  const [show, setshow] = useState('eye');
  const [showText, setShowText] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <TouchableOpacity
      style={[
        {
          width: '100%',
          justifyContent: 'space-between',
          borderWidth: 1,
          height: 60,
          borderRadius: SIZES.ten,
          borderColor: borderColor,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: SIZES.fifteen,
        },
        props.style,
      ]}
      activeOpacity={0.7}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          type={props.Icontype}
          name={props.Iconname}
          style={{
            color: borderColor,
            fontSize: SIZES.twentyFive,
          }}
        />
        <Text
          style={[
            FONTS.mediumFont16,
            {marginStart: SIZES.ten, color: COLORS.brownGrey},
          ]}>
          {props.title}
        </Text>
      </View>

      <Switch
        value={isSwitchOn}
        onValueChange={onToggleSwitch}
        thumbColor={COLORS.primary1}
        trackColor={{false: COLORS.brownGrey, true: COLORS.brownGrey}}
      />
    </TouchableOpacity>
  );
}

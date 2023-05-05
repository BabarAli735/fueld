import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {COLORS, FONTFAMILY, SIZES, STYLES} from '../constants';
import BackArrow from './BackArrow';
import Card from './Card';
import DrawerArrow from './DrawerArrow';
import Row from './Row';
import {Icon} from 'native-base';
import MyTouchableOpacity from './MyTouchableOpacity';

const HeaderOne = ({
  props,
  title,
  isDrawer = false,
  rightIcon = '',
  rightIconOnPress,
  iconType,
}) => {
  return (
    <Row
      style={{
        alignItems: 'center',
      }}>
      <View style={{start: SIZES.twenty}}>
        {isDrawer ? <DrawerArrow /> : <BackArrow />}
      </View>
      <Text
        style={[
          {
            fontSize: SIZES.twenty,
            fontFamily: FONTFAMILY.Bold,
            marginLeft: SIZES.twentyFive + 10,
          },
        ]}>
        {title}
      </Text>
      <View style={{position: 'absolute', right: SIZES.twenty}}>
        {rightIcon === '' ? null : (
          <Card style={[styles.circularBG]}>
            <MyTouchableOpacity onPress={rightIconOnPress}>
              <Icon
                type={iconType ? iconType : FONTFAMILY.Ionicons}
                name={rightIcon}
                style={{
                  color: COLORS.primary,
                  fontSize: SIZES.twentyFive,
                }}
              />
            </MyTouchableOpacity>
          </Card>
        )}
      </View>
    </Row>
  );
};

export default HeaderOne;

const styles = StyleSheet.create({
  circularBG: {
    padding: SIZES.ten,
    borderRadius: SIZES.fifty,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

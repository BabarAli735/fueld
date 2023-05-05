import React from 'react';
import {Icon} from 'native-base';
import {StyleSheet} from 'react-native';
import Card from './Card';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, FONTFAMILY, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';

export default function DrawerArrow(props) {
  const navigation = useNavigation();

  return (
    <Card style={[styles.circularBG, props.style]}>
      <MyTouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <Icon
          type={FONTFAMILY.Ionicons}
          name="ios-menu-sharp"
          style={{
            color: COLORS.black,
            fontSize: SIZES.twentyFive,
          }}
        />
      </MyTouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  circularBG: {
    padding: SIZES.ten,
    borderRadius: SIZES.fifty,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

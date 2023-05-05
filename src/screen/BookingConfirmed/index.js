import {Icon} from 'native-base';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import ButtonRadius10 from '../../components/ButtonRadius10';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
} from '../../constants';

// Redux import Here
import * as OrderConfirm from '../../Store/Action/OrderConfirm';
import {useDispatch, useSelector} from 'react-redux';

export default function index(props) {
  const {orderId} = props.route.params;

  const dispatcher = useDispatch();

  useEffect(() => {
    OrderConfim();
  }, []);

  const OrderConfim = async () => {
    await dispatcher(
      OrderConfirm.OrderConfirm(orderId, response => {
        console.log(response);
      }),
    );
  };

  return (
    <View
      style={[
        STYLES.container,
        {
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: SIZES.fifteen,
        },
      ]}>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle={'dark-content'} /> */}

      <View
        style={{
          backgroundColor: COLORS.turqoise,
          padding: SIZES.twenty,
          borderRadius: SIZES.twenty * 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          name={'md-checkmark-sharp'}
          type={FONTFAMILY.Ionicons}
          style={{
            color: COLORS.white,

            fontSize: SIZES.twenty * 4,
          }}
        />
      </View>
      <Text style={[FONTS.mediumFont18, {marginVertical: SIZES.twenty}]}>
        Booking Confirmed
      </Text>
      <Text
        style={[
          FONTS.mediumFont14,
          {color: COLORS.brownGrey, textAlign: 'center'},
        ]}>
        Thank You for using Fueld.
      </Text>
      <ButtonRadius10
        label={'Next'}
        style={{marginTop: SIZES.twenty * 8}}
        onPress={() => {
          props.navigation.replace(SCREENS.Order_Tracking);
          // OrderConfim();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

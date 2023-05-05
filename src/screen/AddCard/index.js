import React, {useEffect, useState} from 'react';
import {FlatList, Image} from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import HeaderOne from '../../components/HeaderCenterText';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  SIZES,
  STYLES,
  width,
  CONSTANTS,
  SCREENS,
  height,
} from '../../constants';
import {CreditCardInput} from '../../components/StripCardComponent';
import ButtonRadius10 from '../../components/ButtonRadius10';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';

import {useDispatch, useSelector} from 'react-redux';

import {Secret_key, STRIPE_PUBLISHABLE_KEY} from '../../../Keys';
import Axios from '../../network';
import moment from 'moment';
import utils from '../../utils';
import Loader from '../../components/Loader';
import ErrorView from '../../components/modals/ErrorView';
import EditText from '../../components/EditText';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';

function getCreditCardToken(creditCardData) {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc,
    'card[name]': creditCardData.values.name,
  };

  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },

    // Use a proper HTTP method
    method: 'post',

    // Format the credit card data to a string of key-value pairs
    // divided by &

    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&'),
  })
    .then(response => response.json())
    .then(res => {
      // console.log('Response getCreditCardToken ------->', res);
      return {res, mcard: card};
    })
    .catch(error => console.log('getCreditCardToken', error));
}

export default function AddCard({navigation, route}) {
  const {data, quantity, date} = route.params;

  const Auth = useSelector(state => state.Auth.AccessToken);
  const SAVEDCARD = useSelector(state => state.Cards.SavedCards);

  const [CardInput, setCardInput] = React.useState({});
  const [selectedCard, setselectedCard] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [vehicleModalVisibility, setVehicleModalVisibility] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');

  // useEffect to show error modal which depends on errorMsg
  useEffect(() => {
    if (errorMsg !== '') {
      setErrorVisibility(true);
    }
  }, [errorMsg]);

  const CheckSelected = () => {
    setisLoading(true);
    if (selectedCard) {
      Oderbooking(selectedCard);
    } else {
      onSubmit();
    }
  };

  const onSubmit = async () => {
    if (CardInput.valid == false || typeof CardInput.valid == 'undefined') {
      alert('Invalid Credit Card');
      setisLoading(false);
      return false;
    }
    // setisLoading(true);

    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(CardInput);
      console.log('creditCardToken', creditCardToken);

      if (creditCardToken.error) {
        alert('creditCardToken error');
        setisLoading(false);
        return;
      }
    } catch (e) {
      console.log('e', e);
      setisLoading(false);
      return;
    }
    // setisLoading(false);

    saveCardOnServer(creditCardToken);
  };

  const saveCardOnServer = card => {
    let config = {
      headers: {
        Authorization: Auth,
      },
    };

    let body = {
      cardholder_name: card.mcard['card[name]'],
      card_number: card.mcard['card[number]'],
      expiry_date: `${card.mcard['card[exp_month]']}/${card.mcard['card[exp_year]']}`,
      cvv: card.mcard['card[cvc]'],
      stripe_token: card.res.id,
    };

    const onSuccess = ({data}) => {
      setisLoading(false);

      Oderbooking(data.data.id);
    };

    const onFailure = error => {
      setisLoading(false);

      let errorMsg = utils.showResponseError(error);
      setErrorMsg(errorMsg);
    };
    Axios.post(
      `${CONSTANTS.API_CALLS.BASE_URL}${CONSTANTS.API_CALLS.ADD_CARD}`,
      body,
      config,
    )
      .then(onSuccess)
      .catch(onFailure);
  };

  const Oderbooking = id => {
    let OederNow = {
      fuel_id: data.SelectedItem.id,
      type: data.OrderType,
      quantity: quantity,
      latitude: data.Coordinates.latitude,
      longitude: data.Coordinates.longitude,
      location: data.Coordinates.placeName,
      card_id: id,
      vehicle_number: vehicleNo,
    };

    let ScheduleOrder = {
      fuel_id: data.SelectedItem.id,
      date: moment(date).format('YYYY:MM:DD'),
      time: moment(date).format('hh:mm:ss'),
      type: data.OrderType,
      quantity: quantity,
      latitude: data.Coordinates.latitude,
      longitude: data.Coordinates.longitude,
      location: data.Coordinates.placeName,
      card_id: id,
      vehicle_number: vehicleNo,
    };

    let postData =
      data.OrderType === CONSTANTS.DESINATIONS.ORDER_NOW
        ? OederNow
        : ScheduleOrder;

    let config = {
      headers: {
        Authorization: Auth,
      },
    };

    const onSuccess = ({data}) => {
      setisLoading(false);

      setTimeout(() => {
        navigation.replace(SCREENS.Booking_Confirm, {
          orderId: data.data.id,
        });
      }, 200);
    };

    const onFailure = error => {
      setisLoading(false);

      let errorMsg = utils.showResponseError(error);
      setErrorMsg(errorMsg);
    };

    Axios.post(CONSTANTS.API_CALLS.PLACE_ORDER, postData, config)
      .then(onSuccess)
      .catch(onFailure);
  };

  const _onChange = data => {
    setCardInput(data);
  };

  // Card List Components
  const rendorCard = ({item, index}) => {
    // console.log('========>', item.status);
    return (
      <View>
        {item.id === selectedCard ? (
          <Icon
            type={FONTFAMILY.AntDesign}
            name="checkcircle"
            style={{
              alignSelf: 'flex-end',
              color: index % 2 == 0 ? COLORS.turqoise : COLORS.primary,
              position: 'absolute',
              top: 3,
              right: SIZES.twenty,
              zIndex: 1111,
              fontSize: SIZES.twenty * 1.2,
            }}
          />
        ) : null}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setselectedCard(item.id);
          }}
          style={{
            backgroundColor: index % 2 == 0 ? COLORS.primary : COLORS.turqoise,
            height: width * 0.35,
            width: width * 0.6,
            borderRadius: SIZES.ten,
            marginHorizontal: SIZES.ten,
            overflow: 'hidden',
            marginTop: SIZES.twenty,
            justifyContent: 'space-evenly',
            paddingHorizontal: SIZES.fifteen,
          }}>
          <Text style={{color: COLORS.white}}>
            **** **** **** {item.card_number}
            {/* {item.cardno.replace(/\d(?=\d{4})/g, '*')} */}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={[FONTS.mediumFont10, {color: COLORS.white}]}>
                Expiry
              </Text>
              <Text style={[FONTS.mediumFont10, {color: COLORS.brownGrey}]}>
                {item.expiry_date}
              </Text>
            </View>

            <View>
              <Text style={[FONTS.mediumFont10, {color: COLORS.white}]}>
                cvc
              </Text>
              <Text style={[FONTS.mediumFont10, {color: COLORS.brownGrey}]}>
                ***
              </Text>
            </View>
          </View>
          <View>
            <Text style={[FONTS.mediumFont10, {color: COLORS.white}]}>
              Card Holder Name
            </Text>
            <Text style={[FONTS.mediumFont10, {color: COLORS.brownGrey}]}>
              {item.cardholder_name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={STYLES.container}>
      <HeaderOne title="Add Card" style={{marginHorizontal: SIZES.twenty}} />
      <View>
        <FlatList
          data={SAVEDCARD}
          renderItem={rendorCard}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{flex: 1}}>
        <CreditCardInput
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          validColor="#000"
          placeholderColor="#000"
          requiresName={true}
          onChange={_onChange}
        />
        <ButtonRadius10
          onPress={() => {
            setVehicleModalVisibility(true);
          }}
          label={selectedCard ? 'Pay Now' : 'Add New'}
          style={{marginTop: SIZES.twenty, marginHorizontal: SIZES.fifteen}}
        />
      </View>

      {isLoading ? <Loader /> : null}

      <ErrorView
        visibility={errorVisibility}
        setVisibility={setErrorVisibility}
        setErrorMsg={setErrorMsg}
        msg={errorMsg}
      />

      <Modal
        isVisible={vehicleModalVisibility}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: SIZES.ten,
            borderRadius: SIZES.ten,
          }}>
          <Text
            style={[
              FONTS.boldFont24,
              {
                color: COLORS.black,
                marginTop: SIZES.five,
                textAlign: 'center',
                marginBottom: SIZES.twenty,
              },
            ]}>
            Vehicle Number
          </Text>
          <EditText
            placeholder="Vehicle Number"
            hasIcon
            value={vehicleNo}
            onChangeText={text => setVehicleNo(text)}
            name="car"
            type={FONTFAMILY.AntDesign}
          />
          <View style={{marginTop: SIZES.twenty}}>
            <View
              style={[
                styles.loginBtnBg,
                {
                  backgroundColor: COLORS.primary,
                },
              ]}>
              <MyTouchableOpacity
                onPress={() => {
                  if (utils.isEmptyOrSpaces(vehicleNo)) return;

                  setVehicleModalVisibility(false);
                  setTimeout(() => {
                    CheckSelected();
                  }, 500);
                }}
                style={[
                  styles.loginBtnBg,
                  {
                    justifyContent: 'center',
                  },
                ]}>
                <Text
                  style={[
                    FONTS.boldFont18,
                    {
                      color: COLORS.white,
                      textAlign: 'center',
                    },
                  ]}>
                  OK
                </Text>
              </MyTouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderRadius: 5,
    backgroundColor: 'red',
  },
  inputStyle: {
    // paddingLeft: 15,
    // borderRadius: 5,
    color: '#fff',
    backgroundColor: 'blue',
  },
  labelStyle: {
    // marginBottom: 5,
    fontSize: 12,
  },
  loginBtnBg: {
    paddingLeft: '10%',
    paddingRight: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.ten,
    width: '100%',
    height: height * 0.07,
  },
});

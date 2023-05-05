import React, {useState} from 'react';
import {FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BarChart} from 'react-native-gifted-charts';
import CircularImage from '../../components/CircularImage';
import WalletHeader from '../../components/ProfileHeader';
import OrderHistoryModal from '../../components/modals/OrderHistoryModal';
import OrderDetailsModal from '../../components/modals/OrderDetailsModal';
import Row from '../../components/Row';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SIZES,
  STYLES,
} from '../../constants';
import Card from '../../components/Card';
import {Icon} from 'native-base';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';

export default function Wallet() {
  const [dayData, setDayData] = useState(false);
  const [orderData, setOrderData] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(true);

  const data = [
    {
      value: 70,
      label: 'M',
      labelTextStyle: [
        FONTS.mediumFont14,
        {
          color: COLORS.white,
        },
      ],
      frontColor: COLORS.turqoiseBlue,
      topLabel: 's',
    },
    {
      value: 50,
      label: 'T',
      labelTextStyle: [
        FONTS.mediumFont14,
        {
          color: COLORS.white,
        },
      ],
      frontColor: COLORS.turqoiseBlue,
    },
    {
      value: 90,
      label: 'W',
      labelTextStyle: [
        FONTS.mediumFont14,
        {
          color: COLORS.white,
        },
      ],
      frontColor: COLORS.turqoiseBlue,
    },
    {
      label: 'T',
      value: 60,
      labelTextStyle: [
        FONTS.mediumFont14,
        {
          color: COLORS.white,
        },
      ],
      frontColor: COLORS.turqoiseBlue,
    },
    {
      label: 'F',
      value: 20,
      labelTextStyle: [
        FONTS.mediumFont14,
        {
          color: COLORS.white,
        },
      ],
      frontColor: COLORS.turqoiseBlue,
    },
  ];

  const PaymentHistoryItem = item => {
    return (
      <Row style={{alignItems: 'center', marginVertical: SIZES.five}}>
        <CircularImage
          image={IMAGES.user1}
          style={{height: SIZES.fifty * 0.9, width: SIZES.fifty * 0.9}}
        />
        <View
          style={{
            flex: 1,
            marginHorizontal: SIZES.ten,
          }}>
          <Text style={[FONTS.mediumFont14, {color: COLORS.black}]}>
            Earl Guerrero
          </Text>
          <Text
            style={[
              FONTS.lightFont10,
              {color: COLORS.brownGrey, marginTop: SIZES.ten * 0.8},
            ]}>
            #61121456
          </Text>
        </View>
      </Row>
    );
  };

  return (
    <View style={[STYLES.container, {backgroundColor: COLORS.secondary}]}>
      {/* <StatusBar
        backgroundColor={COLORS.secondary}
        barStyle={'light-content'}
      /> */}
      <WalletHeader title="Dashboard" isBright />
      {!dayData ? (
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          colors={[COLORS.turqoise, COLORS.turqoise]}
          style={{
            backgroundColor: COLORS.secondary,
            padding: SIZES.twentyFive,
            marginHorizontal: SIZES.fifteen,
            borderRadius: SIZES.ten,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <MyTouchableOpacity
              onPress={() => {
                setDayData(false);
              }}>
              <Text
                style={[
                  FONTS.mediumFont16,
                  {
                    color: !dayData ? COLORS.white : COLORS.iceBlue,
                    alignSelf: 'center',
                  },
                ]}>
                Today
              </Text>
              <View
                style={{
                  // flex: 1,
                  width: 100,
                  borderWidth: 1.5,
                  borderColor: !dayData ? COLORS.white : COLORS.turqoise,
                  backgroundColor: !dayData ? COLORS.white : COLORS.turqoise,
                  marginTop: SIZES.five - 3,
                }}
              />
            </MyTouchableOpacity>

            <MyTouchableOpacity
              onPress={() => {
                setDayData(true);
              }}>
              <Text
                style={[
                  FONTS.mediumFont16,
                  {
                    color: dayData ? COLORS.white : COLORS.iceBlue,
                    alignSelf: 'center',
                  },
                ]}>
                Weekly
              </Text>
              <View
                style={{
                  // flex: 1,
                  width: 100,
                  borderWidth: 1.5,
                  borderColor: dayData ? COLORS.white : COLORS.turqoise,
                  backgroundColor: dayData ? COLORS.white : COLORS.turqoise,
                  marginTop: SIZES.five - 3,
                }}
              />
            </MyTouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: SIZES.twentyFive,
            }}>
            <Text style={[FONTS.mediumFont12, {color: COLORS.white}]}>
              TOTAL ORDER DELIVERED
            </Text>
            <Text style={[FONTS.boldFont18, {color: COLORS.white}]}>20</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={[FONTS.mediumFont14, {color: COLORS.iceBlue}]}>
                Online hrs:
              </Text>
              <Text style={[FONTS.boldFont18, {color: COLORS.white}]}>
                8:30
              </Text>
            </View>
            <View>
              <Text style={[FONTS.mediumFont14, {color: COLORS.iceBlue}]}>
                Rating:
              </Text>
              <Text style={[FONTS.boldFont18, {color: COLORS.white}]}>
                4.75
              </Text>
            </View>
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          colors={[COLORS.turqoise, COLORS.turqoise]}
          style={{
            backgroundColor: COLORS.secondary,
            padding: SIZES.twentyFive,
            marginHorizontal: SIZES.fifteen,
            borderRadius: SIZES.ten,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <MyTouchableOpacity
              onPress={() => {
                setDayData(false);
              }}>
              <Text
                style={[
                  FONTS.mediumFont16,
                  {
                    color: !dayData ? COLORS.white : COLORS.iceBlue,
                    alignSelf: 'center',
                  },
                ]}>
                Today
              </Text>
              <View
                style={{
                  // flex: 1,
                  width: 100,
                  borderWidth: 1.5,
                  borderColor: !dayData ? COLORS.white : COLORS.turqoise,
                  backgroundColor: !dayData ? COLORS.white : COLORS.turqoise,
                  marginTop: SIZES.five - 3,
                }}
              />
            </MyTouchableOpacity>

            <MyTouchableOpacity
              onPress={() => {
                setDayData(true);
              }}>
              <Text
                style={[
                  FONTS.mediumFont16,
                  {
                    color: dayData ? COLORS.white : COLORS.iceBlue,
                    alignSelf: 'center',
                  },
                ]}>
                Weekly
              </Text>
              <View
                style={{
                  // flex: 1,
                  width: 100,
                  borderWidth: 1.5,
                  borderColor: dayData ? COLORS.white : COLORS.turqoise,
                  backgroundColor: dayData ? COLORS.white : COLORS.turqoise,
                  marginTop: SIZES.five - 3,
                }}
              />
            </MyTouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: SIZES.twentyFive,
            }}>
            <Text style={[FONTS.mediumFont12, {color: COLORS.white}]}>
              TOTAL ORDER DELIVERED
            </Text>
            <Text style={[FONTS.boldFont18, {color: COLORS.white}]}>20</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <BarChart
              isAnimated
              data={data}
              height={SIZES.twentyFive * 5.5}
              barWidth={
                Platform.OS !== 'ios'
                  ? SIZES.twenty * 2.9
                  : SIZES.twentyFive * 1.9
              }
              hideRules={true}
              activeOpacity={0.7}
              showYAxisIndices={false}
              hideYAxisText
              disableScroll
              yAxisIndicesColor={'transparent'}
              barBorderRadius={SIZES.five * 1.8}
              intactTopLabel={0}
              xAxisThickness={0}
              yAxisThickness={0}
              initialSpacing={
                Platform.OS !== 'ios' ? SIZES.twentyFive : SIZES.five
              }
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.ten,
            }}>
            <View>
              <Text style={[FONTS.mediumFont14, {color: COLORS.iceBlue}]}>
                Online hrs:
              </Text>
              <Text style={[FONTS.boldFont18, {color: COLORS.white}]}>
                8:30
              </Text>
            </View>
            <View>
              <Text style={[FONTS.mediumFont14, {color: COLORS.iceBlue}]}>
                Rating:
              </Text>
              <Text style={[FONTS.boldFont18, {color: COLORS.white}]}>
                4.75
              </Text>
            </View>
          </View>
        </LinearGradient>
      )}

      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.secondary,
          borderTopLeftRadius: SIZES.ten,
          borderTopRightRadius: SIZES.ten,
          padding: SIZES.fifteen,
          paddingBottom: 0,
          marginHorizontal: SIZES.fifteen,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <MyTouchableOpacity
            onPress={() => {
              setOrderData(false);
            }}>
            <Text
              style={[
                FONTS.mediumFont16,
                {
                  color: !orderData ? COLORS.turqoise : COLORS.brownGrey,
                  alignSelf: 'center',
                },
              ]}>
              Order Schedule
            </Text>
            <View
              style={{
                // flex: 1,
                width: '100%',
                borderWidth: 1.5,
                borderColor: !orderData ? COLORS.turqoise : COLORS.secondary,
                backgroundColor: !orderData
                  ? COLORS.turqoise
                  : COLORS.secondary,
                marginTop: SIZES.five - 3,
              }}
            />
          </MyTouchableOpacity>

          <MyTouchableOpacity
            onPress={() => {
              setOrderData(true);
            }}>
            <Text
              style={[
                FONTS.mediumFont16,
                {
                  color: orderData ? COLORS.turqoise : COLORS.brownGrey,
                  alignSelf: 'center',
                },
              ]}>
              Order History
            </Text>
            <View
              style={{
                // flex: 1,
                width: '100%',
                borderWidth: 1.5,
                borderColor: orderData ? COLORS.turqoise : COLORS.secondary,
                backgroundColor: orderData ? COLORS.turqoise : COLORS.secondary,
                marginTop: SIZES.five - 3,
              }}
            />
          </MyTouchableOpacity>
        </View>
        <View style={{height: SIZES.twenty}} />
        <FlatList
          data={PAYMENTS}
          renderItem={PaymentHistoryItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 150}}
        />
      </View>
      <OrderHistoryModal
        visibility={showModal}
        onPress={() => {
          setShowModal(false);
        }}
      />
      <OrderDetailsModal
        visibility={showModal2}
        onPress={() => {
          setShowModal2(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewTotal: {
    flex: 1,
    paddingVertical: SIZES.fifteen,
    borderRadius: SIZES.ten,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const PAYMENTS = [
  {
    id: '0',
  },
  {
    id: '01',
  },
  {
    id: '02',
  },
  {
    id: '03',
  },
  {
    id: '04',
  },
  {
    id: '05',
  },
  {
    id: '06',
  },
  {
    id: '07',
  },
  {
    id: '08',
  },
  {
    id: '09',
  },
  {
    id: '10',
  },
  {
    id: '11',
  },
  {
    id: '12',
  },
  {
    id: '13',
  },
];

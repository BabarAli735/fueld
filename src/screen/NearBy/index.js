import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import {COLORS, FONTFAMILY, STYLES, FONTS, SCREENS} from '../../constants';
import MapView, {PROVIDER_GOOGLE, Circle, Marker} from 'react-native-maps';
import MapTheme from '../home/MapTheme';
import HeaderOne from '../../components/HeaderCenterText';
import Card from '../../components/Card';
import {Icon} from 'native-base';
import {SIZES} from './../../constants/theme';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default function index({navigation}) {
  const [showSearchModal, setshowSearchModal] = useState(false);
  const GooglePlacesInput = props => {
    return (
      <GooglePlacesAutocomplete
        placeholder={'Search'}
        onPress={(data, details = null) => {
          setshowSearchModal(false);
          setTimeout(() => {
            navigation.navigate(SCREENS.Home);
          }, 1000);
        }}
        query={{
          key: 'AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM',
          language: 'en',
        }}
        currentLocation={true}
        // renderRow={renderRow}
        GooglePlacesSearchQuery={{rankby: 'distance'}}
        GooglePlacesDetailsQuery={{fields: ['formatted_address', 'geometry']}}
        renderDescription={row => row.description}
        currentLocationLabel="Current location"
        enablePoweredByContainer={false}
        keepResultsAfterBlur={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        hg
        styles={{
          container: {},

          row: {
            backgroundColor: COLORS.transparent,
          },
          textInputContainer: {
            backgroundColor: COLORS.white,
          },
          textInput: [
            {
              color: COLORS.black,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              flex: 0.8,
              fontFamily: FONTFAMILY.Medium,
              fontSize: SIZES.h16,
              textTransform: 'capitalize',
              marginLeft: SIZES.ten,
            },
          ],
          listView: {
            // marginVertical: SIZES.twenty,
            backgroundColor: COLORS.white,
          },
          separator: {
            borderColor: COLORS.brownGrey,
            borderBottomWidth: 0.8,
            backgroundColor: COLORS.transparent,
          },
          description: {
            backgroundColor: COLORS.transparent,
          },
        }}
      />
    );
  };

  const initRegion = {
    latitude: 64.1608443,
    longitude: 17.3508067,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  return (
    <View style={STYLES.container}>
      <MapView
        zoomEnabled={false}
        maxZoomLevel={15}
        mapType="standard"
        showsUserLocation={false}
        region={initRegion}
        customMapStyle={MapTheme}
        showsMyLocationButton
        onPress={e => {
          // //console.log(e.nativeEvent);
        }}
        style={{
          flex: 1,
          ...StyleSheet.absoluteFill,
        }}></MapView>
      <HeaderOne title={'Near By'} />
      <View></View>
      {/* search Button  */}
      <View
        style={{
          shadowColor: COLORS.black,
          position: 'absolute',
          bottom: SIZES.twenty,
          paddingHorizontal: SIZES.fifteen,
          right: 0,
          left: 0,
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3.0,
          elevation: 5,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: SIZES.fifteen,
            paddingVertical: SIZES.fifteen,
            borderRadius: SIZES.ten,
          }}
          activeOpacity={0.7}
          onPress={() => {
            setshowSearchModal(true);
          }}>
          <Text style={[FONTS.mediumFont14]}>Search</Text>
          <Icon
            type={FONTFAMILY.Ionicons}
            name={'search'}
            style={{
              color: COLORS.black,
              fontSize: SIZES.twenty * 1.2,
            }}
          />
        </TouchableOpacity>
      </View>

      {/*********Google AutoComplete Places Modal Start *********/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSearchModal}
        onRequestClose={() => {
          setshowSearchModal(false);
        }}>
        <View
          style={{
            position: 'absolute',
            top: SIZES.twenty * 3,
            right: 10,
            left: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.white,
            borderRadius: SIZES.ten,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            // backgroundColor: COLORS.white,
          }}>
          {GooglePlacesInput()}
          <TouchableOpacity
            style={{marginTop: SIZES.fifteen, marginLeft: SIZES.five}}
            onPress={() => {
              setshowSearchModal(false);
            }}>
            <Icon
              name={'close'}
              type={FONTFAMILY.AntDesign}
              style={{
                fontSize: SIZES.twentyFive * 1.2,
                paddingRight: SIZES.ten,
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
      {/*********Google AutoComplete Places Modal End *********/}
    </View>
  );
}

const styles = StyleSheet.create({});

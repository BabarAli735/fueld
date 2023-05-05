import axios from 'axios';
import {Icon} from 'native-base';
import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Circle,
  Marker,
  Callout,
  AnimatedRegion,
} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {CONSTANTS, FONTFAMILY, width} from '../../constants';

import {locationPermission, getCurrentLocation} from '../../helper/index';
import Axios from '../../network';
import utils from '../../utils';

export default function DriverTrackingMarker(props) {
  const Auth = useSelector(state => state.Auth.AccessToken);
  const ORDERCONFIRM = useSelector(state => state.OrderConfirm.OrderConfirm);

  const markerRef = React.useRef();

  useEffect(() => {
    let timer = setInterval(() => {
      GetRiderLocation();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [state, setState] = useState({
    curLoc: {
      latitude: 24.90704991804506,
      longitude: 67.07780815207623,
    },
    coordinate: new AnimatedRegion({
      latitude: 24.90704991804506,
      longitude: 67.07780815207623,
      latitudeDelta: 0.2,
      longitudeDelta: 0.1,
    }),
    destinationCords: {},
    isLoading: false,
    time: 0,
    distance: 0,
    heading: 0,
  });

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const GetRiderLocation = () => {
    let confiq = {
      headers: {
        Authorization: Auth,
      },
      params: {
        rider_id: ORDERCONFIRM.rider.id,
      },
    };
    const onSuccess = ({data}) => {
      console.log('GetRiderLocation ========== >>>>', data);

      let latitude = Number(data.data.latitude);
      let longitude = Number(data.data.longitude);
      const coords = {
        latitude: data.data.latitude,
        longitude: data.data.longitude,
      };
      props.onChange(coords);
      animate(latitude, longitude);
      updateState({
        curLoc: {latitude, longitude},
      });
    };

    const onFailure = error => {
      let errorMsg = utils.showResponseError(error);
      console.log('Location error', error);
    };

    axios
      .get(
        `${CONSTANTS.API_CALLS.BASE_URL}${CONSTANTS.API_CALLS.Get_RiDE_Location}`,
        {
          headers: {
            Authorization: Auth,
          },
          params: {
            rider_id: ORDERCONFIRM.rider.id,
          },
        },
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const updateState = data => setState(state => ({...state, ...data}));

  const onCenter = () => {
    const newCoordinate = {latitude, longitude};
    mapRef.current.animateToRegion({
      ...newCoordinate,
      latitudeDelta: 0.2,
      longitudeDelta: 0.1,
    });
  };

  const {
    curLoc,
    time,
    distance,
    destinationCords,
    isLoading,
    coordinate,
    heading,
  } = state;
  return (
    <Marker.Animated pinColor={'red'} ref={markerRef} coordinate={coordinate}>
      <Icon name={'tanker-truck'} type={FONTFAMILY.MaterialCommunityIcons} />
    </Marker.Animated>
  );
}

const styles = StyleSheet.create({});

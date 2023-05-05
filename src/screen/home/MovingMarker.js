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
import CircularImage from '../../components/CircularImage';
import {CONSTANTS, height, width} from '../../constants';

import {locationPermission, getCurrentLocation} from '../../helper/index';

export default function MovingMarker() {
  const UserProfile = useSelector(state => state.Profile.UserProfile);

  useEffect(() => {
    getLiveLocation();
  }, []);

  const markerRef = React.useRef();

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
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    destinationCords: {},
    isLoading: false,
    time: 0,
    distance: 0,
    heading: 0,
  });

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();

      animate(latitude, longitude);
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
      });
    }
  };

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

  const updateState = data => setState(state => ({...state, ...data}));

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
    <Marker.Animated ref={markerRef} coordinate={coordinate}>
      <View
        style={{
          width: width * 0.1,
          height: width * 0.1,
          borderRadius: width,
          overflow: 'hidden',
          backgroundColor: 'red',
        }}>
        <Image
          source={{uri: `${CONSTANTS.ImageBaseUrl}${UserProfile.image}`}}
          resizeMode="cover"
          style={{height: '100%', width: '100%'}}
        />
      </View>
    </Marker.Animated>
  );
}

const styles = StyleSheet.create({});

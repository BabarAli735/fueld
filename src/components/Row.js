import React from 'react';
import {View} from 'react-native';

const Row = props => {
  return (
    <View style={[props.style, {flexDirection: 'row'}]}>{props.children}</View>
  );
};

export default Row;

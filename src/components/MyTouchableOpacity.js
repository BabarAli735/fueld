import React from 'react';
import {TouchableOpacity} from 'react-native';

export default function MyTouchableOpacity(props) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      {props.children}
    </TouchableOpacity>
  );
}

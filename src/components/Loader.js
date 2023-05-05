import React from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {COLORS, IMAGES} from '../constants';

export default function Loader(props) {
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={props.showLoader}
      style={{zIndex: 1100}}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Image
            source={IMAGES.LogoSplash}
            style={{height: 150, width: 150}}
            resizeMode="contain"
            resizeMethod="resize"
          />
          <ActivityIndicator
            color={COLORS.secondary}
            size={'large'}
            style={{marginLeft: 10}}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

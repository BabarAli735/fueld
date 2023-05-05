import React, {useState} from 'react';
import {Icon} from 'native-base';
// import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Touchable,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';

import {COLORS, FONTFAMILY, FONTS, SIZES} from '../../constants';
import Row from '../Row';
import Card from '../Card';

export default function OrderHistoryModal(props) {
  //   console.log('kuch bhiiiiii', ' ', props.visibility);

  const ViewPersonalInfo = props => (
    <Row
      style={{
        justifyContent: 'space-between',
        paddingVertical: SIZES.fifteen,
      }}>
      <Text style={[FONTS.mediumFont14, {color: COLORS.brownGrey}]}>
        {props.prop}
      </Text>
      <Text style={[FONTS.mediumFont14, {color: COLORS.primary}]}>
        {props.value}
      </Text>
    </Row>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visibility}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={{flex: 1, backgroundColor: COLORS.transparent}}>
        <TouchableOpacity
          style={{
            flex: 1,

            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={props.onPress}>
          <Card style={styles.bottomSheetBody}>
            <Text
              style={[
                FONTS.mediumFont16,
                {marginVertical: SIZES.ten, textAlign: 'center'},
              ]}>
              Order History
            </Text>
            <ViewPersonalInfo prop={'Warehouse Location'} value={'John Deen'} />
            <ViewPersonalInfo prop={'Destination'} value={'New York, USA'} />
            <ViewPersonalInfo prop={'Deliver Time'} value={'10:00 AM'} />
            <ViewPersonalInfo prop={'Amount'} value={'$10.00'} />
            <ViewPersonalInfo prop={'Rating'} value={'4.5'} />
          </Card>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBody: {
    backgroundColor: COLORS.white,
    padding: SIZES.fifteen,
    borderRadius: SIZES.ten,
    marginHorizontal: SIZES.fifteen,
    marginBottom: SIZES.twenty,
    width: '90%',
  },
  modal: {
    justifyContent: 'flex-start',
    margin: 0,
  },
});

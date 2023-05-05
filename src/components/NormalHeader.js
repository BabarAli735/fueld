import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS, IMAGES, width, height, FONTS, SIZES } from "../constants";
// import {useNavigation} from '@react-navigation/native';
import BackArrow from "./BackArrow";

const NormalHeader = (props) => {
  // const navigation = useNavigation();

  return (
    <View style={[styles.container, props.style]}>
      <BackArrow
        isBright={props.isBright}
        onPress={props.onBackpress}
        style={{
          position: "absolute",
          alignSelf: "center",
          start: SIZES.fifteen,
        }}
      />
      <Text
        style={[
          FONTS.boldFont22,
          { color: props.isBright ? COLORS.white : COLORS.black },
        ]}
      >
        {props.title}
      </Text>
    </View>
  );
};

export default NormalHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SIZES.fifteen,
  },
});

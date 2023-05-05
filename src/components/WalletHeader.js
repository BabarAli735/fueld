import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS, IMAGES, width, height, FONTS, SIZES } from "../constants";
// import {useNavigation} from '@react-navigation/native';
import BackArrow from "./BackArrow";
import CircularImage from "./CircularImage";

const NormalHeader = (props) => {
  // const navigation = useNavigation();

  return (
    <View style={[styles.container, props.style]}>
      <BackArrow isBright={props.isBright} style={{}} />
      <Text
        style={[
          FONTS.boldFont22,
          {
            flex: 1,
            textAlign: "center",
            color: props.isBright ? COLORS.white : COLORS.BLACK,
          },
        ]}
      >
        {props.title}
      </Text>
      <CircularImage image={IMAGES.user1} style={styles.button} />
    </View>
  );
};

export default NormalHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SIZES.fifteen,
    paddingVertical: SIZES.ten,
  },
  button: {
    height: width * 0.12,
    width: width * 0.12,
    borderRadius: SIZES.fifty,
  },
});

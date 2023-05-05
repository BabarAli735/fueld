import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLORS, FONTFAMILY, SIZES, STYLES } from "../constants";
import BackArrow from "./BackArrow";

const HeaderOne = ({
  props,
  title,
  isDrawer = false,
  rightIcon = "",
  rightIconOnPress,
  iconType,
}) => {
  return (
    <View
      style={{
        justifyContent: "center",
        paddingHorizontal: SIZES.twenty,
      }}
    >
      <BackArrow />

      <Text
        style={[
          {
            fontSize: SIZES.fifteen + 3,
            fontFamily: FONTFAMILY.Bold,
            marginLeft: SIZES.twentyFive + 10,
            position: "absolute",
            alignSelf: "center",
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default HeaderOne;

const styles = StyleSheet.create({
  circularBG: {
    padding: SIZES.ten,
    borderRadius: SIZES.fifty,
    alignItems: "center",
    justifyContent: "center",
  },
});

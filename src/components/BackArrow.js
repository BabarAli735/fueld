import React, { useState } from "react";
import { Icon } from "native-base";
import { StyleSheet, View, Text } from "react-native";
import MyTouchableOpacity from "./MyTouchableOpacity";
import { COLORS, FONTFAMILY, FONTS, SIZES, width } from "../constants";
import { useNavigation } from "@react-navigation/native";

export default function BackArrow(props) {
  const navigation = useNavigation();

  return (
    <View style={[{ alignSelf: "baseline" }, props.style]}>
      <MyTouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: SIZES.ten,
        }}
        onPress={
          props.onPress
            ? props.onPress
            : () => {
                navigation.goBack();
              }
        }
      >
        <Icon
          type={FONTFAMILY.Entypo}
          name={"chevron-left"}
          style={{
            fontSize: SIZES.twenty,
            color: props.isBright ? COLORS.white : COLORS.black,
          }}
        />
        <Text
          style={[
            FONTS.mediumFont14,
            {
              color:
                props.isBright || props.isBright !== undefined
                  ? COLORS.black
                  : COLORS.black,
            },
          ]}
        >
          Back
        </Text>
      </MyTouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  circularBG: {
    height: width * 0.12,
    width: width * 0.12,
    borderRadius: SIZES.fifty,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});

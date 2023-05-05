import { Icon } from "native-base";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  COLORS,
  IMAGES,
  width,
  height,
  FONTS,
  SIZES,
  FONTFAMILY,
} from "../constants";
// import {useNavigation} from '@react-navigation/native';
import BackArrow from "./BackArrow";
import MyTouchableOpacity from "./MyTouchableOpacity";
import Row from "./Row";

export default ProfileHeader = (props) => {
  // const navigation = useNavigation();
  return (
    <View style={[styles.container, props.style]}>
      <BackArrow
        style={{
          alignSelf: "center",
        }}
      />
      <Text
        style={[
          FONTS.boldFont24,
          {
            color: props.isBright ? COLORS.black : COLORS.black,
            flex: 1,
            textAlign: "center",
          },
        ]}
      >
        {props.title}
      </Text>
      <MyTouchableOpacity style={{}} onPress={props.onEditPress}>
        <Icon
          name={"square-edit-outline"}
          type={FONTFAMILY.MaterialCommunityIcons}
          style={{
            fontSize: SIZES.twentyFive * 1.2,
            color: COLORS.black,
          }}
        />
      </MyTouchableOpacity>
      {/* <MyTouchableOpacity onPress={props.onSettingsPress}>
        <Icon
          name={'settings'}
          type={FONTFAMILY.SimpleLineIcons}
          style={{
            fontSize: SIZES.twentyFive * 0.9,
            color: COLORS.black,
          }}
        />
      </MyTouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SIZES.fifteen,
  },
});

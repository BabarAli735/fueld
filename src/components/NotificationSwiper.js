import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { COLORS, FONTS, IMAGES, STYLES, SIZES, FONTFAMILY } from "../constants";
import CircularImage from "./CircularImage";
import Row from "./Row";
import MyTouchableOpacity from "./MyTouchableOpacity";
import moment from "moment";

const NotificationSwiper = (props) => {
  const [cardshadow, setcardshadow] = useState(true);
  // const [data, setData] = useState(props.data.Notifications);

  // console.log('Notification Data =========', data);

  const onDeletingData = (id) => {
    // const FilteredData = data.filter(item => item.id !== id);
    // setData(FilteredData);
    // console.log('id>>>>>>>>>>>', id);
  };
  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <MyTouchableOpacity
        style={styles.deleteButton}
        onPress={props.handleDelete}
      >
        {/* <MaterialIcons
          name="delete-sweep"
          size={SIZES.twentyFive * 1.5}
          color={COLORS.white}
        /> */}
        <Icon
          type={FONTFAMILY.MaterialIcons}
          name={"delete-sweep"}
          style={{
            fontSize: SIZES.twentyFive * 1.5,
            color: COLORS.white,
          }}
        />
      </MyTouchableOpacity>
    );
  };

  return (
    <View style={{ borderTopLeftRadius: SIZES.twenty }}>
      <Swipeable
        renderRightActions={leftSwipe}
        childrenContainerStyle={{
          width: "100%",
        }}
        containerStyle={{
          overflow: "scroll",
          width: "100%",
        }}
        onSwipeableWillClose={() => {
          setcardshadow(true);
        }}
        onSwipeableRightWillOpen={() => {
          setcardshadow(false);
        }}
      >
        <View style={{}}>
          <View
            style={[
              cardshadow ? styles.card : styles.shadow,
              { marginHorizontal: SIZES.twenty },
            ]}
          >
            <View style={{}}>
              <CircularImage
                image={IMAGES.user1}
                style={{ height: SIZES.fifty, width: SIZES.fifty }}
              />
            </View>

            <View
              style={{
                marginHorizontal: SIZES.ten,
                justifyContent: "space-around",
                flex: 1,
              }}
            >
              <Text numberOfLines={1} style={[FONTS.mediumFont14, {}]}>
                {props.data.trigger_type}
              </Text>
              <Text numberOfLines={1} style={[FONTS.lightFont12, {}]}>
                {props.data.message}
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: SIZES.body10,
                  fontFamily: FONTFAMILY.Light,
                }}
              >
                {moment().diff(moment(props.data.created_at), "days") <= 0
                  ? "Today"
                  : moment().diff(moment(props.data.created_at), "days") +
                    " days ago"}
              </Text>
            </View>
          </View>
        </View>
      </Swipeable>
      {/* ); */}
    </View>
  );
};

export default NotificationSwiper;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    paddingVertical: SIZES.ten,
    // borderBottomColor: COLORS.brownGrey,
    // borderBottomWidth: 0.4,
  },
  shadow: {
    flexDirection: "row",
    paddingVertical: SIZES.ten,
  },
  deleteButton: {
    paddingLeft: SIZES.fifteen,
    paddingRight: SIZES.fifteen,
    height: "90%",
    justifyContent: "center",
    alignSelf: "center",
    borderBottomLeftRadius: SIZES.fifteen,
    borderTopLeftRadius: SIZES.fifteen,
    backgroundColor: COLORS.primary,
  },
});

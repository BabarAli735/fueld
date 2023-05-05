import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  StatusBar,
  RefreshControl,
  UIManager,
  LayoutAnimation,
  Text,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  height,
  SIZES,
  STYLES,
  width,
} from "../../constants";
import NotificationSwiper from "../../components/NotificationSwiper";
import HeaderCenterText from "../../components/HeaderCenterText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import * as IndicatorAction from "../../Store/Action/IndicatorAction";
import { ALLNOTIFICATIONS } from "../../Store/ActionType";
import axios from "axios";
import BackArrow from "../../components/BackArrow";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import * as NotificationAction from "../../Store/Action/NotificationAction";
import ButtonRadius10 from "../../components/ButtonRadius10";
import { useFocusEffect } from "@react-navigation/native";
import NotificationSkleton from "../../components/NotificationSkleton";

export default function Notifications() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const AllNotifications = useSelector(
    (state) => state.Notifications.AllNotifications
  );

  // useEffect(() => {
  //   getNotifications();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getNotifications();
    }, [])
  );

  const getNotifications = async () => {
    await dispatcher(
      NotificationAction.GetAllNotifications((response) => {
        if (response.success === 1) {
          setNotificationList(AllNotifications);
          setTimeout(() => {
            setIsLoading(false);
          }, 5000);
        }
      })
    );
  };

  // Enable UIManager to enable remove item animation in flatlist
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // set Animation when Item is removed
  const setAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 135,
      update: {
        type: LayoutAnimation.Types.easeIn,
        springDamping: 0.5,
      },
    });
  };

  // removing Item
  const removeItem = (id) => {
    setAnimation();
    setNotificationList(
      NotificationList.slice().filter((item) => item.id !== id)
    );
  };

  // right swipe action
  const rightSwipeAction = (prgress, dragX, item) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 2],
    });
  };
  const [NotificationList, setNotificationList] = useState(AllNotifications);
  // console.log('=========>>>>AllNotifications', AllNotifications);
  const dispatcher = useDispatch();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => refreshNotifications());
  }, []);

  const refreshNotifications = async () => {
    const value = await AsyncStorage.getItem("user");
    const accessToken = JSON.parse(value);
    if (accessToken !== undefined || accessToken !== null) {
      axios
        .get(
          `${CONSTANTS.API_CALLS.BASE_URL}${CONSTANTS.API_CALLS.GETNOTIFICATIONS}`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        )
        .then(({ data }) => {
          // console.log('sdasdsdasdas ====== >>>>>> ', data);
          dispatcher({
            type: ALLNOTIFICATIONS,
            AllNotifications: data.data,
          });
          setRefreshing(false);
        })
        .catch((error) => {
          let errorMsg = utils.showResponseError(error);
          setRefreshing(false);
          // response({success: 0, error: errorMsg});
        });
    } else {
      setRefreshing(false);
    }
  };

  useEffect(async () => {
    handlekilledStateNotification();
  }, []);

  const handlekilledStateNotification = async () => {
    await dispatcher(IndicatorAction.handlekilledStateNotification(false));
  };

  const deleteItem = (index) => {
    const arr = [...NotificationList];
    arr.splice(index, 1);
    setNotificationList(arr);
  };

  return (
    <View style={STYLES.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: SIZES.fifteen,
        }}
      >
        <BackArrow />

        <Text
          style={[
            {
              fontSize: SIZES.fifteen + 3,
              fontFamily: FONTFAMILY.Bold,
            },
          ]}
        >
          Notification
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setNotificationList([]);
          }}
        >
          <Text
            style={[
              FONTS.mediumFont12,
              { color: COLORS.black, textDecorationLine: "underline" },
            ]}
          >
            Clear All
          </Text>
        </TouchableOpacity>
      </View>

      {!isLoading ? (
        <View style={{ flex: 1, marginTop: SIZES.twentyFive }}>
          <FlatList
            data={NotificationList}
            keyExtractor={(Item) => Item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: height * 0.8,
                  }}
                >
                  <Text
                    style={[
                      FONTS.mediumFont12,
                      {
                        color: COLORS.black,
                        textAlign: "center",
                      },
                    ]}
                  >
                    No Notifications Available
                  </Text>
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <NotificationSwiper
                  data={item}
                  handleDelete={() => {
                    removeItem(item.id);
                  }}
                />
              );
            }}
            contentContainerStyle={{
              paddingBottom: height * 0.015,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      ) : (
        // <SkeletonPlaceholder>
        //   <SkeletonPlaceholder.Item flexDirection="row">
        //     <SkeletonPlaceholder.Item
        //       width={50}
        //       height={50}
        //       borderRadius={100}
        //     />
        //     <SkeletonPlaceholder.Item
        //       flex={1}
        //       justifyContent={"space-between"}
        //       marginLeft={12}
        //     >
        //       <SkeletonPlaceholder.Item
        //         width="50%"
        //         height={20}
        //         borderRadius={4}
        //       />
        //       <SkeletonPlaceholder.Item
        //         width="30%"
        //         height={20}
        //         borderRadius={4}
        //       />
        //       <SkeletonPlaceholder.Item
        //         width="80%"
        //         height={20}
        //         borderRadius={4}
        //       />
        //     </SkeletonPlaceholder.Item>
        //   </SkeletonPlaceholder.Item>
        // </SkeletonPlaceholder>
        <View
          style={{
            marginHorizontal: SIZES.fifteen * 1.3,
            marginTop: SIZES.twentyFive,
          }}
        >
          <NotificationSkleton itemCount={9} speed={1100} />
        </View>
      )}
    </View>
  );
}

const NotificationData = [
  {
    id: 11,
    Notifications: [
      {
        id: 1,
        name: "Lorem Ipsum  ",
        dayAgo: "1 day ago",
        dec:
          "It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ",
      },
      {
        id: 2,
        name: "Lorem Ipsum  ",
        dayAgo: "1 day ago",
        dec:
          "It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ",
      },
      {
        id: 3,
        name: "Lorem Ipsum  ",
        dayAgo: "1 day ago",
        dec:
          "It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ",
      },
    ],
  },
  // {
  //   id: 22,
  //   title: 'Earliest Notifications',
  //   Notifications: [
  //     {
  //       id: 4,
  //       name: 'Lorem Ipsum  ',
  //       dayAgo: '1 day ago',
  //       dec: 'It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ',
  //     },
  //     {
  //       id: 5,
  //       name: 'Lorem Ipsum  ',
  //       dayAgo: '1 day ago',
  //       dec: 'It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ',
  //     },
  //     {
  //       id: 6,
  //       name: 'Lorem Ipsum  ',
  //       dayAgo: '1 day ago',
  //       dec: 'It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ',
  //     },
  //   ],
  // },
];

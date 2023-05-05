import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Linking,
} from "react-native";
import { Icon } from "native-base";
import database from "@react-native-firebase/database";
import {
  COLORS,
  IMAGES,
  FONTFAMILY,
  SCREENS,
  STYLES,
  SIZES,
  FONTS,
  CONSTANTS,
} from "../../constants/index";
import HeaderCenterText from "../../components/HeaderCenterText";
import MyTouchableOpacity from "../../components/MyTouchableOpacity";
import CircularImage from "../../components/CircularImage";
import Row from "../../components/Row";
import BackArrow from "../../components/BackArrow";
import moment from "moment";
import { useSelector } from "react-redux";

export default function Chat({ route, navigation }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState("");
  const ORDERCONFIRM = useSelector((state) => state.OrderConfirm.OrderConfirm);
  useEffect(() => {
    getChatForCustomer();
  }, []);

  const ORDER = useSelector((state) => state.OrderConfirm.OrderConfirm);
  const CURRENTUSER = useSelector((state) => state.Profile.UserProfile);

  const getChatForCustomer = async () => {
    try {
      database()
        .ref(CONSTANTS.FIREBASE.CHAT) // chat path
        .child(CURRENTUSER.id.toString()) // user id
        .child(ORDER.rider.id.toString()) // rider id
        .child(ORDER.id.toString()) // order Id
        .child(CONSTANTS.FIREBASE.MESSAGES)
        .on("value", (dataSnapshot) => {
          let msgs = [];
          dataSnapshot.forEach((child) => {
            // console.log('child=====', child);
            msgs.push({
              senderId: child.val().senderId,
              message: child.val().message,
              type: child.val().type,
              time: child.val().time,
            });
          });

          setMessageList(msgs);
          // // console.log('msgs======>>>>>>', msgs);
          // this.setState({chatList: msgs}, () => {
          //   AsyncStorage.setItem(
          //     `isMessageForOrderVisited${this.orderId}`,
          //     JSON.stringify({orderID: this.orderId, isRead: true}),
          //   );
          //   setTimeout(() => {
          //     this.scrollView.scrollTo({
          //       x: 0,
          //       y: 100000000000,
          //       animated: true,
          //     });
          //   }, 300);
          // });
        });
    } catch (error) {
      console.log(
        " get chat error ===================================>",
        error
      );
    }
  };

  /*
   * Creating and Sending nessage for current and other user/rider
   */
  const sendMessage = () => {
    // current user k liye msg banaya
    database()
      .ref(CONSTANTS.FIREBASE.CHAT) // chat path
      .child(CURRENTUSER.id.toString()) // user id
      .child(ORDER.rider.id.toString()) // rider id
      .child(ORDER.id.toString()) // order Id
      .child(CONSTANTS.FIREBASE.MESSAGES) // message path
      .push({
        message: message,
        senderId: CURRENTUSER.id, // user id
        senderName: CURRENTUSER.name,
        receiverId: ORDER.rider.id, // rider Id
        receiverName: ORDER.rider.name,
        time: moment(new Date()).format("HH:mm"),
        type: 1,
      });

    // other user k liye msg banaya
    database()
      .ref(CONSTANTS.FIREBASE.CHAT)
      .child(ORDER.rider.id.toString()) // rider id
      .child(CURRENTUSER.id.toString()) // user id
      .child(ORDER.id.toString()) // order Id
      .child(CONSTANTS.FIREBASE.MESSAGES)
      .push({
        message: message,
        senderId: CURRENTUSER.id, // user id
        senderName: CURRENTUSER.name,
        receiverId: ORDER.rider.id, // rider Id
        receiverName: ORDER.rider.name,
        time: moment(new Date()).format("HH:mm"),
        type: 1,
      });

    setMessage("");
  };

  const renderChatItem = ({ item }) => {
    return (
      <View
        style={{
          alignSelf:
            item?.senderId !== CURRENTUSER.id ? "baseline" : "flex-end",
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 2,
        }}
      >
        {/* <CircularImage image={IMAGES.user1} style={{marginBottom: SIZES.ten}} /> */}
        <View style={{}}>
          <View
            style={{
              backgroundColor:
                item?.senderId !== CURRENTUSER.id
                  ? COLORS.brownGrey
                  : COLORS.primary,
              borderTopLeftRadius: SIZES.ten,
              borderTopRightRadius: SIZES.ten,
              borderBottomRightRadius:
                item?.senderId !== CURRENTUSER.id ? SIZES.ten : 0,
              borderBottomLeftRadius:
                item?.senderId === CURRENTUSER.id ? SIZES.ten : 0,
              paddingVertical: SIZES.five,
              paddingHorizontal: SIZES.ten,
            }}
          >
            <Text
              style={[
                FONTS.mediumFont12,
                {
                  textAlign: "center",
                  color: COLORS.white,
                },
              ]}
            >
              {item.message}
            </Text>
          </View>
          <Text
            style={[
              FONTS.lightFont08,
              {
                color: COLORS.black,
                alignSelf:
                  item?.senderId !== CURRENTUSER.id ? "baseline" : "flex-end",
              },
            ]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[STYLES.container]}>
      <HeaderCenterText title={"Chat"} />

      <View style={{ justifyContent: "center" }}>
        <Row
          style={{
            padding: SIZES.ten,
            alignItems: "center",
          }}
        >
          <CircularImage image={IMAGES.user1} style={{}} />
          <Row
            style={{
              marginLeft: SIZES.ten,
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <Text style={[FONTS.mediumFont14, { color: COLORS.black }]}>
                {ORDER.rider.name}
              </Text>
              <Text style={[FONTS.lightFont10, { color: COLORS.black }]}>
                Online
              </Text>
            </View>
            <MyTouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                height: SIZES.twentyWidth * 2.5,
                width: SIZES.twentyWidth * 2.5,
                borderRadius: SIZES.ten,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                let phoneNumber = "";
                if (Platform.OS === "android") {
                  phoneNumber = `tel:${ORDERCONFIRM.rider.phone}`;
                } else {
                  phoneNumber = `telprompt:${ORDERCONFIRM.rider.phone}`;
                }
                Linking.openURL(phoneNumber);
              }}
            >
              {/* <Ionicons
                    name="ios-call-outline"
                    size={SIZES.twentyFive}
                    color={COLORS.white}
                  /> */}
              <Icon
                type={FONTFAMILY.Ionicons}
                name={"ios-call-outline"}
                style={{
                  fontSize: SIZES.twentyWidth * 1.5,
                  color: COLORS.white,
                }}
              />
            </MyTouchableOpacity>
          </Row>
        </Row>
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            borderTopLeftRadius: SIZES.ten,
            borderTopRightRadius: SIZES.ten,
            paddingTop: SIZES.ten,
            paddingHorizontal: SIZES.ten,
          }}
        >
          <FlatList
            data={messageList}
            keyExtractor={(item) => item.id}
            renderItem={renderChatItem}
          />
        </View>
        <Row
          style={[
            {
              alignItems: "center",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingVertical: SIZES.five,
              paddingHorizontal: SIZES.twenty,
              backgroundColor: COLORS.white,
              borderTopLeftRadius: SIZES.twentyFive,
              borderTopRightRadius: SIZES.twentyFive,
            },
          ]}
        >
          <TextInput
            placeholder={"Type Your Message"}
            placeholderTextColor={COLORS.brownGrey}
            value={message}
            style={[FONTS.mediumFont12, styles.textInput]}
            onChangeText={(text) => setMessage(text)}
          />
          {/* <MyTouchableOpacity>
            <Icon
              type={FONTFAMILY.Feather}
              name={'camera'}
              style={{
                fontSize: SIZES.twentyWidth * 1.5,
                color: COLORS.brownGrey,
              }}
            />
          </MyTouchableOpacity>
          <MyTouchableOpacity style={{marginRight: SIZES.five}}>
            <Icon
              type={FONTFAMILY.Ionicons}
              name={'mic-outline'}
              style={{
                fontSize: SIZES.twentyWidth * 2,
                color: COLORS.brownGrey,
              }}
            />
          </MyTouchableOpacity> */}
          <MyTouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              paddingHorizontal: SIZES.ten,
              paddingVertical: SIZES.ten,
              borderRadius: SIZES.fifteen,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              if (message === "") {
                return;
              }
              sendMessage();
            }}
          >
            {/* <Feather name="send" size={SIZES.twentyFive} color={COLORS.white} /> */}
            <Icon
              type={FONTFAMILY.Ionicons}
              name={"paper-plane-outline"}
              style={{
                fontSize: SIZES.twentyFive,
                color: COLORS.white,
              }}
            />
          </MyTouchableOpacity>
        </Row>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shodow: {
    shadowColor: "#5f6168",
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textInput: {
    flex: 1,
    marginHorizontal: SIZES.five,
    height: SIZES.fifty,
    color: COLORS.black,
  },
  container: {
    // flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.ten,
    borderBottomLeftRadius: SIZES.twenty,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    height: SIZES.twenty * 1.8,
    width: SIZES.twenty * 1.8,
    borderRadius: SIZES.ten,
  },
});

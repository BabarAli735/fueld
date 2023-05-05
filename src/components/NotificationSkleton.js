import { StyleSheet, Text, View } from "react-native";
import React from "react";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { COLORS, SIZES } from "../constants";

export default function NotificationSkleton({ itemCount = 5, speed }) {
  return (
    <>
      {[...Array(itemCount)].map((_, index) => {
        return (
          <View key={index} style={{ marginBottom: 12 }}>
            <SkeletonPlaceholder
              key={index}
              speed={speed}
              highlightColor={`${COLORS.primary}65`}
            >
              <SkeletonPlaceholder.Item flexDirection="row">
                <SkeletonPlaceholder.Item
                  width={SIZES.fifty}
                  height={SIZES.fifty}
                  borderRadius={SIZES.fifty * 2}
                />
                <SkeletonPlaceholder.Item
                  flex={1}
                  justifyContent={"space-between"}
                  marginLeft={SIZES.fifteen * 1.3}
                >
                  <SkeletonPlaceholder.Item
                    width="70%"
                    height={SIZES.twenty}
                    borderRadius={SIZES.five}
                  />
                  {/* <SkeletonPlaceholder.Item
                    width="30%"
                    height={20}
                    borderRadius={4}
                  /> */}
                  <SkeletonPlaceholder.Item
                    width="25%"
                    height={SIZES.twenty}
                    borderRadius={SIZES.five}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({});

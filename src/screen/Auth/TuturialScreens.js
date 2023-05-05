import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Animated,
} from 'react-native';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../../constants';
import Swiper from 'react-native-swiper';
import ButtonRadius10 from '../../components/ButtonRadius10';
import BackArrow from '../../components/BackArrow';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TuturialScreens({navigation}) {
  const [currentIndex, setCurrentIndex] = useState();
  const {width} = useWindowDimensions();
  const slideRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewRef = React.useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  AsyncStorage.setItem(CONSTANTS.CACHE.IS_FIRST_TIME, '0');

  const RendorOnBoard = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          width,
        }}>
        <View style={{height: '60%', width: '100%'}}>
          <Image
            source={item.image}
            style={{height: '100%', width: '100%'}}
            resizeMode={'contain'}
          />
        </View>

        <View style={{}}>
          <Text
            style={[
              FONTS.mediumFont18,
              {textAlign: 'center', marginTop: SIZES.twenty * 3},
            ]}>
            {item.title}
          </Text>
          <Text
            style={[
              FONTS.mediumFont14,
              {
                textAlign: 'center',
                color: COLORS.brownGrey,
                marginTop: SIZES.ten,
              },
            ]}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  const Pagignator = ({data, scrollX}) => {
    return (
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          height: SIZES.fiftyWidth + 14,
          alignSelf: 'center',
        }}>
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 20],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity: opacity,
                },
              ]}
              key={i.toString()}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={[
        STYLES.container,
        {
          backgroundColor: '#f7f7f6',
        },
      ]}>
      <TouchableOpacity
        style={{paddingRight: SIZES.fifteen, alignSelf: 'flex-end'}}
        onPress={() => {
          navigation.replace(SCREENS.Login);
        }}>
        <Text style={[FONTS.mediumFont14]}>
          {currentIndex !== undefined && currentIndex < Data.length - 1
            ? 'Skip'
            : ''}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 0.8,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: SIZES.twenty * 2,
        }}>
        <FlatList
          horizontal
          data={Data}
          renderItem={RendorOnBoard}
          keyExtractor={item => item.id}
          contentContainerStyle={{}}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          showsHorizontalScrollIndicator={false}
          ref={slideRef}
        />
      </View>

      <Pagignator data={Data} scrollX={scrollX} />

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 0.2,
          paddingHorizontal: SIZES.fifteen,
        }}>
        <ButtonRadius10
          label={currentIndex < Data.length - 1 ? 'Next' : 'Finish'}
          onPress={() => {
            if (currentIndex < Data.length - 1) {
              slideRef.current.scrollToIndex({index: currentIndex + 1});
            } else {
              navigation.replace(SCREENS.Login);
            }
          }}
        />
      </View>

      {/* <View style={{flex: 1, justifyContent: 'center'}}>
        <Swiper
          ref={ref}
          index={currentIndex}
          scrollEnabled
          activeDotColor={COLORS.primary}
          onIndexChanged={index => {
            setCurrentIndex(index);
            // setindexof(index);
          }}>
          {Data.map((item, index) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: SIZES.ten,
                }}>
                <View
                  style={{
                    height: '70%',
                    width: '100%',
                  }}>
                  <Image
                    source={Data[currentIndex].image}
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                    resizeMode="contain"
                  />
                </View>

                <Text
                  style={[
                    FONTS.mediumFont18,
                    {textAlign: 'center', marginVertical: SIZES.fifteen},
                  ]}>
                  {Data[currentIndex].title}
                </Text>
                <Text
                  style={[
                    FONTS.mediumFont12,
                    {textAlign: 'center', color: COLORS.brownGrey},
                  ]}>
                  {' '}
                  You can schedule fuel delivery at your convenience
                </Text>
              </View>
            );
          })}
        </Swiper>
      </View>

      <View
        style={{
          flex: 0.2,
          paddingHorizontal: SIZES.fifteen,
          justifyContent: 'center',
        }}>
        <ButtonRadius10
          label={currentIndex === Data.length - 1 ? 'Finish' : 'Next'}
          onPress={() => {
            if (currentIndex < Data.length - 1) {
              console.log('currentIndex ========== >>>>>>>. ', currentIndex);

              setCurrentIndex(currentIndex + 1);
              ref.current.scrollBy(currentIndex + 1, true);
            } else {
              setCurrentIndex(0);
              // navigation.replace(SCREENS.Login);
            }
          }}
        />
      </View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: SIZES.ten,
    borderRadius: SIZES.five,
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.five,
  },
  loginBtnBg: {
    width: '70%',
    height: SIZES.twenty * 3,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.ten,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Data = [
  {
    id: 1,
    title: 'Schedule Fuel Delivery',
    description: 'You can schedule fuel delivery at yourconvenience',
    image: IMAGES.truck,
  },
  {
    id: 2,
    title: 'Schedule Fuel Delivery',
    description: 'You can schedule fuel delivery at yourconvenience',
    image: IMAGES.card_fuel,
  },
  {
    id: 3,
    title: 'Schedule Fuel Delivery',
    description: 'You can schedule fuel delivery at yourconvenience',
    image: IMAGES.clock,
  },
  {
    id: 4,
    title: 'Schedule Fuel Delivery',
    description: 'You can schedule fuel delivery at yourconvenience',
    image: IMAGES.track_car,
  },
  {
    id: 5,
    title: 'Schedule Fuel Delivery',
    description: 'You can schedule fuel delivery at yourconvenience',
    image: IMAGES.world,
  },
];

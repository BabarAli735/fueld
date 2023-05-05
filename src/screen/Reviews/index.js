import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NormalHeader from '../../components/NormalHeader';
import {
  COLORS,
  FONTS,
  IMAGES,
  STYLES,
  FONTFAMILY,
  CONSTANTS,
} from '../../constants';
import {SIZES} from '../../constants/theme';
import CircularImage from '../../components/CircularImage';
import Row from '../../components/Row';
import {Icon} from 'native-base';
import Axios from './../../network/index';
import utils from '../../utils';
import {useSelector} from 'react-redux';
import ErrorView from '../../components/modals/ErrorView';
import Loader from '../../components/Loader';
import moment from 'moment';

export default function AllReviews(props) {
  const [isLoading, setIsloading] = useState(true);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [allReviews, setallReviews] = useState([]);

  const AuthToken = useSelector(state => state.Auth.AccessToken);
  console.log('Auth Tokennnnnnnnnnnn', AuthToken);
  useEffect(async () => {
    getAllReviews();
  }, []);

  // useEffect to show error modal which depends on errorMsg
  useEffect(() => {
    if (errorMsg !== '') {
      setErrorVisibility(true);
    }
  }, [errorMsg]);

  const getAllReviews = () => {
    let config = {
      params: {
        rider_id: 3,
      },
      headers: {
        Authorization: AuthToken,
      },
    };

    const onSuccess = ({data}) => {
      setallReviews(data.data.records);
      setIsloading(false);
    };

    const onFailure = error => {
      setIsloading(false);
      let errorMsg = utils.showResponseError(error);
      setErrorMsg(errorMsg);
    };

    Axios.get(CONSTANTS.API_CALLS.ALLREVIEWS, config)
      .then(onSuccess)
      .catch(onFailure);
  };

  const rendorReview = ({item}) => {
    return (
      <View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: SIZES.fifteen,
            marginTop: SIZES.ten,
          }}>
          <CircularImage
            image={{uri: CONSTANTS.API_CALLS.IMAGEURI + item.user.image}}
            style={{
              backgroundColor: 'red',
              height: SIZES.twenty * 3.2,
              width: SIZES.twenty * 3.2,
              borderRadius: SIZES.twenty * 3.2,
            }}
            resizeMode={'contain'}
          />
          <View style={{marginStart: SIZES.ten}}>
            <Text style={[FONTS.mediumFont14]}>{item.user.name}</Text>
            <Text style={[FONTS.lightFont12, {color: COLORS.brownGrey}]}>
              {moment(item.created_at).format('DD MMM')} at{' '}
              {moment(item.created_at).format('LTS')}
            </Text>
            <Row>
              <Icon
                type={FONTFAMILY.AntDesign}
                name={'star'}
                style={{fontSize: SIZES.fifteen, color: 'gold'}}
              />
              <Text style={[FONTS.lightFont12, {color: COLORS.primary}]}>
                {item.rating}
              </Text>
            </Row>
          </View>
        </View>
        {/* </View> */}
        <Text
          style={[
            FONTS.mediumFont14,
            {marginLeft: SIZES.twenty, marginTop: SIZES.five},
          ]}>
          {item.comments}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: SIZES.fifteen,
            marginTop: SIZES.ten,
          }}></View>
        <View
          style={{
            height: 1,
            backgroundColor: COLORS.darkBlueGrey,
            width: '100%',
            marginTop: SIZES.ten,
          }}
        />
      </View>
    );
  };
  return (
    <View style={STYLES.container}>
      <NormalHeader title="All Reviews" />
      <FlatList
        data={allReviews}
        keyExtractor={item => item.id.toString()}
        renderItem={rendorReview}
      />
      {/* Loader */}
      {isLoading ? <Loader /> : null}

      {/* Error */}
      <ErrorView
        visibility={errorVisibility}
        setVisibility={setErrorVisibility}
        setErrorMsg={setErrorMsg}
        msg={errorMsg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  myStarStyle: {
    color: 'yellow',
  },
  myEmptyStarStyle: {
    color: 'red',
  },
});

const ReviewData = [
  {
    id: 1,
    name: 'John Andrew',
    number: '1 min ago',
    dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
  },
  {
    id: 2,
    name: 'John Andrew',
    number: '1 min ago',
    dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
  },
  {
    id: 3,
    name: 'John Andrew',
    number: '1 min ago',
    dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
  },
  {
    id: 4,
    name: 'John Andrew',
    number: '1 min ago',
    dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
  },
];

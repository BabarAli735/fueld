import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  STYLES,
  COLORS,
  IMAGES,
  SIZES,
  FONTS,
  FONTFAMILY,
  CONSTANTS,
  SCREENS,
} from '../../constants/theme';
import StarRating from 'react-native-star-rating';
import MessageEditText from '../../components/MessageEditText';
import ButtonRadius10 from '../../components/ButtonRadius10';
import NormalHeader from '../../components/NormalHeader';
import Row from '../../components/Row';
import CircularImage from './../../components/CircularImage';
import {Icon} from 'native-base';
import Axios from './../../network/index';
import utils from '../../utils';
import {useSelector} from 'react-redux';
import ErrorView from '../../components/modals/ErrorView';
import Loader from '../../components/Loader';

export default function RateAndRevew(props) {
  const [ratings, setratings] = useState(0);
  const [comment, setComment] = useState('user@yopmail.com');
  const [showLoader, setShowLoader] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const AuthToken = useSelector(state => state.Auth.AccessToken);
  const ORDERCONFIRM = useSelector(state => state.OrderConfirm.OrderConfirm);

  // useEffect to show error modal which depends on errorMsg
  useEffect(() => {
    if (errorMsg !== '') {
      setErrorVisibility(true);
    }
  }, [errorMsg]);

  const ratingReview = () => {
    const onSuccess = ({data}) => {
      console.log('data dikha samjhaaaaa', data);
      setShowLoader(false);
      props.navigation.replace(SCREENS.DrawerNavigator);
    };

    const onFailure = error => {
      setShowLoader(false);
      let msg = utils.showResponseError(error);
      setErrorMsg(JSON.stringify(msg));
      console.log('error dikhaaaa yaar', error);
      console.log('reset password api error=====>>>', msg);
    };

    let config = {
      headers: {
        Authorization: AuthToken,
      },
    };

    if (ratings === 0) {
      setErrorMsg('Please Rate');
      return;
    } else if (utils.isEmptyOrSpaces(comment)) {
      setErrorMsg('Enter Some Comments');
      return;
    }

    let postData = {
      order_id: ORDERCONFIRM.id,
      rider_id: ORDERCONFIRM.rider.id,
      rating: ratings,
      comments: comment,
    };
    console.log('post dataaaaaaaaa', postData);
    setShowLoader(true);
    Axios.post(CONSTANTS.API_CALLS.ADDREVIEWS, postData, config)
      .then(onSuccess)
      .catch(onFailure);
  };

  {
    /*********Methood on Changing Ratings *********/
  }

  const onStarRatingPress = rating => {
    setratings(rating);
  };

  return (
    <View style={[STYLES.container]}>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle={"dark-content"} /> */}
      <NormalHeader
        title="Rate & Review"
        onBackpress={() => {
          props.navigation.replace(SCREENS.DrawerNavigator);
        }}
      />
      <View
        style={{
          // backgroundColor: COLORS.white,fdf
          padding: SIZES.fifteen,
          borderRadius: SIZES.ten,
          marginTop: SIZES.five,
        }}>
        {/*********Header Row Image Ratings View Start *********/}
        <Row
          style={{
            marginTop: SIZES.twenty,
            alignItems: 'center',
          }}>
          <CircularImage
            image={IMAGES.user1}
            style={{
              height: SIZES.twenty * 3.5,
              width: SIZES.twenty * 3.5,
              borderRadius: SIZES.twenty * 3.5,
            }}
          />
          <View style={{marginHorizontal: SIZES.ten}}>
            <Text style={[FONTS.mediumFont14, {color: COLORS.black}]}>
              Anko filling Station
            </Text>
            <Text style={[FONTS.mediumFont10, {color: COLORS.brownGrey}]}>
              Sythe Hay R280
            </Text>

            {/*********Rider Ratings view start*********/}

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name={'star'}
                type={FONTFAMILY.Ionicons}
                style={{
                  color: COLORS.startColor,
                  fontSize: SIZES.twenty,
                }}
              />
              <Text style={[FONTS.lightFont12, {marginStart: SIZES.five}]}>
                5.0
              </Text>
            </View>
            {/*********Rider Ratings view end*********/}
          </View>
        </Row>
        <View>
          <Text style={[FONTS.mediumFont16, {marginVertical: SIZES.fifteen}]}>
            What is your rate?
          </Text>

          <StarRating
            animation="bounce"
            maxStars={5}
            fullStarColor={COLORS.startColor}
            halfStarColor={COLORS.startColor}
            emptyStarColor={COLORS.startColor}
            starSize={SIZES.twenty * 2.5}
            rating={ratings}
            selectedStar={ratings => onStarRatingPress(ratings)}
            containerStyle={{
              paddingHorizontal: SIZES.twenty * 0.5,
              paddingVertical: SIZES.twenty,
            }}
            // starStyle={{marginLeft: SIZES.ten}}
          />
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.brownGrey, marginBottom: SIZES.twenty},
            ]}>
            Please share your opinion about the photographer
          </Text>
          <MessageEditText
            placeholder="Write something here.."
            onChangeText={text => {
              setComment(text);
            }}
          />
        </View>
        {/*********Feed Back View End *********/}

        {/*********Radius Button Cancel Booking *********/}
        <ButtonRadius10
          label="Submit"
          style={{marginTop: SIZES.twenty * 2.5}}
          onPress={() => {
            ratingReview();
          }}
        />
      </View>
      {/* Loader */}
      <Loader showLoader={showLoader} />

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

const styles = StyleSheet.create({});

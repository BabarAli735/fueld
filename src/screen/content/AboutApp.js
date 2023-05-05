import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, CONSTANTS, FONTS, height, SIZES, STYLES} from '../../constants';
import HeaderCenterText from '../../components/HeaderCenterText';
import Card from '../../components/Card';
import Axios from './../../network/index';
import utils from '../../utils';
import {useSelector} from 'react-redux';
import ErrorView from '../../components/modals/ErrorView';
import Loader from '../../components/Loader';

export default function AboutApp() {
  const [isLoading, setIsloading] = useState(true);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [aboutApp, setAboutApp] = useState([]);

  const AuthToken = useSelector(state => state.Auth.AccessToken);
  console.log('Auth Tokennnnnnnnnnnn', AuthToken);

  useEffect(async () => {
    getAboutApp();
  }, []);

  // useEffect to show error modal which depends on errorMsg
  useEffect(() => {
    if (errorMsg !== '') {
      setErrorVisibility(true);
    }
  }, [errorMsg]);

  const getAboutApp = () => {
    let config = {
      headers: {
        Authorization: AuthToken,
      },
    };

    const onSuccess = ({data}) => {
      setIsloading(false);
      setAboutApp(data.data);
    };

    const onFailure = error => {
      setIsloading(false);
      let errorMsg = utils.showResponseError(error);
      setErrorMsg(errorMsg);
    };

    setIsloading(true);

    Axios.get(CONSTANTS.API_CALLS.CONTENT, config)
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View style={[STYLES.container, {}]}>
      {/* <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} /> */}

      <HeaderCenterText
        title={aboutApp.about_app_title}
        style={{marginHorizontal: SIZES.twenty}}
      />
      <Card
        style={{
          backgroundColor: COLORS.white,
          borderRadius: SIZES.ten,
          height: height - 300,
          marginTop: SIZES.twenty * 1.5,
          marginHorizontal: SIZES.twenty,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 150}}>
          <Text
            style={[
              FONTS.lightFont14,
              {color: COLORS.black, margin: SIZES.fifteen},
            ]}>
            {aboutApp.about_app_paragraph}
          </Text>
        </ScrollView>
      </Card>
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

const styles = StyleSheet.create({});

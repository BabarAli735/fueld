import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, CONSTANTS, FONTS, height, SIZES, STYLES} from '../../constants';
import HeaderCenterText from '../../components/HeaderCenterText';
import Card from '../../components/Card';
import Axios from './../../network/index';
import utils from '../../utils';
import Loader from '../../components/Loader';
import {useSelector} from 'react-redux';
import ErrorView from '../../components/modals/ErrorView';

export default function TermsAndConditions() {
  const [isLoading, setIsloading] = useState(true);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [termsConditions, setTermsConditions] = useState([]);

  const AuthToken = useSelector(state => state.Auth.AccessToken);

  useEffect(async () => {
    getTermsAndConditions();
  }, []);

  // useEffect to show error modal which depends on errorMsg
  useEffect(() => {
    if (errorMsg !== '') {
      setErrorVisibility(true);
    }
  }, [errorMsg]);

  const getTermsAndConditions = () => {
    let config = {
      headers: {
        Authorization: AuthToken,
      },
    };

    const onSuccess = ({data}) => {
      setIsloading(false);
      setTermsConditions(data.data);

      console.log('data affan=========== >>>>>>>> ', data);
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
        title={termsConditions.terms_condition_title}
        style={{marginHorizontal: SIZES.twenty}}
      />
      <Card
        style={{
          backgroundColor: COLORS.white,
          borderRadius: SIZES.ten,
          height: height - SIZES.fifty * 2.5,
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
            {termsConditions.terms_condition_paragraph}
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

import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import MainNavigation from './src/navigation/MainNavigation';
import ReduxThunk from 'redux-thunk';

// import all reducers here
import UserProfileReducer from './src/Store/Reducer/UserProfileReducer';
import AuthReducer from './src/Store/Reducer/Auth';
import HomeScreenReducer from './src/Store/Reducer/HomeScreenReducer';
import OrderConfirmReducer from './src/Store/Reducer/OrderConfirmReducer';
import IndicatorReducer from './src/Store/Reducer/IndicatorReducer';
import GetCardReducer from './src/Store/Reducer/GetCardReducer';
import NotificationReducer from './src/Store/Reducer/NotificationReducer';
import RiderCoordination from './src/Store/Reducer/RiderCoordinates';
import AppStateReducer from './src/Store/Reducer/AppStateReducer';
// Redux Imports
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import GetFuels from './src/Store/Reducer/GetFuels';
import AppLoading from './src/Store/Reducer/AppLoadingReducer';

const rootReducer = combineReducers({
  Auth: AuthReducer,
  HomeReducer: HomeScreenReducer,
  Profile: UserProfileReducer,
  GetFuels: GetFuels,
  OrderConfirm: OrderConfirmReducer,
  Profile: UserProfileReducer,
  Indicators: IndicatorReducer,
  Cards: GetCardReducer,
  Notifications: NotificationReducer,
  RiderCoordination: RiderCoordination,
  AppStateReducer: AppStateReducer,
  AppLoading: AppLoading,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 500);
  // }, []);

  return (
    <View style={{flex: 1}}>
      {/* <Provider store={store}> */}
      <Provider store={store}>
        <PaperProvider>
          <MainNavigation />
        </PaperProvider>
      </Provider>
    </View>
  );
};

// str = str.replace(/\d(?=\d{4})/g, "*");

export default App;

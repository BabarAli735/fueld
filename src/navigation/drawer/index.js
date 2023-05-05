import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TransitionPresets} from '@react-navigation/stack';
import {SCREENS, SIZES} from '../../constants';
import DrawerScreen from './DrawerScreen';
import Profile from '../../screen/Profile/index';
import Notifications from '../../screen/Notifications/Notifications';
import Wallet from '../../screen/Wallet';
import Home from './../../screen/home/Home';
import SelectQuantity from '../../screen/SelectQuantity';
import Order_Tracking from '../../screen/OrderTracking';
import NearBy from '../../screen/NearBy';
import EditProfile from './../../screen/Profile/EditProfile';
import Support from './../../screen/content/Support';
import Chat from './../../screen/Chat/Chat';
import Rating from './../../screen/Reviews/Rating';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerType="front"
      drawerStyle={{
        width: '75%',
        backgroundColor: 'transparent',
      }}
      // drawerContentOptions={{
      //   itemStyle: { marginVertical: 5 },
      // }}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        // gestureEnabled: false,
      }}
      drawerContent={props => <DrawerScreen {...props} />}>
      <Drawer.Screen name={SCREENS.Home} component={Home} />
      <Drawer.Screen name={SCREENS.SelectQuantity} component={SelectQuantity} />
      <Drawer.Screen name={SCREENS.Order_Tracking} component={Order_Tracking} />
      <Drawer.Screen name={SCREENS.Notifications} component={Notifications} />
      <Drawer.Screen name={SCREENS.Profile} component={Profile} />
      <Drawer.Screen name={SCREENS.EditProfile} component={EditProfile} />
      <Drawer.Screen name={SCREENS.Wallet} component={Wallet} />
      <Drawer.Screen name={SCREENS.Support} component={Support} />
      <Drawer.Screen name={SCREENS.Rating} component={Rating} />
    </Drawer.Navigator>
  );
}

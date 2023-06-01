import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from 'react-native-paper';

//-----Screens-Start-----
import SplashScreen from '../../screens/SplashScreen/SplashScreen';
import LoginScreen from '../../screens/LoginScreen/LoginScreen';
import SignUpScreen from '../../screens/SignUpScreen/SignUpScreen';
import HomeNavigator from './HomeNavigator';
import ErrorScreen from '../../screens/ErrorScreen/ErrorScreen';
import NoInternetScreen from '../../screens/ErrorScreen/NoInternetScreen';
import EventItemScreen from '../../screens/EventsScreen/EventItemScreen';

//-----Screens-End-----

const Stack = createStackNavigator();


export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerBackTitleVisible: false,
        cardStyle: {
          backgroundColor: Colors.white,
        },
        headerStyle: {
          borderBottomWidth: 1,
          borderColor: Colors.grey100,
        },
      }}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
      />
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{title: 'Error'}}
      />
      <Stack.Screen
        name="NoInternetScreen"
        component={NoInternetScreen}
        options={{title: 'No Internet'}}
      />
      <Stack.Screen
        name="EventItemScreen"
        component={EventItemScreen}
        options={{
          title: 'Event',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}


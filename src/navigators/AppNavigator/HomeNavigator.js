import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountScreen from '../../screens/AccountScreen/AccountScreen';
import EventsScreen from '../../screens/EventsScreen/EventsScreen';

const BottomNavigator = createBottomTabNavigator();

const TabIcon = ({ focused, name }) => {
  return (
    <Text
      style={{
        color: focused ? 'red' : 'black',
      }}
    >
      {name}
    </Text>
  );
};

export default function HomeNavigator() {
  return (
    <BottomNavigator.Navigator
      initialRouteName="Events"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <BottomNavigator.Screen
        name="Events"
        component={EventsScreen}
        options={{
          title: 'Events',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} name={'Events'} />,
        }}
      />
      <BottomNavigator.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} name={'Account'} />,
        }}
      />
    </BottomNavigator.Navigator>
  );
}

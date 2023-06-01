import { View } from 'react-native';
import React from 'react';
import AppNavigator from '../../navigators/AppNavigator/AppNavigator';
import navigationService from '../../services/navigationService';


function RootScreen() {
  return (
    <View style={{ flex: 1 }}>
      <AppNavigator
        ref={(navigatorRef) => {
          navigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </View>
  );
}

export default RootScreen;

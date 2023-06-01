import React, {forwardRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './RootStack';

export default forwardRef(function AppNavigator(props, ref) {
  return (
    <NavigationContainer ref={ref}>
      <RootStack/>
    </NavigationContainer>
  );
});

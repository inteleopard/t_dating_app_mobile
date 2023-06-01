import React from 'react';
import {StatusBar, View, Text} from 'react-native';

import styles from './styles';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#2d70d0'}/>
      <View style={styles.content}>
        <Text>{'Code test - SplashScreen'}</Text>
      </View>
    </View>
  );
}

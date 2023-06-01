import React from 'react';
import {StatusBar, View, Text} from 'react-native';

import styles from './styles';
import { Button as PaperButton, Colors } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import AuthActions from '../../stores/auth/Actions';

export default function AccountScreen() {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#2d70d0'}/>
      <View style={styles.content}>
        <Text style={styles.text}>{'Account'}</Text>
      </View>

      <PaperButton
        style={styles.logoutButton}
        color={Colors.blue600}
        mode={'contained'}
        onPress={() => dispatch(AuthActions.logout())}
        uppercase={false}
      >
        {'Logout'}
      </PaperButton>
    </View>
  );
}

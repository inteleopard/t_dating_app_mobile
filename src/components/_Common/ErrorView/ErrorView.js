import React from 'react';
import {Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button as PaperButton, Colors} from 'react-native-paper';

import startupActions from 'src/stores/startup/Actions';
import authActions from 'src/stores/auth/Actions';
import {selectProfileIsLoading} from 'src/stores/profile/Selectors';

import styles from './styles';

export default function ErrorView({content, imageSrc}) {
  const dispatch = useDispatch();
  const profileIsLoading = useSelector(selectProfileIsLoading);

  return (
    <View style={styles.container}>
      <Text style={styles.content}>{content}</Text>
      <Image
        style={styles.image}
        resizeMode={'contain'}
        source={imageSrc}
      />
      <View style={styles.actionsContainer}>
        <PaperButton
          color={Colors.grey900}
          mode="contained"
          uppercase={false}
          onPress={() => {
            dispatch(authActions.logout());
          }}
        >
          {'Logout'}
        </PaperButton>
        <PaperButton
          loading={profileIsLoading}
          color={Colors.blue700}
          mode="contained"
          uppercase={false}
          onPress={() => {
            dispatch(startupActions.startup());
          }}
        >
          {'Refresh'}
        </PaperButton>
      </View>
    </View>
  );
}

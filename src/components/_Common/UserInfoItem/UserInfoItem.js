import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import moment from 'moment';

import AVATAR from '../../../assets/images/avatar.png';
import styles from './UserInfoItemStyles';

export default function UserInfoItem({userInfo, onPress}) {
  const avatarSource = userInfo.avatar ? {uri: userInfo.avatar.url} : AVATAR;

  return (
    <TouchableOpacity style={styles.userInfoContainer} onPress={onPress}>
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            resizeMode={'cover'}
            source={avatarSource}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.username}>{userInfo.name}</Text>
          <Text style={styles.birthDate}>{userInfo.birthDate && moment().diff(userInfo.birthDate, 'years')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

import {Text, View} from 'react-native';
import {Badge, Colors, IconButton} from 'react-native-paper';
import React from 'react';

import styles from './TopTabTitleStyles';

export default function TopTabTitle({title, tabKey, focused, countPropertyKey, ...props}) {
  const {
    profile: {profileData},
    config: {likesReceivedThreshold},
    settings: {profileStateChanged, preferencesStateChanged, settingsStateChanged},
  } = props;
  let docsCount = 0;

  if (countPropertyKey) {
    docsCount = profileData[countPropertyKey]?.totalDocs;
  }

  const shouldShowUnsavedAlert = (tabKey === 'profile' && profileStateChanged) ||
    (tabKey === 'preferences' && preferencesStateChanged) ||
    (tabKey === 'settings' && settingsStateChanged);

  return (
    <View style={styles.container}>
      {(countPropertyKey === 'likedMe') && (docsCount > likesReceivedThreshold) && (
        <IconButton
          icon={'alert-outline'}
          color={Colors.red500}
          size={20}
          style={{marginHorizontal: -2, marginVertical: -5}}
        />
      )}

      {shouldShowUnsavedAlert && (
        <IconButton
          icon={'alert-outline'}
          color={Colors.orange500}
          size={20}
          style={{marginHorizontal: -2, marginVertical: -5}}
        />
      )}

      <Text style={[styles.title, focused && styles.titleFocused]}>
        {title}
      </Text>

      {countPropertyKey && (
        <Badge style={styles.badge} size={22}>
          {docsCount}
        </Badge>
      )}
    </View>

  );
}

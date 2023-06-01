import React, {memo} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';

import styles from './styles';
import UserInfoItem from '../_Common/UserInfoItem/UserInfoItem';
import {openUserProfile} from '../../utils/helpers';

const propsEqual = (prev, next) => {
  return (prev.item.id === next.item.id)
    && (prev.item.online === next.item.online);
};

const UserItem = memo(({item}) => {
  return (
    <View key={item.id} style={styles.item}>
      <UserInfoItem userInfo={item} onPress={() => openUserProfile(item)}/>
    </View>
  );
}, propsEqual);

export default function EventAttendees({users}) {

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>{'No data!'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={({item}) => <UserItem item={item} />}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={0.2}
      />
    </SafeAreaView>
  );
}

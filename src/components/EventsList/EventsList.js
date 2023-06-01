import React, {memo, useCallback, useEffect, useReducer, useState} from 'react';
import {ActivityIndicator, FlatList, StatusBar, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';
import SwitchSelector from 'react-native-switch-selector';

import {EVENT_PAST, EVENT_UPCOMING, LIST_PAGE_LIMIT} from '../../config/constants';
import styles from './styles';
import EventListItem from '../EventListItem/EventListItem';
import EventContext, {useEventContext} from './EventContext';

const UPCOMING_VALUE = 1;

function switchReducer(state, action) {
  if (action.type === 'set_switch') {
    return {
      switchValue: action.value,
    };
  }
  throw Error('Unknown action.');
}

/**
 * using context api with useReducer
 * to not trigger re-render of header on flatList re-render
 */
const HeaderSwitch = memo(() => {
  const {switchState, switchDispatch} = useEventContext();

  return (
    <SwitchSelector
      initial={1}
      value={switchState.switchValue}
      style={{marginVertical: 15, width: '80%', alignSelf: 'center'}}
      onPress={(value) => {
        switchDispatch({type: 'set_switch', value});
      }}
      textContainerStyle={{height: '100%'}}
      textColor={Colors.black}
      selectedColor={Colors.black}
      buttonColor={Colors.white}
      borderColor={Colors.grey300}
      backgroundColor={Colors.grey300}
      selectedTextStyle={{fontWeight: 'bold'}}
      hasPadding
      options={[
        {label: 'Past', value: 0}, //todo add image 'imageIcon'
        {label: 'Upcoming', value: 1},
      ]}
    />
  );
});

export default function EventsList(props) {
  const {getEvents} = props;
  const [switchState, switchDispatch] = useReducer(switchReducer, {switchValue: 1});
  const providerState = {
    switchState,
    switchDispatch,
  };

  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [events, setEvents] = useState();

  const refreshEvents = useCallback(() => {
    setRefreshing(true);
    getEvents({
      active: true,
      when: switchState.switchValue === UPCOMING_VALUE ? EVENT_UPCOMING : EVENT_PAST,
      limit: LIST_PAGE_LIMIT,
      page: 1,
      sort: switchState.switchValue === UPCOMING_VALUE ? 'date' : '-date',
    })
      .then((data) => {
        setEvents(data?.docs);
        setHasNextPage(data?.hasNextPage);
        setNextPage(data?.nextPage);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [getEvents, switchState.switchValue]);

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  const fetchMoreData = () => {
    if (loadingMore || !hasNextPage) {
      return;
    }

    setLoadingMore(true);
    getEvents({
      active: true,
      when: switchState.switchValue === UPCOMING_VALUE ? EVENT_UPCOMING : EVENT_PAST,
      limit: LIST_PAGE_LIMIT,
      page: nextPage,
      sort: switchState.switchValue === UPCOMING_VALUE ? 'date' : '-date',
    })
      .then((data) => {
        setEvents(eventsDocs => [...eventsDocs, ...data?.docs]);
        setHasNextPage(data?.hasNextPage);
        setNextPage(data?.nextPage);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  const renderFooter = () => loadingMore && (
    <View style={styles.footerText}>
      <ActivityIndicator/>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No event found at the moment!</Text>
    </View>
  );

  return (
    <EventContext.Provider value={providerState}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#000"/>

        <FlatList
          data={events}
          ListHeaderComponent={HeaderSwitch}
          renderItem={({item}) => <EventListItem item={item}/>}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onEndReachedThreshold={0.05}
          onEndReached={fetchMoreData}
          onRefresh={refreshEvents}
          refreshing={refreshing}
          bounces
          decelerationRate={'fast'}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </EventContext.Provider>
  );
}

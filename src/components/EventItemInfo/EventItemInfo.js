import { RefreshControl, ScrollView, Text, View, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Button as PaperButton, Colors } from 'react-native-paper';
import { useSelector } from 'react-redux';

import styles from './styles';
import ConfirmationDialog from '../_Common/ConfirmationDialog/ConfirmationDialog';
import locationIcon from '../../assets/images/location.png';
import calendarIcon from '../../assets/images/calendar.png';
import usersIcon from '../../assets/images/users.png';
import ticketIcon from '../../assets/images/ticket.png';

export default function EventItemInfo({ eventId, getEvent }) {
  const { id: loggedUserId } = useSelector(state => state?.profile?.profileData);

  const [refreshing, setRefreshing] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(() => {
  });
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmContent, setConfirmContent] = useState('');
  const [eventData, setEventData] = useState();

  const { title, description, seats, orders = [], address, date, amount, currency } = eventData || {};
  const isMeAttending = orders.some(order => order?.user.id === loggedUserId);
  const canJoin = orders.length < seats && new Date() < new Date(date);

  const refreshEventItem = useCallback(() => {
    setRefreshing(true);
    getEvent(eventId)
      .then(setEventData)
      .finally(() => {
        setRefreshing(false);
      });
  }, [eventId, getEvent]);

  const joinEventCallback = useCallback(() => {
    setConfirmDialogVisible(false);

    /**
     * TODO:
     * - create new order with user: loggedUserId and event: eventId
     * - then refresh event item with refreshEventItem()
     **/

  }, []);

  useEffect(() => {
    refreshEventItem();
  }, [refreshEventItem]);

  const joinEventHandler = () => {
    if (!isMeAttending) {
      setConfirmTitle('Join event');
      setConfirmContent('Are you sure you want to join this event?');
      setConfirmCallback(() => joinEventCallback);
      setConfirmDialogVisible(true);
    }
  };

  const closeConfirmDialog = () => {
    setConfirmDialogVisible(false);
  };

  return (
    <ScrollView style={styles.itemContainer} refreshControl={
      <RefreshControl onRefresh={refreshEventItem} refreshing={refreshing} />
    }>
      <View style={styles.eventInfoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.eventDescription}>{description}</Text>

        <View style={styles.labelWithIcon}>
          <Image style={styles.labelIcon} source={locationIcon} />
          <Text style={styles.labelText}>{address}</Text>
        </View>


        <View style={styles.labelWithIcon}>
          <Image style={[styles.labelIcon]} source={calendarIcon} />
          <Text style={styles.labelText}>{moment(date).format('DD MMM YYYY')}</Text>
        </View>

        <View style={styles.labelWithIcon}>
          <Image style={[styles.labelIcon]} source={usersIcon} />
          <Text style={styles.labelText}>{orders?.length}/{seats}</Text>
        </View>

        <View style={styles.labelWithIcon}>
          <Image style={[styles.labelIcon]} source={ticketIcon} />
          <Text style={styles.labelText}>{amount} {currency}</Text>
        </View>
      </View>

      {(eventData && !isMeAttending && canJoin) && (
        <PaperButton
          contentStyle={{ height: 60 }}
          style={styles.button}
          loading={refreshing}
          color={Colors.blue500}
          mode="contained"
          uppercase={false}
          onPress={joinEventHandler}
        >
          {'Buy ticket'}
        </PaperButton>
      )}

      <ConfirmationDialog
        visible={confirmDialogVisible}
        onDismiss={closeConfirmDialog}
        title={confirmTitle}
        content={confirmContent}
        confirmCallback={confirmCallback}
      />
    </ScrollView>
  );
}

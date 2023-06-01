import React from 'react';
import EventItemInfoContainer from '../../components/EventItemInfo/EventItemInfoContainer';
import {useRoute} from '@react-navigation/native';

export default function EventItemScreen() {
  const {params: {eventId}} = useRoute();

  return (
    <EventItemInfoContainer eventId={eventId}/>
  );
}

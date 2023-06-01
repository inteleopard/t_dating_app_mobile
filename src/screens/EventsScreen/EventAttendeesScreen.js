import React from 'react';
import EventAttendees from '../../components/EventAttendees/EventAttendees';
import { useRoute } from '@react-navigation/native';

export default function EventAttendeesScreen() {
  const { params: { users } } = useRoute();

  return (
    <EventAttendees users={users} />
  );
}

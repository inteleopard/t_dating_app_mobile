import React from 'react';

const EventContext = React.createContext();

export function useEventContext() {
  return React.useContext(EventContext);
}

export default EventContext;

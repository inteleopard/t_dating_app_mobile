import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  getEvents: ['query', 'resolver'],
  getEvent: ['eventId', 'resolver'],
});

export const EventTypes = Types;
export default Creators;

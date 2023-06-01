import {connect} from 'react-redux';

import EventsList from './EventsList';
import EventActions from '../../stores/event/Actions';

const mapDispatchToProps = (dispatch) => ({
  getEvents: (query) => new Promise((resolve, reject) => dispatch(EventActions.getEvents(query, {resolve, reject}))),
});

export default connect(
  null,
  mapDispatchToProps,
)(EventsList);

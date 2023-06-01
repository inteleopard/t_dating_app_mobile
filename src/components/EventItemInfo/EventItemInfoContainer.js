import {connect} from 'react-redux';

import EventItemInfo from './EventItemInfo';
import EventActions from '../../stores/event/Actions';

const mapDispatchToProps = (dispatch) => ({
  getEvent: (eventId) => new Promise((resolve, reject) => dispatch(EventActions.getEvent(eventId, {resolve, reject}))),
});

export default connect(
  null,
  mapDispatchToProps,
)(EventItemInfo);

import { connect } from 'react-redux';

import ProfileActions from 'src/stores/profile/Actions';
import CompleteSignUp from './CompleteSignUp';
import StartupActions from 'src/stores/startup/Actions';
import { selectProfileIsLoading } from '../../stores/profile/Selectors';

const mapStateToProps = (state) => ({
  profile: state.profile,
  profileIsLoading: selectProfileIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (profile) => new Promise((resolve, reject) => dispatch(ProfileActions.updateProfile(profile, {
    resolve,
    reject,
  }))),
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompleteSignUp);

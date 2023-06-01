import { connect } from 'react-redux';

import SignUp from './SignUp';
import AuthActions from 'src/stores/auth/Actions';
import { selectProfileIsLoading } from '../../stores/profile/Selectors';

const mapStateToProps = (state) => ({
  profile: state.profile,
  profileIsLoading: selectProfileIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  signUpUser: (data) => new Promise((resolve, reject) => dispatch(AuthActions.userSignUp(data, { resolve, reject }))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

import {connect} from 'react-redux';
import Login from './Login';
import AuthActions from 'src/stores/auth/Actions';

const mapStateToProps = (state) => ({
    startup: state.startup,
});

const mapDispatchToProps = (dispatch) => ({
    loginUser: (email, password) => new Promise((resolve, reject) => dispatch(AuthActions.userLogin(email, password, {resolve, reject}))),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

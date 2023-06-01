import {connect} from 'react-redux';
import TopTabTitle from './TopTabTitle';

const mapStateToProps = (state) => ({
	profile: state.profile,
	config: state.config,
	settings: state.settings,
});


export default connect(
	mapStateToProps,
	null,
)(TopTabTitle);

import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
	fetchProfile: ['resolver'],
  updateProfile: ['profile', 'resolver'],
	profileLoadingStart: null,
	profileLoadingEnd: null,
	fetchProfileSuccess: ['data'],
	fetchProfileFailure: ['errorMessage'],
});

export const ProfileTypes = Types;
export default Creators;

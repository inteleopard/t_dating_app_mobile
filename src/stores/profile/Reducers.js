import {createReducer} from 'reduxsauce';
import {ProfileTypes} from './Actions';
import {AuthTypes} from '../auth/Actions';

const INITIAL_STATE = {
	profileData: {
	},
	loadingCounter: 0,
	profileErrorMessage: null,
};

export const saveProfileToReducer = (state, {data}) => ({
	...state,
	profileData: {
		...state.profileData,
		...data,
	},
	profileErrorMessage: null,
});

export const profileLoadingStart = state => ({
	...state,
	loadingCounter: state.loadingCounter + 1,
});

export const profileLoadingEnd = state => {
	const counter = state.loadingCounter - 1;

	return ({
		...state,
		loadingCounter: (counter >= 0) ? counter : 0,
	});
};

export const fetchProfileFailure = (state, {errorMessage}) => ({
	...state,
	profileErrorMessage: errorMessage,
});

export const profileReducer = createReducer(INITIAL_STATE, {
	[ProfileTypes.FETCH_PROFILE_SUCCESS]: saveProfileToReducer,
	[ProfileTypes.PROFILE_LOADING_START]: profileLoadingStart,
	[ProfileTypes.PROFILE_LOADING_END]: profileLoadingEnd,
	[ProfileTypes.FETCH_PROFILE_FAILURE]: fetchProfileFailure,
	[AuthTypes.RESET_REDUCER]: () => INITIAL_STATE,
});

import {createReducer} from 'reduxsauce';
import {StartupTypes} from './Actions';

const INITIAL_STATE = {
	loading: false,
};

export const setLoading = (state, {loading}) => ({
	...state,
	loading,
});

export const startupReducer = createReducer(INITIAL_STATE, {
	[StartupTypes.SET_LOADING]: setLoading,
});

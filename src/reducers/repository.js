/* eslint-disable import/no-anonymous-default-export */
import { SEARCH_REPOS, SET_LOADING } from '../utils/types';

export default (state, action) => {
	switch (action.type) {
		case SEARCH_REPOS:
			return {
				...state,
				repos: action.payload,
				loading: false
			}
		case SET_LOADING:
			return {
				...state,
				loading: true,
			}
		default:
			return state;
	}
}
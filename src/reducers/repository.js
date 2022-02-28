/* eslint-disable import/no-anonymous-default-export */
import { SEARCH_REPOS, SET_LOADING, SET_REPO, SET_WARNING, SET_ERROR } from '../utils/types';

export default (state, action) => {
	if (action.payload) console.log("state action:", action.payload);
	switch (action.type) {
		case SEARCH_REPOS:
			return {
				...state,
				repos: action.payload,
				loading: false,
				warning: false,
				error: false
			}
		case SET_LOADING:
			return {
				...state,
				loading: true,
				warning: false,
				error: false
			}
		case SET_REPO:
			return {
				...state,
				repo: action.payload,
				loading: false,
				warning: false,
				error: false
			}
		case SET_WARNING:
			return {
				...state,
				loading: false,
				warning: true,
				error: true
			}
		case SET_ERROR:
			return {
				...state,
				loading: false,
				warning: false,
				error: true
			}
		default:
			return state;
	}
}
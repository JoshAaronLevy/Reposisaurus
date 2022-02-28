/* eslint-disable import/no-anonymous-default-export */
import { SEARCH_REPOS, SET_LOADING, GET_REPOS, GET_REPO } from '../utils/types';

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
		case GET_REPOS:
			return {
				...state,
				repo: action.payload,
				loading: false,
			}
		case GET_REPO:
			return {
				...state,
				repos: action.payload,
				loading: false,
			}
		default:
			return state;
	}
}
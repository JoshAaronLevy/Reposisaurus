/* eslint-disable import/no-anonymous-default-export */
import * as lodash from "lodash";
import {
	GET_REPO,
	SEARCH_REPOS,
	SET_LOADING,
	SET_REPO,
	SET_ERROR,
	UPDATE_SEARCH_INPUT,
	UPDATE_SEARCH_FILTERS,
	UPDATE_SEARCH_SORT,
	UPDATE_SEARCH_HISTORY,
	UPDATE_RECENTLY_VIEWED
} from '../utils/types';

export default (state, action) => {
	let stateObj = {};
	if (action.payload) console.log("action:", action.payload);
	if (action.type === SEARCH_REPOS) {
		stateObj = {
			...state,
			repos: action.payload,
			loading: false,
			warning: false,
			error: false
		}
	} else if (action.type === GET_REPO) {
		stateObj = {
			...state,
			repo: action.payload
		}
	} else if (action.type === SET_REPO) {
		stateObj = {
			...state,
			repo: action.payload,
			loading: false,
			warning: false,
			error: false
		}
	} else if (action.type === SET_LOADING) {
		stateObj = {
			...state,
			loading: true,
			warning: false,
			error: false
		}
	} else if (action.type === SET_ERROR) {
		stateObj = {
			...state,
			loading: false,
			warning: false,
			error: true
		}
	} else if (action.type === UPDATE_SEARCH_INPUT) {
		let stateQuery = lodash.cloneDeep(state.searchQuery);
		stateQuery.input = action.searchInput;
		stateObj = {
			...state,
			searchQuery: stateQuery
		}
	} else if (action.type === UPDATE_SEARCH_FILTERS) {
		let stateQuery = lodash.cloneDeep(state.searchQuery);
		stateQuery.filter = action.filter;
		stateObj = {
			...state,
			searchQuery: stateQuery
		}
	} else if (action.type === UPDATE_SEARCH_SORT) {
		let stateQuery = lodash.cloneDeep(state.searchQuery);
		stateQuery.sortData = action.sortData;
		stateObj = {
			...state,
			searchQuery: stateQuery
		}
	} else if (action.type === UPDATE_SEARCH_HISTORY) {
		let stateQuery = lodash.cloneDeep(state.searchQuery);
		let currentHistory = stateQuery.history;
		currentHistory.unshift(action.searchInput);
		let uniqueSearches = [];
		if (stateQuery.history && stateQuery.history.length > 0) {
			uniqueSearches = [...new Set(stateQuery.history)];
		}
		stateObj = {
			...state,
			stateQuery: {
				history: uniqueSearches
			}
		}
		console.log("search history:", uniqueSearches);
	} else if (action.type === UPDATE_RECENTLY_VIEWED) {
		let currentViewHistory = lodash.cloneDeep(state.recentlyViewed);
		currentViewHistory.unshift(action.repository);
		let uniqueHistory = [];
		if (currentViewHistory && currentViewHistory.length > 0) {
			uniqueHistory = [...new Set(currentViewHistory)];
		}
		stateObj = {
			...state,
			recentlyViewed: uniqueHistory
		}
		console.log("recently viewed:", uniqueHistory);
	} else {
		stateObj = {};
	}
	state = stateObj;
	console.log("state:", state);
	return state;
}
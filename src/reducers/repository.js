/* eslint-disable import/no-anonymous-default-export */
import * as lodash from "lodash";
import {
	SEARCH_REPOS,
	SET_LOADING,
	SET_REPOS,
	SET_REPO,
	SET_ERROR,
	UPDATE_SEARCH_INPUT,
	UPDATE_SEARCH_FILTERS,
	UPDATE_SEARCH_SORT,
	UPDATE_RECENTLY_VIEWED
} from '../utils/types';

export default (state, action) => {
	let stateObj = {};
	// if (action.payload) console.trace("action:", action.payload);
	if (action.type === SEARCH_REPOS) {
		stateObj = {
			...state,
			repositories: action.payload,
			loading: false,
			warning: false,
			error: {}
		}
	} else if (action.type === SET_REPOS) {
		stateObj = {
			...state,
			filteredRepos: action.payload,
			loading: false,
			warning: false,
			error: {}
		}
	} else if (action.type === SET_REPO) {
		stateObj = {
			...state,
			selectedRepo: action.payload,
			loading: false,
			warning: false,
			error: {}
		}
	} else if (action.type === SET_LOADING) {
		const loadingState = action.payload;
		stateObj = {
			...state,
			loading: loadingState
		}
	} else if (action.type === SET_ERROR) {
		let errorResponse = action.payload;
		stateObj = {
			...state,
			error: errorResponse
		}
	} else if (action.type === UPDATE_SEARCH_INPUT) {
		let stateQuery = lodash.cloneDeep(state.searchQuery);
		const queryInput = action.payload;
		stateQuery.history.unshift(action.payload);
		const uniqueHistory = [...new Set(stateQuery.history)];
		stateObj = {
			...state,
			searchQuery: {
				input: queryInput,
				history: uniqueHistory
			}
		}
	} else if (action.type === UPDATE_SEARCH_FILTERS) {
		let stateQuery = lodash.cloneDeep(state.searchQuery);
		stateQuery.filter = action.payload;
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
	} else {
		stateObj = {};
	}
	// console.trace("state after:", stateObj);
	return stateObj;
}
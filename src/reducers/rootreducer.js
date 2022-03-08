import * as lodash from "lodash";

function createReducer(intialState, handlers) {
	return function reducer(state = intialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action);
		} else {
			return state;
		}
	};
}

export const rootReducer = createReducer([], {
	UPDATE_LOADING_STATE: (state, action) => {
		const loadingVal = action.loading;
		return Object.assign({}, state, {
			loading: loadingVal,
		});
	},
	UPDATE_ERROR_STATE: (state, action) => {
		const errorVal = action.error;
		let repos = [];
		let filteredRepos = [];
		if (errorVal) {
			repos = state.repositories;
			filteredRepos = state.filteredRepos;
		} else {
			repos = [];
			filteredRepos = [];
		}
		return Object.assign({}, state, {
			error: errorVal,
			warning: null,
			repositories: repos,
			filteredRepos: filteredRepos
		});
	},
	UPDATE_WARNING_STATE: (state, action) => {
		const warningVal = action.warning;
		return Object.assign({}, state, {
			error: null,
			warning: warningVal,
		});
	},
	CLEAR_MESSAGES: (state) => {
		return Object.assign({}, state, {
			error: null,
			warning: null,
		});
	},
	UPDATE_REPOSITORIES: (state, action) => {
		const repos = action.repositories;
		return Object.assign({}, state, {
			repositories: repos,
		});
	},
	UPDATE_FILTERED_REPOS: (state, action) => {
		const repos = action.filteredRepos;
		return Object.assign({}, state, {
			filteredRepos: repos,
		});
	},
	UPDATE_QUERY_INPUT: (state, action) => {
		let newQueryState = lodash.cloneDeep(state.searchQuery);
		const newVal = action.queryVal;
		newQueryState.input = newVal;
		return Object.assign({}, state, {
			searchQuery: newQueryState,
		});
	},
	UPDATE_SEARCH_HISTORY: (state, action) => {
		let newQueryState = lodash.cloneDeep(state.searchQuery);
		const newVal = action.queryVal;
		newQueryState.history.unshift(newVal);
		let uniqueHistoryValues = [...new Set(newQueryState.history)];
		newQueryState.history = uniqueHistoryValues;
		return Object.assign({}, state, {
			searchQuery: newQueryState,
		});
	},
	UPDATE_SELECTED_REPOSITORY: (state, action) => {
		const repo = action.selectedRepo;
		return Object.assign({}, state, {
			selectedRepo: repo,
		});
	},
	UPDATE_FILTER_VALUE: (state, action) => {
		let newQueryState = lodash.cloneDeep(state.searchQuery);
		const newVal = action.filterVal;
		newQueryState.filter = newVal;
		return Object.assign({}, state, {
			searchQuery: newQueryState,
		});
	},
});
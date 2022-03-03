import React, { useReducer } from 'react';
import axios from 'axios';
import appContext from './context';
import repositoryReducer from '../reducers/repository';
import {
	SEARCH_REPOS,
	SET_REPOS,
	SET_LOADING,
	SET_REPO,
	SET_ERROR,
	UPDATE_SEARCH_INPUT,
	UPDATE_SEARCH_FILTERS,
	UPDATE_SEARCH_SORT,
	UPDATE_RECENTLY_VIEWED
} from '../utils/types';

const RepositoryState = props => {
	const initialState = {
		repositories: [],
		filteredRepos: [],
		selectedRepo: {},
		loading: false,
		error: {},
		searchQuery: {
			input: '',
			filter: '',
			sort: {
				value: null,
				direction: null
			},
			history: []
		},
		recentlyViewed: []
	}

	const [state, dispatch] = useReducer(repositoryReducer, initialState);

	const searchRepos = (query) => {
		const request = axios.get(`https://api.github.com/search/repositories?q=${query}`);
		return request
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					setRepos(response.data.items);
					setSearchInput(query);
				} else {
					if (response.data.message) {
						setError(response.data.message);
					} else {
						setError(response);
					}
				}
				setLoading(false);
				return response;
			})
			.catch(function (error) {
				setError(error);
				console.log(error);
			});
	};

	const searchRepo = (owner, repo) => {
		const request = axios.get(`https://api.github.com/repos/${owner}/${repo}`);
		return request
			.then((response) => {
				let selectedRepo = {};
				if (response.status >= 200 && response.status < 300) {
					setRepo(selectedRepo);
				} else {
					if (response.data.message) {
						setError(response.data.message);
					} else {
						setError(response);
					}
				}
				setLoading(false);
				return selectedRepo;
			})
			.catch(function (error) {
				setError(error);
				console.log(error);
			});
	};

	const setSearchInput = async (query) => {
		await dispatch({
			type: UPDATE_SEARCH_INPUT,
			payload: query
		});
	};

	const setSearchFilters = async (filter) => {
		await dispatch({
			type: UPDATE_SEARCH_FILTERS,
			payload: filter
		});
	};

	const setSearchSort = async (sortData) => {
		await dispatch({
			type: UPDATE_SEARCH_SORT,
			payload: sortData
		});
	};

	const setRepos = async (repositories) => {
		await dispatch({
			type: SEARCH_REPOS,
			payload: repositories
		});
	};

	const setRepositories = async (repositories) => {
		await dispatch({
			type: SET_REPOS,
			payload: repositories
		});
	};

	const setRepo = async (selectedRepo) => {
		await dispatch({
			type: SET_REPO,
			payload: selectedRepo
		});
	};

	const setViewedRepo = async (selectedRepo) => {
		await dispatch({
			type: UPDATE_RECENTLY_VIEWED,
			payload: selectedRepo
		});
	};

	const setLoading = async (loadingState) => {
		await dispatch({
			type: SET_LOADING,
			payload: loadingState
		})
	};

	const setError = async (errorResponse) => {
		await dispatch({
			type: SET_ERROR,
			payload: errorResponse
		});
	};

	return <appContext.Provider
		value={
			{
				repositories: state.repositories,
				filteredRepos: state.filteredRepos,
				selectedRepo: state.selectedRepo,
				loading: state.loading,
				searchQuery: state.searchQuery,
				searchRepos,
				searchRepo,
				setSearchInput,
				setSearchFilters,
				setSearchSort,
				setRepositories,
				setRepo,
				setViewedRepo,
				setError,
				setLoading
			}
		}
	>
		{props.children}
	</appContext.Provider>
}

export default RepositoryState;
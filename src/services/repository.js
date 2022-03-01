import React, { useReducer } from 'react';
import axios from 'axios';
import appContext from './context';
import repositoryReducer from '../reducers/repository';
import {
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

const RepositoryState = props => {
	const initialState = {
		repositories: [],
		filteredRepos: [],
		selectedRepo: null,
		loading: false,
		error: false,
		searchQuery: {
			input: null,
			filter: null,
			sort: {
				value: null,
				direction: null
			},
			history: []
		},
		recentlyViewed: []
	}

	const [state, dispatch] = useReducer(repositoryReducer, initialState);

	const searchRepos = (text) => {
		const request = axios.get(`https://api.github.com/search/repositories?q=${text}`);
		return request
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					setRepos(response.data.items);
					setSearchInput(text);
					setSearchHistory(text);
				}
				return response;
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const searchRepo = async (owner, repo) => {
		const request = axios.get(`https://api.github.com/repos/${owner}/${repo}`);
		await request
			.then((response) => {
				let selectedRepo = {};
				if (response.status >= 200 && response.status < 300) {
					selectedRepo = response.data;
					setRepo(selectedRepo);
				}
				return selectedRepo;
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const setLoading = async () => await dispatch({ type: SET_LOADING });

	const setSearchInput = async (text) => {
		await dispatch({
			type: UPDATE_SEARCH_INPUT,
			payload: text
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

	const setSearchHistory = async (text) => {
		await dispatch({
			type: UPDATE_SEARCH_HISTORY,
			payload: text
		});
	};

	const setRepos = async (repositories) => {
		await dispatch({
			type: SEARCH_REPOS,
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

	const setError = async (error) => {
		await dispatch({
			type: SET_ERROR,
			payload: error
		});
	};

	return <appContext.Provider
		value={
			{
				repositories: state.repositories,
				selectedRepo: state.selectedRepo,
				loading: state.loading,
				searchQuery: state.searchQuery,
				searchRepos,
				searchRepo,
				setSearchInput,
				setSearchFilters,
				setSearchSort,
				setSearchHistory,
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
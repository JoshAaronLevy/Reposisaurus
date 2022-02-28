import React, { useReducer } from 'react';
import axios from 'axios';
import apiContext from './context';
import repositoryReducer from '../reducers/repository';
import { SEARCH_REPOS, SET_LOADING, SET_REPO, SET_WARNING, SET_ERROR } from '../utils/types';

const RepositoryState = props => {
	const initialState = {
		repos: [],
		repo: {},
		loading: false,
		error: false,
		toast: null
	}

	const [state, dispatch] = useReducer(repositoryReducer, initialState);

	const searchRepos = async (text) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/search/repositories?q=${text}`
		);
		dispatch({
			type: SEARCH_REPOS,
			payload: res.data.items
		});
	};

	const setLoading = () => dispatch({ type: SET_LOADING })

	const setRepo = async (selectedRepo) => {
		console.log(selectedRepo);
		dispatch({
			type: SET_REPO,
			payload: selectedRepo
		});
	};

	const setError = async (error) => {
		dispatch({
			type: SET_ERROR,
			payload: error
		});
	};

	return <apiContext.Provider
		value={
			{
				repos: state.repos,
				repo: state.repo,
				loading: state.loading,
				searchRepos,
				setRepo,
				setError
			}
		}
	>
		{props.children}
	</apiContext.Provider>
}

export default RepositoryState;
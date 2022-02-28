import React, { useReducer } from 'react';
import axios from 'axios';
import apiContext from './context';
import repositoryReducer from '../reducers/repository';
import { SEARCH_REPOS, SET_LOADING } from '../utils/types';

const RepositoryState = props => {
	const initialState = {
		repos: [],
		repo: {},
		loading: false
	}

	const [state, dispatch] = useReducer(repositoryReducer, initialState);

	const searchRepos = async text => {
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

	return <apiContext.Provider
		value={
			{
				repos: state.repos,
				repo: state.repo,
				loading: state.loading,
				searchRepos
			}
		}
	>
		{props.children}
	</apiContext.Provider>
}

export default RepositoryState;
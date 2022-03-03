import axios from "axios";
import { updateErrorState, updateLoadingState } from "../actions/rootactions";
import { getStore } from "../reducers/store";

export const getRepositories = (inputValue) => {
	const store = getStore();
	const request = axios.get(`https://api.github.com/search/repositories?q=${inputValue}`);
	return request
		.then((response) => {
			if (response.status >= 200 && response.status < 300) {
				return response.data.items;
			} else {
				if (response.data.message) {
					console.error(response.data.message);
				} else {
					console.error(response);
				}
			}
			return response;
		})
		.catch(function (error) {
			store.dispatch(updateLoadingState(false));
			store.dispatch(updateErrorState(error));
		});
};

export const getRepository = (owner, repo) => {
	const store = getStore();
	const request = axios.get(`https://api.github.com/repos/${owner}/${repo}`);
	return request
		.then((response) => {
			let selectedRepo = {};
			if (response.status >= 200 && response.status < 300) {
				selectedRepo = response;
			} else {
				if (response.data.message) {
					console.error(response.data.message);
				} else {
					console.error(response);
				}
			}
			return selectedRepo;
		})
		.catch(function (error) {
			store.dispatch(updateLoadingState(false));
			store.dispatch(updateErrorState(error));
		});
};
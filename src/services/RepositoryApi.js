import axios from "axios";
import { updateErrorState, updateFilteredRepos, updateLoadingState, updateRepositories, updateWarningState } from "../actions/rootactions";
import { getStore } from "../reducers/store";

export const getRepositories = (inputValue) => {
	const store = getStore();
	store.dispatch(updateLoadingState(true));
	const request = axios.get(`https://api.github.com/search/repositories?q=${inputValue}`);
	return request
		.then((response) => {
			if (response.status >= 200 && response.status < 300) {
				if (response.data.items.length === 0) {
					store.dispatch(updateWarningState("No repositories found! But don't give up. Try again."));
				}
				store.dispatch(updateErrorState(null));
				store.dispatch(updateRepositories(response.data.items));
				store.dispatch(updateFilteredRepos(response.data.items));
				return response.data.items;
			} else {
				if (response.data.message) {
					console.error(response.data.message);
					store.dispatch(updateErrorState(response.data.message));
				} else {
					console.error(response);
					store.dispatch(updateErrorState(response));
				}
			}
			store.dispatch(updateLoadingState(false));
			return response;
		})
		.catch(function (error) {
			store.dispatch(updateRepositories([]));
			store.dispatch(updateFilteredRepos([]));
			store.dispatch(updateErrorState("Looks like the chefs in the kitchen are still preparing those results. We'll check again in:"));
			store.dispatch(updateLoadingState(false));
			console.error(error);
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
				store.dispatch(updateWarningState(null));
				store.dispatch(updateErrorState(null));
			} else {
				if (response.data.message) {
					console.error(response.data.message);
					store.dispatch(updateErrorState(response.data.message));
				} else {
					console.error(response);
					store.dispatch(updateErrorState(response));
				}
			}
			return selectedRepo;
		})
		.catch(function (error) {
			store.dispatch(updateLoadingState(false));
			store.dispatch(updateErrorState(error));
		});
};
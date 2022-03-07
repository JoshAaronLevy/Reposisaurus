import React, { useState, useEffect } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import { getRepositories } from '../services/RepositoryApi';

const SearchBar = ({
	loading,
	inputVal,
	searchHistory,
	updateLoadingState,
	updateQueryInput,
	updateSelectedRepository,
	updateFilterValue,
	updateFilteredRepos,
	updateSearchHistory,
	updateRepositories,
	clearMessages
}) => {
	const [query, setQuery] = useState('');
	const [queryOptions, setQueryOptions] = useState([]);
	const [searchDisabled, setSearchDisabled] = useState(true);
	const history = useHistory();

	useEffect(() => {
		if (!query || query === inputVal || loading) {
			setSearchDisabled(true);
		} else {
			setSearchDisabled(false);
		}
	}, [loading, query, inputVal]);

	const setSearchVal = async (e) => {
		let inputValue = e.target.value;
		setQuery(inputValue);
	}

	const filterQueries = (event) => {
		setQueryOptions(searchHistory);
	}

	const selectFromHistory = (event) => {
		let inputValue = event.value;
		initiateSearch(inputValue);
	}

	const keyUpAction = (event) => {
		event.preventDefault();
		if (event.code === "Enter" && query !== inputVal) {
			initiateSearch(query);
		}
	}

	const submitSearch = (event, inputValue) => {
		event.preventDefault();
		initiateSearch(inputValue);
	}

	const initiateSearch = (inputValue) => {
		clearMessages();
		updateLoadingState(true);
		updateQueryInput(inputValue);
		updateSelectedRepository({});
		updateFilterValue('');
		searchRepositories(inputValue);
	}

	const searchRepositories = async (inputValue) => {
		let repos = [];
		const params = new URLSearchParams();
		if (query) {
			params.append("name", query);
		} else {
			params.delete("name");
		}
		history.push({ search: params.toString() });
		await getRepositories(inputValue).then(response => {
			if (response) {
				repos = response;
				if (response.length > 0) {
					updateSearchHistory(inputValue);
				}
				updateLoadingState(false);
				updateRepositories(repos);
				updateFilteredRepos(repos);
			}
		});
	}

	return (
		<div className="grid surface-0 text-800 mb-5 justify-content-center">
			<section className='col-12 hero-section'>
				<span className="block text-3xl font-bold mb-4 hero-title">Search GitHub Repositories</span>
				<form onSubmit={(event) => { submitSearch(event, query) }}>
					<div className="p-inputgroup search-form">
						<AutoComplete id='repoSearch' value={query} suggestions={queryOptions} completeMethod={filterQueries} onChange={(event) => { setSearchVal(event) }} onSelect={(event) => { selectFromHistory(event) }} onKeyUp={(event) => { keyUpAction(event, query) }} placeholder="Search by Repo Name..." />
						<Button className='search-button' disabled={searchDisabled} type="submit" label="Search" />
					</div>
				</form>
			</section>
		</div>
	);
}

export default SearchBar;
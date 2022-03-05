import React, { useState, useEffect } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { useHistory, useParams } from 'react-router-dom';
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
	updateRepositories
}) => {
	const [query, setQuery] = useState('');
	const [queryOptions, setQueryOptions] = useState([]);
	const history = useHistory();
	let { search } = useParams();

	useEffect(() => {
		const params = new URLSearchParams();
		if (query) {
			params.append("name", query);
		} else {
			params.delete("name");
		}
		history.push({ search: params.toString() });
	}, [query, inputVal, history, search]);

	const setSearchVal = async (e) => {
		let inputValue = e.target.value;
		setQuery(inputValue);
	}

	const filterQueries = (event) => {
		setQueryOptions(searchHistory);
	}

	const selectFromHistory = (event) => {
		let inputValue = event.value;
		resetSearch(inputValue);
	}

	const keyUpAction = (event) => {
		event.preventDefault();
		if (event.code === "Enter" && query !== inputVal) {
			resetSearch(query);
		}
	}

	const submitSearch = (event, inputValue) => {
		event.preventDefault();
		resetSearch(inputValue);
	}

	const resetSearch = (inputValue) => {
		updateLoadingState(true);
		updateQueryInput(inputValue);
		updateSelectedRepository({});
		updateFilterValue('');
		searchRepositories(inputValue);
	}

	const searchRepositories = async (inputValue) => {
		await getRepositories(inputValue).then(response => {
			if (response) {
				const repos = response;
				updateLoadingState(false);
				updateSearchHistory(inputValue);
				updateRepositories(repos);
				updateFilteredRepos(repos);
			}
		});
	}

	return (
		<div className="grid surface-0 text-800 mb-5 justify-content-center">
			<section className='col-12 hero-section'>
				<span className="block text-3xl font-bold mb-4">Search GitHub Repositories</span>
				<form onSubmit={(event) => { submitSearch(event, query) }}>
					<div className="p-inputgroup search-form">
						<AutoComplete value={query} suggestions={queryOptions} completeMethod={filterQueries} onChange={(event) => { setSearchVal(event) }} onSelect={(event) => { selectFromHistory(event) }} onKeyUp={(event) => { keyUpAction(event, query) }} placeholder="Search by Repo Name..." />
						<Button disabled={!query || loading || query === inputVal} type="submit" label="Search" />
					</div>
				</form>
			</section>
		</div>
	);
}

export default SearchBar;
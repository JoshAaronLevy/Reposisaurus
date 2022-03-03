import React, { useState, useContext, useEffect } from 'react';
import appContext from '../services/context';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useHistory, useParams } from 'react-router-dom';

const Search = () => {
	const [query, setQuery] = useState('');
	const appState = useContext(appContext);
	let loading = appState.loading;
	const history = useHistory();
	const currentQuery = appState.searchQuery.input;
	const params = new URLSearchParams();
	let { queryInput } = useParams();

	useEffect(() => {
		if (queryInput) {
			setQuery(queryInput);
		}
	}, [queryInput]);

	const onChange = e => {
		setQuery(e.target.value);
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		await appState.setLoading(true);
		setQuery(query);
		return getRepositories(query);
	}

	const getRepositories = async (queryInput) => {
		let searchResults = [];
		if (queryInput) {
			params.append("queryInput", queryInput);
			await appState.searchRepos(queryInput).then(response => {
				if (response && response.data && response.data.items) {
					searchResults = response.data.items;
				}
			});
		} else {
			params.delete("queryInput");
		}
		history.push(`/search/${queryInput}`);
		return searchResults;
	}

	return (
		<div className="grid surface-0 text-800 mb-5">
			<div className="col-12 hero-section">
				<section className='hero-search'>
					<span className="block text-3xl font-bold mb-4">Search GitHub Repositories</span>
					<form onSubmit={onSubmit}>
						<div className="p-inputgroup">
							<InputText value={query} onChange={onChange} placeholder="Search Repos By Name..." />
							<Button disabled={loading || !query || (query === currentQuery)} label="Search" />
						</div>
					</form>
				</section>
			</div>
		</div>
	);
}

export default Search;
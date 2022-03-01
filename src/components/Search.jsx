import React, { useState, useContext } from 'react';
import appContext from '../services/context';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Search = () => {
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const appState = useContext(appContext);

	const onChange = e => {
		setText(e.target.value);
	}

	const onSubmit = async (e) => {
		await setLoading(true);
		let searchResults = [];
		e.preventDefault();
		if (text) searchResults = await appState.searchRepos(text);
		setText('');
		await setLoading(false);
		return searchResults;
	}

	return (
		<div className="grid surface-0 text-800 mb-5">
			<div className="col-12 hero-section">
				<section className='hero-search'>
					<span className="block text-3xl font-bold mb-4">Search GitHub Repositories</span>
					<form onSubmit={onSubmit}>
						<div className="p-inputgroup">
							<InputText value={text} onChange={onChange} placeholder="Search Repos By Name..." />
							<Button disabled={loading || !text} label="Search" />
						</div>
					</form>
				</section>
			</div>
		</div>
	);
}

export default Search;
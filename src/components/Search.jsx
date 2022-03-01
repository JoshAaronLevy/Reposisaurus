import React, { useState, useContext } from 'react';
import apiContext from '../services/context';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Search = () => {
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const api = useContext(apiContext);

	const onChange = e => {
		setText(e.target.value);
	}

	const onSubmit = async (e) => {
		await setLoading(true);
		let searchResults = [];
		e.preventDefault();
		if (text) {
			searchResults = await api.searchRepos(text);
		}
		setText('');
		await setLoading(false);
		return searchResults;
	}

	return (
		<div className="grid surface-0 text-800 mb-5">
			<div className="col-12 hero-section">
				<section className='hero-search'>
					<span className="block text-4xl font-bold mb-2">Repo Runner</span>
					<div className="text-2xl text-primary font-bold mb-4">Search GitHub Repositories</div>
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
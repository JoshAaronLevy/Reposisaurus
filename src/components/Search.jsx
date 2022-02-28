import React, { useState, useContext } from 'react';
import apiContext from '../services/context';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Search = () => {
	const [text, setText] = useState('');
	const api = useContext(apiContext);

	const onChange = e => {
		setText(e.target.value);
	}

	const onSubmit = async (e) => {
		let searchResults = [];
		e.preventDefault();
		if (text) {
			searchResults = await api.searchRepos(text);
		} else {
			api.searchRepos(text);
		}
		setText('');
		console.log(searchResults);
	}

	return (
		<div className="grid surface-0 text-800 mb-5">
			<div className="col-12 hero-section">
				<section className='hero-search'>
					<span className="block text-4xl font-bold mb-1">Reposisaurus</span>
					<div className="text-3xl text-primary font-bold mb-3">your visitors deserve to see</div>
					<form onSubmit={onSubmit}>
						<div className="p-inputgroup">
							<InputText value={text} onChange={onChange} placeholder="Search GitHub Repos..." />
							<Button label="Search" />
						</div>
					</form>
				</section>
			</div>
		</div>
	);
}

export default Search;
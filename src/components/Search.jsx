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

	const onSubmit = (e) => {
		e.preventDefault();
		api.searchRepos(text);
		setText('');
	}

	return (
		<div>
			<div className="card">
				<div className="grid p-fluid">
					<div className="col-12 md:col-4">
						<form onSubmit={onSubmit}>
							<div className="p-inputgroup">
								<InputText value={text} onChange={onChange} placeholder="Search GitHub Repos..." />
								<Button label="Search" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Search;
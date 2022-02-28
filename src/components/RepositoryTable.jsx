import React, { useState, useContext } from 'react';
import apiContext from '../services/context';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import "../styles/table.scss";
import * as fuzzysort from "fuzzysort";

const RepositoryTable = () => {
	const api = useContext(apiContext);
	let { repos } = api;
	const [filters, setFilters] = useState(null);
	const [globalFilterValue, setGlobalFilterValue] = useState('');

	const renderHeader = () => {
		return (
			<div className="flex justify-content-end">
				<span className="p-input-icon-left mr-2">
					<i className="pi pi-search" />
					<InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Filter by Language" />
				</span>
				<Button type="button" disabled={!globalFilterValue} icon="pi pi-filter-slash" label="Clear" className="p-button-danger" onClick={clearFilter} />
			</div>
		)
	}

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		const filteredRepos = fuzzysort.goAsync(value, repos, { key: 'language' });
		filteredRepos.then(results => {
			repos = results;
		});
		setGlobalFilterValue(value);
	}

	const clearFilter = () => {
		initFilters();
	}

	const initFilters = () => {
		setFilters({
			'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
			'language': { value: null, matchMode: FilterMatchMode.CONTAINS }
		});
		setGlobalFilterValue('');
	}

	const header = renderHeader();

	if (repos && repos.length > 0) {
		return (
			<div className='container-padded'>
				<div className="card">
					<DataTable value={repos} paginator className="p-datatable-customers" stripedRows rows={25}
						dataKey="id" filters={filters} filterDisplay="menu" responsiveLayout="scroll"
						globalFilterFields={['language']} header={header} emptyMessage="No repositories found.">
						<Column field="name" header="Name" />
						<Column field="owner.login" header="Owner" />
						<Column field="created_at" header="Created On" />
						<Column field="language" header="Language" />
						<Column field="stargazers_count" header="Stars" />
					</DataTable>
				</div>
			</div>
		);
	} else {
		return (
			<div></div>
		);
	}
}

export default RepositoryTable;
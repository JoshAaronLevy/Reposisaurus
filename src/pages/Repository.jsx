import React, { useState, useContext, useRef } from 'react';
import apiContext from '../services/context';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import "../styles/table.scss";
import * as fuzzysort from "fuzzysort";

const Repository = () => {
	const api = useContext(apiContext);
	let { repos } = api;
	const [filters, setFilters] = useState(null);
	const [selectedRepo, setSelectedRepo] = useState(null);
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const toast = useRef(null);

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

	const onRowSelect = async (event) => {
		await onRowUnselect();
		await setSelectedRepo(event.data);
		await api.setRepo(event.data);
		const repoDesc = event.data.description;
		if (repoDesc && repoDesc.length > 100) {
			event.data.description = event.data.description.substring(0, 97) + "...";
		}
		await showConfirm(event.data);
	}

	const onRowUnselect = async () => {
		await toast.current.clear();
		await setSelectedRepo(null);
		await api.setRepo(null);
	}

	const showConfirm = (currentRepo) => {
		toast.current.show({
			severity: 'info',
			sticky: true,
			closable: false,
			content: (
				<div className="flex flex-column" style={{ flex: '1' }}>
					<div className="text-center">
						<h3 className='toast-title'>{currentRepo.name} by {currentRepo.owner.login}</h3>
						{currentRepo.description && (
							<p>{currentRepo.description}</p>
						)}
					</div>
					<div className="grid p-fluid flex justify-content-around">
						<div className="col-4">
							<Button type="button" label="View Repo" className="p-button-success" />
						</div>
						<div className="col-4">
							<Button type="button" label="Close" className="p-button-danger" onClick={onRowUnselect} />
						</div>
					</div>
				</div>
			)
		});
	}

	if (repos && repos.length > 0) {
		return (
			<div className='container-padded'>
				<Toast ref={toast} position="bottom-right" />
				<div className="card">
					<DataTable value={repos} paginator className="p-datatable-customers" stripedRows rows={50}
						dataKey="id" selectionMode="single" selection={selectedRepo} onSelectionChange={e => setSelectedRepo(e.value)} filters={filters} filterDisplay="menu" responsiveLayout="scroll"
						globalFilterFields={['language']} header={header} emptyMessage="No repositories found." onRowSelect={onRowSelect} onRowUnselect={onRowUnselect}>
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

export default Repository;
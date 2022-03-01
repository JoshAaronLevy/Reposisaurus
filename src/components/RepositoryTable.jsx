import React, { useState, useContext, useRef } from 'react';
import { useHistory } from "react-router-dom";
import appContext from '../services/context';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import "../styles/table.scss";
import * as fuzzysort from "fuzzysort";
import Moment from 'react-moment';

const RepositoryTable = () => {
	const appState = useContext(appContext);
	let { repos } = appState;
	let selectedRepo = appState.repo;
	const [filters, setFilters] = useState(null);
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const toast = useRef(null);
	let navigate = useHistory();

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

	const formatDate = (value) => {
		return (
			<Moment format="MM/DD/YYYY">
				{value}
			</Moment>
		)
	}

	const header = renderHeader();

	const dateTransformTemplate = (rowData) => {
		return formatDate(rowData.created_at);
	}

	const onRowSelect = async (event) => {
		await toast.current.clear();
		console.log("event", event);
		await appState.setRepo(event.data);
		const repoDesc = event.data.description;
		if (repoDesc && repoDesc.length > 100) {
			event.data.description = event.data.description.substring(0, 97) + "...";
		}
		showConfirm(event.data);
	}

	const onRowUnselect = async () => {
		await toast.current.clear();
		// await setSelectedRepo(null);
		// await api.setRepo(null);
	}

	const viewRepo = async (selectedRepo) => {
		console.log("appState.repo", appState.repo);
		console.log("selectedRepo", selectedRepo);
		// await api.setViewedRepo(selectedRepo);
		const repoPath = `/repo/${selectedRepo.owner.login}/${selectedRepo.name}`;
		console.log(repoPath);
		navigate.push(repoPath);
	}

	const showConfirm = (selectedRepo) => {
		toast.current.show({
			severity: 'info',
			sticky: true,
			closable: false,
			content: (
				<div className="flex flex-column" style={{ flex: '1' }}>
					<div className="text-center">
						<h3 className='toast-title'>{selectedRepo.name} by {selectedRepo.owner.login}</h3>
						{selectedRepo.description && (
							<p>{selectedRepo.description}</p>
						)}
					</div>
					<div className="grid p-fluid flex justify-content-around">
						<div className="col-4">
							<Button
								type="button"
								label="View Repo"
								className="p-button-success"
								onClick={() => { viewRepo(selectedRepo) }} />
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
						dataKey="id" selectionMode="single" selection={selectedRepo} filters={filters} filterDisplay="menu" responsiveLayout="scroll"
						globalFilterFields={['language']} header={header} emptyMessage="No repositories found." onRowSelect={onRowSelect} onRowUnselect={onRowUnselect}>
						<Column field="name" header="Name" />
						<Column field="owner.login" header="Owner" />
						<Column field="created_at" header="Created On" body={dateTransformTemplate} />
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
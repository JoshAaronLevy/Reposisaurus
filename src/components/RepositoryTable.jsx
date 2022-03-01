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
	let { repositories } = appState;
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

	const onGlobalFilterChange = async (e) => {
		const value = e.target.value;
		const filteredRepos = fuzzysort.goAsync(value, repositories, { key: 'language' })
		await filteredRepos.then(results => {
			repositories = results;
			setGlobalFilterValue(value);
		});
		await appState.searchRepos(value);
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
		await appState.setRepo(event.data);
		const repoDesc = event.data.description;
		if (repoDesc && repoDesc.length > 100) {
			event.data.description = event.data.description.substring(0, 97) + "...";
		}
		showConfirm(event.data);
	}

	const onRowUnselect = async () => {
		await toast.current.clear();
	}

	const viewRepo = async (selectedRepo) => {
		navigate.push(`/repo/${selectedRepo.owner.login}/${selectedRepo.name}`);
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

	if (repositories && repositories.length > 0) {
		return (
			<div className='container-padded'>
				<Toast ref={toast} position="bottom-right" />
				<div className="card">
					<DataTable
						value={repositories}
						paginator
						className="p-datatable-customers"
						stripedRows
						rows={50}
						dataKey="id"
						selectionMode="single"
						selection={selectedRepo}
						filters={filters}
						filterDisplay="menu"
						responsiveLayout="scroll"
						globalFilterFields={['language']}
						header={header}
						emptyMessage="No repositories found."
						onRowSelect={onRowSelect}
						onRowUnselect={onRowUnselect}
						removableSort>
						<Column field="name" header="Name" />
						<Column field="owner.login" header="Owner" />
						<Column field="created_at" header="Created On" body={dateTransformTemplate} />
						<Column field="language" header="Language" />
						<Column field="stargazers_count" header="Stars" sortable />
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
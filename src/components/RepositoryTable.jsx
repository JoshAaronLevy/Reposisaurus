import React, { useState, useContext } from 'react';
import apiContext from '../services/context';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { classNames } from 'primereact/utils';
import { FilterMatchMode } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';

const RepositoryTable = () => {
	const api = useContext(apiContext);
	const { repos } = api;
	const [selectedRepo, setSelectedRepo] = useState(null);
	// const [selectedLanguages, setSelectedLanguages] = useState([]);

	const languages = repos.filter(repo => {
		return repo.language;
	}).map(repo => {
		return repo.language;
	});

	const [filters2] = useState({
		'language': { value: null, matchMode: FilterMatchMode.EQUALS }
	});

	// const [globalFilterValue2, setGlobalFilterValue2] = useState('');

	const statusBodyTemplate = (rowData) => {
		return <span>{rowData.language}</span>;
	}

	// const statusFilterTemplate = (options) => {
	// 	return <Dropdown value={options.value} options={languages} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
	// }

	const statusItemTemplate = (option) => {
		return <span>{option}</span>;
	}

	const statusRowFilterTemplate = (options) => {
		return <Dropdown value={options.value} options={languages} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
	}

	return (
		<div className='container-padded'>
			<div className="card">
				<DataTable value={repos} stripedRows selection={selectedRepo} onSelectionChange={e => setSelectedRepo(e.value)} dataKey="id" filters={filters2} filterDisplay="row" responsiveLayout="stack" breakpoint="960px">
					<Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
					<Column field="name" header="Name" />
					<Column field="owner.login" header="Owner" />
					<Column field="created_at" header="Created On" />
					<Column field="language" header="Language" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
					<Column field="stargazers_count" header="Stars" />
				</DataTable>
			</div>
		</div>
	);
}

export default RepositoryTable;
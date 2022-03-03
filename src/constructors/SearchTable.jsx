import React, { Component } from 'react';
import "../styles/table.scss";
import { connect } from 'react-redux';
import { updateFilteredRepos, updateFilterValue, updateLoadingState, updateQueryInput, updateRepositories, updateSearchHistory, updateSelectedRepository } from '../actions/rootactions';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Moment from 'react-moment';
import ToastContainer from '../containers/ToastContainer';

class SearchTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			globalFilterValue: '',
			selectedRepository: {}
		};

		this.clearFilter = this.clearFilter.bind(this);
		this.onGlobalFilterChange = this.onGlobalFilterChange.bind(this);

		this.onRowSelect = this.onRowSelect.bind(this);
		this.onRowUnselect = this.onRowUnselect.bind(this);

		this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
		this.dateTransformTemplate = this.dateTransformTemplate.bind(this);
	}

	componentDidMount() {
		this.initFilters();
	}

	onRowSelect(event) {
		const selectedRepository = event.data;
		if (this.props.selectedRepo.id !== selectedRepository.id) {
			this.props.updateSelectedRepository(selectedRepository);
		}
	}

	onRowUnselect() {
		this.props.updateSelectedRepository({});
	}

	imageBodyTemplate(rowData) {
		return <img src={rowData.owner.avatar_url} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
	}

	formatDate(value) {
		return (
			<Moment format="MM/DD/YYYY">
				{value}
			</Moment>
		)
	}

	dateTransformTemplate(rowData) {
		return this.formatDate(rowData.created_at);
	}

	clearFilter() {
		this.initFilters();
	}

	onGlobalFilterChange(e) {
		const value = e.target.value;
		this.setState({ globalFilterValue: value });
		let formattedValue = value.toLowerCase().replace(/\s\s+/g, " ");
		if (value && value.length > 0) {
			this.props.updateFilterValue(value);
			let filteredRepositories = this.props.repositories.filter(repo => {
				return repo.language && repo.language.toLowerCase().replace(/\s/g, "").includes(formattedValue.replace(/\s/g, ""));
			});
			this.props.updateFilteredRepos(filteredRepositories);
		} else {
			this.clearFilter();
			this.props.updateFilteredRepos(this.props.repositories);
		}
	}

	initFilters() {
		this.setState({
			filters: {
				'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
				'language': { value: null, matchMode: FilterMatchMode.CONTAINS },
			},
			globalFilterValue: ''
		});
	}

	selectRepository(e) {
		console.log(e.data);
		const selectedRepository = e.data;
		if (!this.props.selectedRepo || (this.props.selectedRepo.id !== selectedRepository.id)) {
			this.setState({ selectedRepository: e.data });
			this.props.updateSelectedRepository(selectedRepository);
		} else {
			this.setState({ selectedRepository: {} });
			this.props.updateSelectedRepository({});
		}
	}

	render() {
		const header = (
			<div className="flex justify-content-end">
				<span className="p-input-icon-left mr-2">
					<i className="pi pi-search" />
					<InputText value={this.props.filterVal} onChange={this.onGlobalFilterChange} placeholder="Filter by Language" />
				</span>
				<Button type="button" disabled={!this.props.filterVal} icon="pi pi-filter-slash" label="Clear" className="p-button-danger" onClick={this.clearFilter} />
			</div>
		);

		if (this.props.loading) {
			return (
				<ProgressSpinner />
			)
		} else if (!this.props.loading && (this.props.repositories && this.props.repositories.length > 0)) {
			return (
				<>
					{this.props.selectedRepo.id && (
						<ToastContainer />
					)}
					<div className='container-padded'>
						<div className="datatable-templating-demo">
							<div className="card">
								<DataTable
									value={this.props.filteredRepos}
									paginator
									className="p-datatable-customers"
									stripedRows
									rows={15}
									dataKey="id"
									selectionMode="single"
									selection={this.state.selectedRepository}
									responsiveLayout="scroll"
									globalFilterFields={['language']}
									header={header}
									emptyMessage="No repositories found."
									onRowSelect={e => this.selectRepository(e)}
									onRowUnselect={e => this.selectRepository(e)}
									removableSort>
									<Column selectionMode="single" headerStyle={{ width: '2em' }}></Column>
									<Column field="name" header="Name"></Column>
									<Column field="owner.login" header="Owner"></Column>
									<Column field="created_at" header="Created On" body={this.dateTransformTemplate}></Column>
									<Column field="language" header="Language"></Column>
									<Column field="stargazers_count" header="Stars" sortable></Column>
								</DataTable>
							</div>
						</div>
					</div>
				</>
			);
		} else {
			return (
				<></>
			)
		}
	}
}

const mapStateToProps = (state) => ({
	repositories: state.repositories,
	filteredRepos: state.filteredRepos,
	selectedRepo: state.selectedRepo,
	loading: state.loading,
	searchQuery: state.searchQuery,
	inputVal: state.searchQuery.input,
	filterVal: state.searchQuery.filter,
});

const mapDispatchToProps = (dispatch) => ({
	updateLoadingState: (loadingVal) => dispatch(updateLoadingState(loadingVal)),
	updateRepositories: (repos) => dispatch(updateRepositories(repos)),
	updateFilteredRepos: (repos) => dispatch(updateFilteredRepos(repos)),
	updateQueryInput: (inputValue) => dispatch(updateQueryInput(inputValue)),
	updateSearchHistory: (inputValue) => dispatch(updateSearchHistory(inputValue)),
	updateSelectedRepository: (repo) => dispatch(updateSelectedRepository(repo)),
	updateFilterValue: (filterValue) => dispatch(updateFilterValue(filterValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTable);
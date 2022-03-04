import React, { Component } from 'react';
import "../styles/table.scss";
import { connect } from 'react-redux';
import { updateFilteredRepos, updateFilterValue, updateLoadingState, updateQueryInput, updateRepositories, updateSearchHistory, updateSelectedRepository } from '../actions/rootactions';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FilterMatchMode } from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import Moment from 'react-moment';
import SearchToolbar from '../components/SearchToolbar';

class SearchResults extends Component {
	constructor(props) {
		super(props);

		this.state = {
			globalFilterValue: '',
			selectedRepository: {}
		};

		this.clearFilter = this.clearFilter.bind(this);
		this.onGlobalFilterChange = this.onGlobalFilterChange.bind(this);

		this.dateTransformTemplate = this.dateTransformTemplate.bind(this);
	}

	componentDidMount() {
		this.initFilters();
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
		this.props.updateFilterValue('');
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

	selectRepository(repo) {
		this.props.updateSelectedRepository(repo);
		console.log(repo);
	}

	render() {
		if (this.props.loading) {
			return (
				<ProgressSpinner />
			)
		} else if (!this.props.loading && (this.props.repositories && this.props.repositories.length > 0)) {
			return (
				<>
					<div className='container-padded'>
						<SearchToolbar />
						<div className="grid">
							{this.props.filteredRepos.map((repo) => {
								return (
									<div key={repo.id} className="col-12 md:col-6 lg:col-4 repo-card" onClick={() => { this.selectRepository(repo) }}>
										<Tooltip target=".tooltip-target"></Tooltip>
										<div className="surface-0 shadow-2 p-2 border-round repo-card-item">
											<div className="flex justify-content-between align-items-center mb-3">
												<div className='card-title-container'>
													<div className="text-900 font-medium text-xl mb-1 pl-3 text-left">{repo.name}</div>
													<span className="block text-600 font-medium mb-0 pl-3 text-left">{repo.owner.login}</span>
												</div>
												<div className="flex align-items-center justify-content-center card-img">
													<img src={repo.owner.avatar_url} alt={repo.owner.login} width="60" height="60" />
												</div>
											</div>
											<div className='col-12 repo-card-footer'>
												<span className="col-4 text-left repo-stat">
													<i className="fa-regular fa-calendar-circle-plus tooltip-target" data-pr-tooltip="Created Date" data-pr-position="top"></i><Moment format="MM/DD/YY"><p>{repo.created_at}</p></Moment></span>
												<span className="col-3 text-left repo-stat">
													<i className="fa-brands fa-github-square tooltip-target" data-pr-tooltip="Starred on GitHub" data-pr-position="top"></i><p>{repo.stargazers_count}</p></span>
												{repo.language && (
													<span className="col-5 text-left repo-stat">
														<i className="fa-regular fa-square-code"></i><p>{repo.language}</p></span>
												)}
												{!repo.language && (
													<span className="col-5 text-left repo-stat"></span>
												)}
											</div>
										</div>
									</div>
								)
							})}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
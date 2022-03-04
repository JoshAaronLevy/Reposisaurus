/* eslint-disable no-useless-constructor */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component } from 'react';
import "../styles/table.scss";
import { connect } from 'react-redux';
import { updateFilteredRepos, updateFilterValue, updateLoadingState, updateQueryInput, updateRepositories, updateSearchHistory, updateSelectedRepository } from '../actions/rootactions';
import { getRepositories } from '../services/RepositoryApi';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchInput: ''
		}
	}

	render() {
		const setSearchVal = async (e) => {
			let inputValue = e.target.value;
			this.setState({ searchInput: inputValue });
		}

		const submitSearch = (event, inputValue) => {
			event.preventDefault();
			this.props.updateLoadingState(true);
			this.props.updateQueryInput(inputValue);
			this.props.updateSelectedRepository({});
			this.props.updateFilterValue('');
			searchRepositories(inputValue);
		}

		const searchRepositories = async (inputValue) => {
			await getRepositories(inputValue).then(response => {
				if (response) {
					const repos = response;
					this.props.updateLoadingState(false);
					this.props.updateSearchHistory(inputValue);
					this.props.updateRepositories(repos);
					this.props.updateFilteredRepos(repos);
				}
			});
		}

		return (
			<div className="grid surface-0 text-800 mb-5 justify-content-center">
				<section className='col-12 hero-section'>
					<span className="block text-3xl font-bold mb-4">Search GitHub Repositories</span>
					<form onSubmit={(event) => { submitSearch(event, this.state.searchInput) }}>
						<div className="p-inputgroup search-form">
							<InputText value={this.state.searchInput} onChange={(event) => { setSearchVal(event) }} placeholder="Search Repos By Name..." />
							<Button disabled={!this.state.searchInput || this.props.loading || this.state.searchInput === this.props.inputVal} type="submit" label="Search" />
						</div>
					</form>
				</section>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	repositories: state.repositories,
	filteredRepos: state.filteredRepos,
	loading: state.loading,
	searchQuery: state.searchQuery,
	inputVal: state.searchQuery.input
});

const mapDispatchToProps = (dispatch) => ({
	updateLoadingState: (loadingVal) => dispatch(updateLoadingState(loadingVal)),
	updateRepositories: (repos) => dispatch(updateRepositories(repos)),
	updateSelectedRepository: (repo) => dispatch(updateSelectedRepository(repo)),
	updateFilterValue: (filterValue) => dispatch(updateFilterValue(filterValue)),
	updateFilteredRepos: (repos) => dispatch(updateFilteredRepos(repos)),
	updateQueryInput: (inputValue) => dispatch(updateQueryInput(inputValue)),
	updateSearchHistory: (inputValue) => dispatch(updateSearchHistory(inputValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

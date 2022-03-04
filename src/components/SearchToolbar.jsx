/* eslint-disable no-useless-constructor */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component } from 'react';
import "../styles/table.scss";
import { connect } from 'react-redux';
import { updateFilteredRepos, updateFilterValue, updateLoadingState, updateQueryInput, updateRepositories, updateSearchHistory, updateSelectedRepository } from '../actions/rootactions';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

class SearchToolbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filterInput: ''
		}

		this.sortOptions = [
			{ name: 'Default' },
			{ name: 'Stars - High to Low' },
			{ name: 'Stars - Low to High' }
		];
	}

	render() {
		const setFilterVal = (e) => {
			let inputValue = e.target.value;
			this.setState({ filterInput: inputValue });
			let formattedValue = inputValue.toLowerCase().replace(/\s\s+/g, " ");
			if (inputValue && inputValue.length > 0) {
				this.props.updateFilterValue(inputValue);
				let filteredRepositories = this.props.repositories.filter(repo => {
					return repo.language && repo.language.toLowerCase().replace(/\s/g, "").includes(formattedValue.replace(/\s/g, ""));
				});
				this.props.updateFilteredRepos(filteredRepositories);
			} else {
				this.clearFilter();
				this.props.updateFilteredRepos(this.props.repositories);
			}
			console.log(this.props.filteredRepos);
		}

		const clearFilterVal = (event) => {
			event.preventDefault();
			let inputValue = '';
			this.setState({ filterInput: inputValue });
			this.props.updateFilteredRepos(this.props.repositories);
			this.props.updateFilterValue(inputValue);
		}

		const onSortChange = (e) => {
			console.log(e);
			this.setState({ selectedSortOption: e.value.name });
			let sortedRepositories = this.props.repositories;
			if (e.value.name === 'Stars - Low to High') {
				sortedRepositories.sort(function (a, b) {
					return a.stargazers_count - b.stargazers_count;
				});
			} else if (e.value.name === 'Stars - High to Low') {
				sortedRepositories.sort(function (a, b) {
					return b.stargazers_count - a.stargazers_count;
				});
			}
			console.log(sortedRepositories);
			this.props.updateFilteredRepos(sortedRepositories);
		}

		return (
			<div className="grid text-800 mb-1 justify-content-end">
				<section className='col-12 filter-section'>
					<div className="col-3 p-inputgroup filter-form">
						<InputText value={this.state.filterInput} onChange={(event) => { setFilterVal(event) }} placeholder="Filter by Language" />
						<Button disabled={!this.props.filterValue} type="button" label="Clear" className="p-button-danger" onClick={(event) => { clearFilterVal(event) }} />
					</div>
					<div className="col-2 p-inputgroup sort-select">
						<Dropdown value={this.state.selectedSortOption} options={this.sortOptions} onChange={(event) => { onSortChange(event) }} optionLabel="name" placeholder="Sort Results" />
					</div>
				</section>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	repositories: state.repositories,
	filteredRepos: state.filteredRepos,
	filterValue: state.searchQuery.filter,
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchToolbar);

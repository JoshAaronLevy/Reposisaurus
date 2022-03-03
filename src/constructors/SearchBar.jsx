/* eslint-disable no-useless-constructor */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component } from 'react';
import "../styles/table.scss";
import { connect } from 'react-redux';
import { updateFilteredRepos, updateLoadingState, updateQueryInput, updateRepositories, updateSearchHistory } from '../actions/rootactions';
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

	fetchRepos(inputValue) {
		getRepositories(inputValue).then(response => {
			const repos = response;
			console.log(repos);
			this.props.updateRepositories(repos);
		});
	}

	render() {
		const setSearchVal = async (e) => {
			let inputValue = e.target.value;
			this.props.updateQueryInput(inputValue);
			setTimeout(() => {
				this.props.updateLoadingState(true);
			}, 500);
			await setTimeout(() => {
				searchRepositories(inputValue);
			}, 750);
		}

		const submitSearch = (e, inputValue) => {
			this.props.updateLoadingState(true);
			e.preventDefault();
			searchRepositories(inputValue);
		}

		const searchRepositories = async (inputValue) => {
			await getRepositories(inputValue).then(response => {
				if (response) {
					this.props.updateLoadingState(false);
					const repos = response;
					this.props.updateSearchHistory(inputValue);
					this.props.updateRepositories(repos);
					this.props.updateFilteredRepos(repos);
				}
			});
		}

		return (
			<div className="grid surface-0 text-800 mb-5">
				<div className="col-12 hero-section">
					<section className='hero-search'>
						<span className="block text-3xl font-bold mb-4">Search GitHub Repositories</span>
						<form>
							<div className="p-inputgroup">
								<InputText value={this.props.inputVal} onChange={(e) => { setSearchVal(e) }} placeholder="Search Repos By Name..." />
								<Button disabled={!this.props.inputVal || this.props.loading} type="button" onClick={(e) => { submitSearch(e, this.props.inputVal) }} label="Search" />
							</div>
						</form>
					</section>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	repositories: state.repositories,
	filteredRepos: state.filteredRepos,
	loading: state.loading,
	searchQuery: state.searchQuery,
	inputVal: state.searchQuery.input,
});

const mapDispatchToProps = (dispatch) => ({
	updateLoadingState: (loadingVal) => dispatch(updateLoadingState(loadingVal)),
	updateRepositories: (repos) => dispatch(updateRepositories(repos)),
	updateFilteredRepos: (repos) => dispatch(updateFilteredRepos(repos)),
	updateQueryInput: (inputValue) => dispatch(updateQueryInput(inputValue)),
	updateSearchHistory: (inputValue) => dispatch(updateSearchHistory(inputValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

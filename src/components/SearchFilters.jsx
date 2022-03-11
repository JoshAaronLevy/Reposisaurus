/* eslint-disable no-useless-constructor */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component } from "react";
import "../styles/table.scss";
import { connect } from "react-redux";
import { updateFilteredRepos, updateFilterValue, updateLoadingState, updateQueryInput, updateRepositories, updateSearchHistory, updateSelectedRepository } from "../actions/rootactions";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

class SearchFilters extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filterInput: ""
		}

		this.sortOptions = [
			{ name: "Default" },
			{ name: "Stars - High to Low" },
			{ name: "Stars - Low to High" }
		];
	}

	render() {
		const { updateFilterValue, updateFilteredRepos } = this.props;
		const setFilterVal = (e) => {
			let inputValue = e.target.value;
			this.setState({ filterInput: inputValue });
			let formattedValue = inputValue.toLowerCase().replace(/\s\s+/g, " ");
			if (inputValue && inputValue.length >= 0) {
				updateFilterValue(inputValue);
				let filteredRepositories = this.props.repositories.filter(repo => {
					return repo.language && repo.language.toLowerCase().replace(/\s/g, "").includes(formattedValue.replace(/\s/g, ""));
				});
				updateFilteredRepos(filteredRepositories);
			} else {
				clearFilterVal(e);
				updateFilteredRepos(this.props.repositories);
			}
		}

		const clearFilterVal = (event) => {
			event.preventDefault();
			let inputValue = "";
			this.setState({ filterInput: inputValue });
			updateFilteredRepos(this.props.repositories);
			updateFilterValue(inputValue);
		}

		const onSortChange = (e) => {
			this.setState({ selectedSortOption: e.value });
			let sortedRepositories = this.props.repositories;
			if (e.value.name === "Stars - Low to High") {
				sortedRepositories.sort(function (a, b) {
					return a.stargazers_count - b.stargazers_count;
				});
			} else if (e.value.name === "Stars - High to Low") {
				sortedRepositories.sort(function (a, b) {
					return b.stargazers_count - a.stargazers_count;
				});
			}
			updateFilteredRepos([]);
			updateFilteredRepos(sortedRepositories);
		}

		return (
			<div className="grid text-800 mb-1 justify-content-end">
				<section className="col-12 filter-section">
					<div className="p-inputgroup filter-form xs:col-9 sm:col-8 md:col-6 lg:col-3">
						<InputText value={this.state.filterInput} onChange={(event) => { setFilterVal(event) }} placeholder="Filter by Language" />
						<Button disabled={!this.props.filterValue} type="button" label="Clear" className="p-button-danger" onClick={(event) => { clearFilterVal(event) }} />
					</div>
					<div className="p-inputgroup sort-select xs:col-3 sm:col-4 md:col-6 lg:col-3">
						<Dropdown value={this.state.selectedSortOption} options={this.sortOptions} onChange={(event) => { onSortChange(event) }} optionLabel="name" placeholder="Sort" />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);

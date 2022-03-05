import { connect } from "react-redux";
import { updateFilteredRepos, updateFilterValue, updateLoadingState, updateQueryInput, updateRepositories, updateSearchHistory, updateSelectedRepository } from '../actions/rootactions';
import SearchBar from "../components/SearchBar";

const mapStateToProps = (state) => ({
	repositories: state.repositories,
	filteredRepos: state.filteredRepos,
	loading: state.loading,
	searchQuery: state.searchQuery,
	searchHistory: state.searchQuery.history,
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
import { connect } from "react-redux";
import { updateSelectedRepository } from "../actions/rootactions";
import RepositoryToast from "../components/RepositoryToast";

const displayToastEval = (state) => {
	return state.selectedRepo.id ? true : false;
}

const mapStateToProps = (state) => ({
	selectedRepo: state.selectedRepo,
	displayToast: displayToastEval(state),
});

const mapDispatchToProps = (dispatch) => ({
	updateSelectedRepository: (repo) => dispatch(updateSelectedRepository(repo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryToast);
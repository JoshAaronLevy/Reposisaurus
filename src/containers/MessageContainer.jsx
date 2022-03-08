import { connect } from "react-redux";
import { updateErrorState, updateWarningState } from "../actions/rootactions";
import DisplayMessage from "../components/DisplayMessage";

const mapStateToProps = (state) => ({
	loading: state.loading,
	warningMessage: state.warning,
	errorMessage: state.error,
	inputValue: state.searchQuery.input,
});

const mapDispatchToProps = (dispatch) => ({
	updateErrorState: (message) => dispatch(updateErrorState(message)),
	updateWarningState: (message) => dispatch(updateWarningState(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMessage);
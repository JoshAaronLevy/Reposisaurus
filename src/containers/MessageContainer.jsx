import { connect } from "react-redux";
import { updateErrorState, updateWarningState } from "../actions/rootactions";
import ToastMessage from "../components/ToastMessage";

const mapStateToProps = (state) => ({
	warningMessage: state.warning,
	errorMessage: state.error,
});

const mapDispatchToProps = (dispatch) => ({
	updateErrorState: (message) => dispatch(updateErrorState(message)),
	updateWarningState: (message) => dispatch(updateWarningState(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastMessage);
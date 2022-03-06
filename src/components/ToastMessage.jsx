import React, { useCallback, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';

const ToastMessage = ({
	warningMessage,
	errorMessage,
	updateWarningState,
	updateErrorState
}) => {
	const toast = useRef(null);

	const constructToast = useCallback(
		() => {
			let severityClass = '';
			let messageIcon = '';
			let isSticky = true;
			let messageTitle = '';
			let messageContent = '';
			if (warningMessage) {
				severityClass = 'warn';
				messageIcon = "pi pi-exclamation-triangle";
				messageTitle = "Alert!";
				messageContent = warningMessage;
			} else if (errorMessage) {
				severityClass = 'error'
				messageIcon = "pi pi-exclamation-triangle";
				messageTitle = "Error!";
				messageContent = errorMessage;
			}
			return showToast(severityClass, isSticky, messageIcon, messageTitle, messageContent);
		},
		[warningMessage, errorMessage],
	);

	const clearToast = useCallback(
		() => {
			updateWarningState(null);
			updateErrorState(null);
			toast.current.clear();
		},
		[updateWarningState, updateErrorState]
	);

	useEffect(() => {
		if (warningMessage || errorMessage) {
			constructToast();
		} else {
			clearToast();
		}
	}, [constructToast, clearToast, warningMessage, errorMessage]);

	const showToast = (severityClass, isSticky, messageIcon, messageTitle, messageContent) => {
		toast.current.show({
			severity: severityClass,
			sticky: isSticky,
			closeable: true,
			content: (
				<div className="flex flex-column" style={{ flex: '1' }}>
					<div className="text-center">
						<i className={messageIcon} style={{ fontSize: '3rem' }}></i>
						<h4>{messageTitle}</h4>
						<p>{messageContent}</p>
					</div>
				</div>
			)
		});
	}

	if (warningMessage || errorMessage) {
		return (
			<Toast ref={toast} position="bottom-center" />
		)
	}
}

export default ToastMessage
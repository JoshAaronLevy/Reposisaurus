/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from 'react';
import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';
import Countdown from 'react-countdown';
import { getRepositories } from '../services/RepositoryApi';

const DisplayMessage = ({
	inputValue,
	warningMessage,
	errorMessage,
	updateWarningState,
	updateErrorState
}) => {
	const userMessage = useRef(null);

	const clearMessage = () => {
		updateWarningState(null);
		updateErrorState(null);
		userMessage.current.clear();
	}

	const RetrySearch = async (inputValue) => {
		clearMessage();
		if (inputValue) {
			const newRepos = await getRepositories(inputValue);
			return newRepos;
		} else {
			return (
				<strong>Unable to auto-run desired search. Please try again in the search bar</strong>
			);
		}
	};

	const renderCountdown = ({ seconds, completed }) => {
		if (completed) {
			RetrySearch(inputValue);
			return <></>
		} else {
			if (seconds !== 1) {
				return <span className="countdown-timer">{seconds} Seconds</span>;
			} else {
				return <span className="countdown-timer">{seconds} Second</span>;
			}
		}
	};

	const displayMessage = useCallback((severityClass, isSticky, messageTitle, messageContent) => {
		userMessage.current.show({
			severity: severityClass, sticky: isSticky, content: (
				<div className="message-fragment">
					<div className="flex flex-column message-container" style={{ flex: '1' }}>
						<div className="text-center message-header">
							<h3 className="mt-2 mb-2">{messageTitle}</h3>
							<p className="message-content">{messageContent}</p>
						</div>
						{errorMessage && (
							<div className="text-center mb-3 message-counter">
								<Countdown
									date={Date.now() + 30000}
									renderer={renderCountdown} />
							</div>
						)}
						<div className="message-footer">
							<div className="col-12">
								<Button type="button" label="Cancel" className="p-button-danger" onClick={clearMessage} />
							</div>
						</div>
					</div>
				</div>
			)
		});
	}, [errorMessage]);

	const constructMessage = useCallback(
		() => {
			let severityClass = '';
			let isSticky = true;
			let messageTitle = '';
			let messageContent = '';
			if (warningMessage) {
				severityClass = 'warn';
				messageTitle = "Alert!";
				messageContent = warningMessage;
			} else if (errorMessage) {
				severityClass = 'error';
				messageTitle = "Error!";
				messageContent = errorMessage;
			}
			displayMessage(severityClass, isSticky, messageTitle, messageContent);
		},
		[warningMessage, errorMessage, displayMessage],
	);

	useEffect(() => {
		if (warningMessage || errorMessage) {
			constructMessage();
		} else {
			return;
		}
	}, [constructMessage, warningMessage, errorMessage]);

	if (warningMessage || errorMessage) {
		return (
			<Messages ref={userMessage} className="display-message" />
		)
	} else {
		return (
			<></>
		)
	}
}

export default DisplayMessage
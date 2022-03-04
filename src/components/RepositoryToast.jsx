import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import "../styles/messages.scss";

const RepositoryToast = ({
	selectedRepo,
	displayToast
}) => {
	let navigate = useHistory();
	const toast = useRef(null);

	const viewRepo = useCallback(
		() => {
			navigate.push(`/repo/${selectedRepo.owner.login}/${selectedRepo.name}`);
		},
		[navigate, selectedRepo],
	);

	const closeToast = useCallback(
		() => {
			toast.current.clear();
		},
		[],
	);

	const showToast = useCallback(
		() => {
			let displayDescription = '';
			if (selectedRepo.description && selectedRepo.description.length > 100) {
				displayDescription = selectedRepo.description.substring(0, 97) + "...";
			} else {
				displayDescription = selectedRepo.description;
			}
			toast.current.show({
				severity: 'info',
				sticky: true,
				closable: false,
				content: (
					<div className="flex flex-column" style={{ flex: '1' }}>
						<div className="text-center">
							<h3 className='toast-title'>{selectedRepo.name} by {selectedRepo.owner.login}</h3>
							{selectedRepo.description && (
								<p className='toast-description'>{displayDescription}</p>
							)}
						</div>
						<div className="grid p-fluid flex justify-content-around">
							<div className="col-6">
								<Button
									type="button"
									label="View Repo"
									className="p-button-success"
									onClick={viewRepo} />
							</div>
						</div>
					</div>
				)
			});
		},
		[selectedRepo, viewRepo],
	);

	useEffect(() => {
		if (displayToast) {
			setTimeout(() => {
				closeToast();
			}, 100);
			setTimeout(() => {
				showToast();
			}, 400);
		} else {
			setTimeout(() => {
				closeToast();
			}, 100);
		}
		return displayToast;
	}, [displayToast, showToast, closeToast]);

	return (
		<div>
			<Toast ref={toast} position="bottom" className='repository-toast' />
		</div>
	)
}

export default RepositoryToast
import React, { useCallback, useEffect } from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import "../styles/hero.scss";
import "../styles/messages.scss";
import { useParams } from 'react-router-dom';
import { getRepository } from "../services/RepositoryApi";

const Repository = ({
	loading,
	selectedRepo,
	updateLoadingState,
	updateSelectedRepository
}) => {
	let { owner } = useParams();
	let { name } = useParams();

	const getRepoFromUrl = useCallback(
		() => {
			getRepository(owner, name).then(response => {
				if (response.data && response.data.id) {
					updateLoadingState(false);
					updateSelectedRepository(response.data);
				}
			})
		},
		[owner, name, updateLoadingState, updateSelectedRepository],
	);

	useEffect(() => {
		if (!selectedRepo.id) {
			if (owner && name) {
				return getRepoFromUrl(owner, name);
			} else {
				updateLoadingState(false);
				console.warn("Uh oh! No repo could be found!");
			}
		} else {
			return selectedRepo;
		}
	}, [loading, name, owner, selectedRepo, updateLoadingState, getRepoFromUrl]);

	return (
		<div></div>
	)
}

export default Repository
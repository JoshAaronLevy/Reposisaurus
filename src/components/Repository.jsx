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
		<div className="grid grid-nogutter surface-0 text-800 hero-container">
			<div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
				<section>
					<div className="text-6xl text-primary font-bold mb-3">{selectedRepo.name}</div>
					<span className="block text-3xl font-bold mb-1">by {selectedRepo.owner.login}</span>
					<p className="mt-0 mb-4 text-700 line-height-3">{selectedRepo.description}</p>
					<div className="flex align-items-center flex-wrap mb-3">
						{selectedRepo.topics.map((topic) => {
							return (
								<Chip label={topic} className="mr-2 mb-2" />
							)
						})}
					</div>
					<Button label="Source" type="button" icon="pi pi-github" className="mr-3 p-button-raised" />
					<Button label="Live Demo" type="button" className="p-button-outlined" />
				</section>
			</div>
			<div className="col-12 md:col-6 overflow-hidden">
				<img src={selectedRepo.owner.avatar_url} alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
			</div>
		</div>
	)
}

export default Repository
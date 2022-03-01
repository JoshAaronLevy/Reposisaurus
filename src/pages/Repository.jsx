/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useRef } from 'react';
import appContext from '../services/context';
import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import "../styles/hero.scss";
import "../styles/messages.scss";
import { useParams } from 'react-router-dom';

const Repository = () => {
	const appState = useContext(appContext);
	let selectedRepo = appState.selectedRepo;
	let { owner } = useParams();
	let { name } = useParams();
	const msg = useRef(null);
	useEffect(() => {
		if (!selectedRepo) {
			if (!owner || !name) {
				console.log("Could not identify params for fetching repository");
				return displayErrorMsg();
			} else {
				console.log("Fetching repository details from URL");
				return appState.searchRepo(owner, name);
			}
		} else {
			return selectedRepo;
		}
	}, []);

	const displayErrorMsg = () => {
		msg.current.replace({
			severity: 'error',
			sticky: true,
			closable: false,
			content: (
				<React.Fragment>
					<div className="ml-2">
						<h2 className='text-center'>Unable to find Repository</h2>
					</div>
				</React.Fragment>
			)
		});
	}

	if (selectedRepo) {
		return (
			<div className="grid grid-nogutter surface-0 text-800 hero-container">
				<div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
					<section>
						<div className="text-6xl text-primary font-bold mb-3">{selectedRepo.name}</div>
						<span className="block text-3xl font-bold mb-1">by {selectedRepo.owner.login}</span>
						<p className="mt-0 mb-4 text-700 line-height-3">{selectedRepo.description}</p>
						<div className="flex align-items-center flex-wrap mb-3">
							<Chip label="Action" className="mr-2 mb-2" />
							<Chip label="Comedy" className="mr-2 mb-2" />
							<Chip label="Mystery" className="mr-2 mb-2" />
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
	} else {
		return (
			<Messages ref={msg} className="messages-container" />
		)
	}
}

export default Repository;
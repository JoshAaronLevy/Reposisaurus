import React, { useContext } from 'react';
import appContext from '../services/context';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';

const Repository = () => {
	const appState = useContext(appContext);
	const selectedRepo = appState.selectedRepo;

	return (
		<div className="grid grid-nogutter surface-0 text-800">
			<div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
				<section>
					<div className="text-6xl text-primary font-bold mb-3">{selectedRepo.name}</div>
					<span className="block text-3xl font-bold mb-1">by {selectedRepo.owner.login}</span>
					<p className="mt-0 mb-4 text-700 line-height-3">{selectedRepo.description}</p>
					<div className="flex align-items-center flex-wrap">
						<Chip label="Action" className="mr-2 mb-2" />
						<Chip label="Comedy" className="mr-2 mb-2" />
						<Chip label="Mystery" className="mr-2 mb-2" />
						<Chip label="Thriller" className="mb-2" removable />
					</div>
					<Button label="Learn More" type="button" className="mr-3 p-button-raised" />
					<Button label="Live Demo" type="button" className="p-button-outlined" />
				</section>
			</div>
			<div className="col-12 md:col-6 overflow-hidden">
				<img src={selectedRepo.owner.avatar_url} alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
			</div>
		</div>
	)
}

export default Repository;
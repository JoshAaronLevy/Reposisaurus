import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';
import "../styles/table.scss";
import Moment from 'react-moment';
import SearchFilters from './SearchFilters';
import { Tooltip } from 'primereact/tooltip';
import MessageContainer from '../containers/MessageContainer';

const RepositoryList = ({
	loading,
	repositories,
	filteredRepos,
	updateSelectedRepository,
	updateFilteredRepos,
	warningMessage,
	errorMessage,
	clearMessages
}) => {
	let navigate = useHistory();
	useEffect(() => {
		updateFilteredRepos(repositories);
	}, [repositories, updateFilteredRepos]);

	const selectRepository = async (selectedRepo) => {
		updateSelectedRepository(selectedRepo);
		clearMessages();
		navigate.push(`/repo/${selectedRepo.owner.login}/${selectedRepo.name}`);
	}

	if (!loading && (!warningMessage || !errorMessage) && (repositories && repositories.length > 0)) {
		return (
			<div className='container-padded'>
				<SearchFilters />
				<div className="grid">
					{filteredRepos.map((repo) => {
						return (
							<div key={repo.id} className="col-12 md:col-6 lg:col-4 repo-card">
								<Tooltip target=".tooltip-target"></Tooltip>
								<div className="surface-0 shadow-2 p-2 border-round repo-card-item" onClick={() => { selectRepository(repo) }}>
									<div className="flex justify-content-between align-items-center mb-3">
										<div className='card-title-container'>
											<div className="text-900 font-medium text-xl mb-1 pl-3 text-left">{repo.name}</div>
											<span className="block text-600 font-medium mb-0 pl-3 text-left">{repo.owner.login}</span>
										</div>
										<div className="flex align-items-center justify-content-center card-img">
											<img src={repo.owner.avatar_url} alt={repo.owner.login} width="60" height="60" />
										</div>
									</div>
									<div className='col-12 repo-card-footer'>
										<span className="col-4 text-left repo-stat">
											<i className="fa-regular fa-calendar-circle-plus tooltip-target" data-pr-tooltip="Created Date" data-pr-position="top"></i><Moment format="MM/DD/YY"><p>{repo.created_at}</p></Moment></span>
										<span className="col-3 text-left repo-stat">
											<i className="fa-brands fa-github-square tooltip-target" data-pr-tooltip="Starred on GitHub" data-pr-position="top"></i><p>{repo.stargazers_count}</p></span>
										{repo.language && (
											<span className="col-5 text-left repo-stat">
												<i className="fa-regular fa-square-code"></i><p>{repo.language}</p></span>
										)}
										{!repo.language && (
											<span className="col-5 text-left repo-stat"></span>
										)}
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		);
	} else if (loading && (!warningMessage || !errorMessage)) {
		return (
			<ProgressSpinner />
		);
	} else if (!loading && (warningMessage || errorMessage)) {
		return (
			<MessageContainer />
		);
	} else {
		return (
			<div></div>
		);
	}
}

export default RepositoryList;
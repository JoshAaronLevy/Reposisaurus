import React from 'react';
import "../styles/header.scss";

const Header = () => {
	return (
		<div className="header">
			<div className='header-container'>
				<a href='/'>
					<h3 className='header-title'>RepoRunner</h3>
				</a>
				<a href='https://github.com/JoshAaronLevy/repo-runner' target='_blank' rel='noreferrer'>
					<i className="pi pi-github nav-pi"></i>
				</a>
			</div>
		</div>
	)
}

export default Header;
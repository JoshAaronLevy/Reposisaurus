import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/header.scss";

const Header = () => {
	return (
		<div className="header">
			<div className='header-container'>
				<Link to='/'>
					<h3 className='header-title'>RepoRunner</h3>
				</Link>
				<a href='https://github.com/JoshAaronLevy/repo-runner' target='_blank' rel='noreferrer'>
					<i className="pi pi-github nav-pi"></i>
				</a>
			</div>
		</div>
	)
}

export default Header;
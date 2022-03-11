import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import "../styles/header.scss";
import { Button } from "primereact/button";

const Header = () => {
	const [displayResponsive, setDisplayResponsive] = useState(false);
	const onHide = () => {
		setDisplayResponsive(false);
	}
	const onShow = () => {
		setDisplayResponsive(true);
	}
	return (
		<div className="header">
			<div className="header-container">
				<Link to="/">
					<h3 className="header-title">RepoRunner</h3>
				</Link>
				<div className="nav-links">
					<a href="https://github.com/JoshAaronLevy/repo-runner" target="_blank" rel="noreferrer">
						<i className="pi pi-github nav-pi"></i>
					</a>
					<button className="nav-button" onClick={onShow}>
						<i className="fa-regular fa-circle-user"></i>
					</button>
				</div>
			</div>
			<Dialog header="Welcome!" dismissableMask="true" closable="false" visible={displayResponsive} onHide={() => onHide("displayResponsive")} breakpoints={{ "960px": "75vw" }} style={{ width: "50vw" }}>
				<div className="login-container">
					<Button className="github-login" label="Login with GitHub" icon="pi pi-github" />
				</div>
			</Dialog>
		</div>
	)
}

export default Header;
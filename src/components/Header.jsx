import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import "../styles/header.scss";
// import { Button } from "primereact/button";
import authKeys from "../keys/auth";

const Header = () => {
	const [displayResponsive, setDisplayResponsive] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const url = window.location.href;
	const hasCode = url.includes("?code=");
	const proxy_url = "http://localhost:5000/authenticate";
	const onHide = () => {
		setDisplayResponsive(false);
	}
	const onShow = () => {
		setDisplayResponsive(true);
	}
	useEffect(() => {
		if (hasCode) {
			const newUrl = url.split("?code=");
			window.history.pushState({}, null, newUrl[0]);
			setUserInfo({ ...userInfo, isLoading: true });
			const requestData = {
				code: newUrl[1]
			};
			fetch(proxy_url, {
				method: "POST",
				body: JSON.stringify(requestData)
			})
				.then(response => response.json())
				.then(data => {
					console.log("data:", data);
					// dispatch({
					// 	type: "LOGIN",
					// 	payload: { user: data, isLoggedIn: true }
					// });
				})
				.catch(error => {
					console.error(error);
					// setUserInfo({
					// 	isLoading: false,
					// 	errorMessage: "Sorry! Login failed"
					// });
				});
		}
	}, [hasCode, url, userInfo]);
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
					<a
						className="btn btn-primary"
						href={`https://github.com/login/oauth/authorize?scope=user&client_id=${authKeys.client_id}&redirect_uri=${authKeys.redirect_uri}`}
						onClick={() => {
							setUserInfo({ ...userInfo, errorMessage: "" });
						}}
					>
						<i className="pi pi-github nav-pi"></i>
						<span>Login with GitHub</span>
					</a>
				</div>
			</Dialog>
		</div>
	)
}

export default Header;
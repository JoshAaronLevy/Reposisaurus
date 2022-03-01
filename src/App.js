import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ScrollTop } from 'primereact/scrolltop';
import "primeflex/primeflex.css";
import './App.scss';

import Home from './pages/Home';
import Repository from './pages/Repository';
import RepositoryState from './services/repository';
import Header from './components/Header';


const App = () => {
	return (
		<RepositoryState>
			<Router>
				<Header />
				<div className="App">
					<ScrollTop />
					<div className="container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/repo/:owner/:name" component={Repository} />
						</Switch>
						<ScrollTop target="parent" threshold={50} className="custom-scrolltop" icon="pi pi-arrow-up" />
					</div>
				</div>
			</Router>
		</RepositoryState>
	);
};

export default App;

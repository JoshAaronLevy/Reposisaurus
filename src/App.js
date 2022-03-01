import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "primeflex/primeflex.css";
import './App.scss';

import Home from './pages/Home';
import Repository from './pages/Repository';
import RepositoryState from './services/repository';
import Header from './components/Header';


const App = () => {
	return (
		<RepositoryState>
			<Header />
			<Router>
				<div className="App">
					<div className="container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/repo/:owner/:name" component={Repository} />
						</Switch>
					</div>
				</div>
			</Router>
		</RepositoryState>
	);
};

export default App;

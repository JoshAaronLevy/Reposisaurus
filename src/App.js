import React, { createContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ScrollTop } from 'primereact/scrolltop';
import { Provider } from "react-redux";
import { initializeStore } from "./reducers/store";
import { INITIALSTATE } from "./constants/InitialState";
import "primeflex/primeflex.css";
import './App.scss';

import Home from './pages/Home';
import Header from './components/Header';
import RepositoryContainer from './containers/RepositoryContainer';

export const AuthContext = createContext();

const store = initializeStore({ ...INITIALSTATE });

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Header />
				<div className="App">
					<ScrollTop />
					<div className="container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/?name=:queryInput" component={Home} />
							<Route exact path="/repo/:owner/:name" component={RepositoryContainer} />
						</Switch>
						<ScrollTop target="parent" threshold={50} className="custom-scrolltop" icon="pi pi-arrow-up" />
					</div>
				</div>
			</Router>
		</Provider>
	);
};

export default App;

import React, { Fragment } from 'react';
import SearchContainer from '../containers/SearchContainer';
import SearchResultsContainer from '../containers/SearchResultsContainer';

const Home = () =>
	<Fragment>
		<SearchContainer />
		<SearchResultsContainer />
	</Fragment>

export default Home;
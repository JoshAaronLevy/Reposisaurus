import React, { Fragment } from 'react';
import SearchBar from '../constructors/SearchBar';
import SearchTable from '../constructors/SearchTable';

const Home = () =>
	<Fragment>
		<SearchBar />
		<SearchTable />
	</Fragment>

export default Home;
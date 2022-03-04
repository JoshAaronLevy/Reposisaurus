import React, { Fragment } from 'react';
import SearchBar from '../constructors/SearchBar';
import SearchResults from '../constructors/SearchResults';
// import SearchTable from '../constructors/SearchTable';

const Home = () =>
	<Fragment>
		<SearchBar />
		<SearchResults />
		{/* <SearchTable /> */}
	</Fragment>

export default Home;
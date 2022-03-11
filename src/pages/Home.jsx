import React, { Fragment } from "react";
import SearchContainer from "../containers/SearchContainer";
import RepositoryListContainer from "../containers/RepositoryListContainer";

const Home = () =>
	<Fragment>
		<SearchContainer />
		<RepositoryListContainer />
	</Fragment>

export default Home;
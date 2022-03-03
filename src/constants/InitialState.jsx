const INITIALSTATE = {
	repositories: [],
	filteredRepos: [],
	selectedRepo: {},
	loading: false,
	error: {},
	searchQuery: {
		input: '',
		filter: '',
		sort: {
			value: null,
			direction: null
		},
		history: []
	},
	recentlyViewed: []
}

export { INITIALSTATE };
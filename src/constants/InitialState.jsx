const INITIALSTATE = {
	repositories: [],
	filteredRepos: [],
	selectedRepo: {},
	loading: false,
	error: null,
	warning: null,
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
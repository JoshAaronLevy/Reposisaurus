/* eslint-disable cypress/no-unnecessary-waiting */
describe('RepoRunner', () => {
	const firstSearchQuery = 'gitbuddy';
	const secondSearchQuery = 'gitquick';
	const thirdSearchQuery = 'jytchgfvkuygkuyglhygkytdres';
	let domList = [];
	let historyList = [];

	before(() => {
		cy.on('uncaught:exception', (err, runnable) => {
			return false
		})
		cy.visit('http://localhost:3000')
	})

	describe('Initial site state loaded', () => {
		it(`Should have a site title reading "Search GitHub Repositories"`, () => {
			cy.get('.hero-title').should('have.text', 'Search GitHub Repositories')
		})

		it('Should have a form input field below the site title', () => {
			cy.get('#repoSearch').should('be.visible')
		})

		it('Form input should be empty by default', () => {
			cy.get('#repoSearch').should('have.value', '')
		})

		it('Search button should be disabled by default', () => {
			cy.get('.search-button').should('be.disabled')
		})
	})

	describe('Accept user input and search', () => {
		it('Form input should accept user input', () => {
			cy.get('#repoSearch').type(firstSearchQuery)
		})

		it('Search button should be enabled when user types in the input field', () => {
			cy.get('.search-button').should('be.enabled')
		})

		it('Search for repos matching input value', () => {
			cy.get('.search-button').click()
		})
	})


	describe('Update window and button state', () => {
		it('Search button should be disabled after search', () => {
			cy.get('.search-button').should('be.disabled')
		})

		it('URL should include the current search value', () => {
			cy.location().should((location) => {
				expect(location.search).equal(`?name=${firstSearchQuery}`)
			})
		})
	})

	describe('Evaluate conditional button state', () => {
		it('Search button should be re-enabled if input value changes', () => {
			cy.wait(1000).then(() => {
				cy.get('#repoSearch').type('{backspace}')
			})
			cy.get('.search-button').should('be.enabled')
		})

		it('Search button should be disabled if the input matches the current search value', () => {
			cy.wait(1000).then(() => {
				cy.get('#repoSearch').type('y')
			})
			cy.get('.search-button').should('be.disabled')
		})
	})

	describe('Run a new search with a different user input value', () => {
		it('Should submit second user search input', () => {
			cy.get('#repoSearch').clear()
			cy.get('#repoSearch').type(secondSearchQuery)
			cy.get('.search-button').click()
		})
	})

	describe('Return new repositories', () => {
		it('A list of recent searches should display under the input when typing a new value', () => {
			cy.wait(1000).then(() => {
				cy.get('#repoSearch').type('{backspace}')
			})
			cy.wait(1000).then(() => {
				cy.get('#repoSearch_list').should('be.visible')
			})
		})
	})

	describe('Check URL for current value', () => {
		it('URL should include the latest search value', () => {
			cy.location().should((location) => {
				expect(location.search).equal(`?name=${secondSearchQuery}`)
			})
		})
	})

	describe('Expected behavior with no results found', () => {
		describe('Run a new search with a different user input value', () => {
			it('Should submit third user search input', () => {
				cy.get('#repoSearch').clear()
				cy.get('#repoSearch').type(thirdSearchQuery)
				cy.get('.search-button').click()
			})
			it('Should display an alert message to the user', () => {
				cy.wait(250).then(() => {
					cy.get('.p-toast-message-warn').should('be.visible')
				})
			})
		})
	})
})

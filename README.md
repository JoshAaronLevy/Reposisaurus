<div align="center">
 <h1>RepoRunner</h1>

 <p>This app lets you search, filter, and view GitHub Repositories.</p>
</div>

<hr />

## Table of Contents
- [Core Stack](#core-stack)
- [Running the App Locally](#running-the-app-locally)
- [Tests](#tests)
- [In Development](#in-development)

## Core Stack

- React v17
- Redux v7
- [Primereact UI v7](https://www.primefaces.org/primereact)
- [React Router v5](https://v5.reactrouter.com/)

## Running the App Locally

**NOTE:** If you're running the app for the first time, run the following commands:

- HTTPS Clone
1. `git clone https://github.com/JoshAaronLevy/repo-runner.git`

- SSH Clone
1. `git clone git@github.com:JoshAaronLevy/repo-runner.git`

2. `cd repo-runner`

3. `npm i`

- (Optional) Ensure tests pass with Cypress
4. `npm run e2e`

- (Optional) Check build succeeds
5. `npm run build`

6. `npm start`

## Tests

This repo is configured for both integration and end-to-end tests

Integration tests implemented with `@testing-library/react`

Integration test files can be located in [`src/tests`](src/tests/) folder

**NOTE:** Integration tests currently failing but can be run with the `npm run test` command

e2e tests implemented with `@cypress/react`

e2e test files can be located in [`cypress/integration/tests`](cypress/integration/tests/) folder

**NOTE:** e2e tests currently succeeding and can be run with the `npm run e2e` command

## In Development

Watch this repository in GitHub for the following updates in development:

- e2e testing with [Cypress.io](https://www.cypress.io/)
- Mocks with [Mirage.js](https://miragejs.com/) to add additional unit tests with Jest

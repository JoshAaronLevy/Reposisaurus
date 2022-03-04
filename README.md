# RepoRunner

This app lets you search, filter, and view GitHub Repositories

## Core Stack

- React v17
- Redux v7
- [Primereact UI v7](https://www.primefaces.org/primereact)
- [React Router v5](https://v5.reactrouter.com/)

## In Development

Watch this repository in GitHub for the following updates in development:

- Mocks with [Mirage.js](https://miragejs.com/) to add additional unit tests with Jest
- e2e testing with [Cypress.io](https://www.cypress.io/)

## Running the App Locally

**NOTE:** If you're running the app for the first time, do the following steps:

1. `git clone https://github.com/JoshAaronLevy/repo-runner.git`

2. `cd repo-runner`

3. `npm run initiate`

The `npm run initiate` command will install all dependencies, run tests, build the project, and start a server on `http://localhost:3000/`

## Additional Setup Comments

If the `npm run initiate` command fails, first make sure you're on node version 14 or newer by running `node -v`

If you are on a compatible node version, you should also be able to start the development server with the following command:

`npm i && npm start`

/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, waitFor } from '@testing-library/react'
import App from '../App'
import userEvent from '@testing-library/user-event'

jest.setTimeout(10000);

const cleanInput = 'gitbuddy'
const dirtyInput = 'akwueyfraweufrbawehfweufyguk'

let view
let input
let searchButton

// Use precise test naming
test('Search text box should be empty by default', () => {
	view = render(<App />)
	input = view.getByRole('searchbox')
	searchButton = view.getByRole('button', { name: 'Search' })
	// Not sure if this is necessary...
	expect(input.value).toBe('')
})

test('Search button should be disabled by default', () => {
	view = render(<App />)
	input = view.getByRole('searchbox')
	searchButton = view.getByRole('button', { name: 'Search' })
	// See example: https://testing-library.com/docs/react-testing-library/example-intro#full-example
	expect(searchButton).toBeDisabled();
})

test('Input field should display input value', () => {
	view = render(<App />)
	input = view.getByRole('searchbox')
	searchButton = view.getByRole('button', { name: 'Search' })
	// Use the .type() method to simulate typing into a form field.
	userEvent.type(input, cleanInput);
	// Use the .toBeDisabled() method to check if a button is disabled.
	expect(searchButton).toBeEnabled();
})

test('Search button should be disabled when input field is cleared', async () => {
	view = render(<App />)
	input = view.getByRole('searchbox')
	searchButton = view.getByRole('button', { name: 'Search' })
	userEvent.type(input, cleanInput);
	// There are special key sequences that can be used to clear the input field (and do other stuff).
	// Reference: https://testing-library.com/docs/ecosystem-user-event/#typeelement-text-options
	userEvent.clear(input);
	userEvent.type(input, '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}');
	// userEvent.type(input, '{selectall}{backspace}');
	// A waitFor generally needs to include a query function (https://testing-library.com/docs/dom-testing-library/api-async/#waitforelementtoberemoved)
	await waitFor(() => expect(searchButton).toBeDisabled());
})

test('Search button should be enabled when input field has value present', async () => {
	view = render(<App />)
	input = view.getByRole('searchbox')
	searchButton = view.getByRole('button', { name: 'Search' })
	// Use the event methods provided by **REACT** Testing Library.
	userEvent.type(input, cleanInput);
	searchButton.click()
	// You can just await a thing in a waitFor and it'll verify existence (within default timeout.)
	await waitFor(() => view.findByText('JoshAaronLevy'), {
		timeout: 10000
	})
	// await view.findByText('JoshAaronLevy');
	// OR! You could just cut straight to verifying the disabled state. (Delete prev line.)
	expect(searchButton).toBeEnabled();
}, 10000)

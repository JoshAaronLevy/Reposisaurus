/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, waitFor } from '@testing-library/react'
import App from '../App'
import userEvent from '@testing-library/user-event'

const cleanInput = 'gitbuddy'
const dirtyInput = 'akwueyfraweufrbawehfweufyguk'

let view
let input
let searchButton


beforeEach(() => {
	view = render(<App />)
	input = view.getByRole('searchbox')
	searchButton = view.getByRole('button', { name: 'Search' })
})

// Use precise test naming
test('Search text box should be empty by default', () => {
	// Not sure if this is necessary...
	expect(input.value).toBe('')
})

test('Search button should be disabled by default', () => {
	// See example: https://testing-library.com/docs/react-testing-library/example-intro#full-example
	expect(searchButton).toBeDisabled();
})

test('Input field should display input value', () => {
	// Use the .type() method to simulate typing into a form field.
	userEvent.type(input, cleanInput);
	// Use the .toBeDisabled() method to check if a button is disabled.
	expect(searchButton).toBeEnabled();
})

test('Search button should be disabled when input field is cleared', async () => {
	// There are special key sequences that can be used to clear the input field (and do other stuff).
	// Reference: https://testing-library.com/docs/ecosystem-user-event/#typeelement-text-options
	userEvent.type(input, '{selectall}{backspace}');
	// A waitFor generally needs to include a query function (https://testing-library.com/docs/dom-testing-library/api-async/#waitforelementtoberemoved)
	await waitFor(() => expect(view.getByText('Search')).toBeDisabled());
})

test('Search button should be enabled when input field has value present', async () => {
	// Use the event methods provided by **REACT** Testing Library.
	userEvent.type(input, dirtyInput);
	searchButton.click()
	// You can just await a thing in a waitFor and it'll verify existence (within default timeout.)
	await view.findByText('Search');
	// OR! You could just cut straight to verifying the disabled state. (Delete prev line.)
	expect(view.getByText('Search')).toBeDisabled();
})

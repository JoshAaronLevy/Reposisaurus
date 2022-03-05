/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

const setup = () => {
	const view = render(<App />);
	const input = view.getByRole('searchbox');
	return {
		input,
		...view,
	}
}
const { input } = setup();
const searchButton = screen.getByRole('button', { name: 'Search' });
const cleanInput = 'gitbuddy';
const dirtyInput = 'akwueyfraweufrbawehfweufyguk';

test('It should be empty by default', () => {
	expect(input.value).toBe('')
})

test('Search button should be disabled by default', () => {
	expect(searchButton.classList.contains('p-disabled')).toBe(true);
})

test('Input field should display input value', () => {
	fireEvent.change(input, { target: { value: cleanInput } })
	expect(input.value).toBe(cleanInput)
})

test('Search button should be disabled when input field is cleared', async () => {
	fireEvent.change(input, { target: { value: '' } })
	await waitFor(() => searchButton)
	expect(searchButton.classList.contains('p-disabled')).toBe(true);
})

test('Search button should be enabled when input field has value present', async () => {
	fireEvent.change(input, { target: { value: dirtyInput } })
	fireEvent.click(searchButton);
	await waitFor(() => searchButton)
	expect(searchButton.classList.contains('p-disabled')).toBe(false);
})

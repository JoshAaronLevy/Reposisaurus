import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search component', () => {
	render(<App />);
	const linkElement = screen.getByText(/Search GitHub Repositories/i);
	expect(linkElement).toBeInTheDocument();
});

import { screen, fireEvent } from '@testing-library/react';

import App from './App';

import * as waitMock from './helpers/wait';
import { renderWithProviders } from './utils/renderWithProviders';

const waitSpy = jest.spyOn(waitMock, 'wait');

describe('App', () => {
	it('should render App with form elements and a title', () => {
		// const { container } = render(<App />);

		// screen.logTestingPlaygroundURL() // for take a link to playground  https://testing-playground.com/#markup=DwEwlgbgfMC2CGYB2ACE8Au8C0GCmAzhmCALwBE8ADleTABYCMKAxgDbwEEXEZt50AwgCc8mPCgCuBPMOAB6JjABmAe2GxWHLhTUbyKeJIyqWq2FX74Kq5crqhIWzt3J7Yg1UgzDVbBxwARnhszjrkQSEGehQAXMIADLEG6Fi4hMRk5MhUxtiR-lAAqjLCKEjwsHgKBTA5xigkcYnJYa71GAYVVRTdAigYAJ5UeDx4AB6dKBDwbJKj5A7y4NCOEG266h5ePn4B8MGh7C4UBdHqzYytqTj4RE3ZSLkY+QdRUAAKLgDu6iA1bzYdSeDQe8SuBmO4Q6XUqCyoPz+BiGIwoCK4v2EIAMMzmCyWKxgKw2bi2nm8vkKwA6jSy8QATK0oe0QVMUQsCJJArAwFNcfMKCIxPgpKUCZAYPJ3JKEMhJYSgA
		//logRoles(container) //name the roles
		renderWithProviders(<App />);

		expect(screen.getByTestId('app')).toBeInTheDocument();

		const userNameInput = screen.getByLabelText(/User name/);
		const passwordInput = screen.getByLabelText(/Password/);
		const submitButton = screen.getByRole('button', { name: /Create user/ });
		const title = screen.getByRole('heading', { level: 1 });

		expect(userNameInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
		expect(title).toBeInTheDocument();
	});

	it('should render error message when form was submit with a weak password', async () => {
		renderWithProviders(<App />);

		const userNameInput = screen.getByLabelText(/User name/);
		const passwordInput = screen.getByLabelText(/Password/);
		const submitButton = screen.getByRole('button', { name: /Create user/ });

		const successMessage = screen.queryByText(/created with password/);
		const errorMessage = screen.queryByText(
			/Password must be at least 8 characters long/,
		);

		expect(successMessage).not.toBeInTheDocument();
		expect(errorMessage).not.toBeInTheDocument();


		fireEvent.change(userNameInput, { target: { value: 'John' } });
		fireEvent.change(passwordInput, { target: { value: '123' } });
		fireEvent.click(submitButton);


		const errorMessageAfterSubmit = await screen.findByText(
			/Password must be at least 8 characters long/,
		);
		expect(errorMessageAfterSubmit).toBeInTheDocument();
	});

	it('should render success message after successful submit', async () => {
		renderWithProviders(<App />);

		const userNameInput = screen.getByLabelText(/User name/);
		const passwordInput = screen.getByLabelText(/Password/);
		const submitButton = screen.getByRole('button', { name: /Create user/ });

		const successMessage = screen.queryByText(/created with password/);
		const errorMessage = screen.queryByText(
			/Password must be at least 8 characters long/,
		);

		expect(successMessage).not.toBeInTheDocument();
		expect(errorMessage).not.toBeInTheDocument();

		const promise = Promise.resolve();

		waitSpy.mockImplementationOnce(() => promise);


		fireEvent.change(userNameInput, { target: { value: 'John' } });
		fireEvent.change(passwordInput, { target: { value: 'Qwer3212@1@' } });
		fireEvent.click(submitButton);


		const successMessageAfterSubmit = await screen.findByText(
			/created with password/,
		);
		expect(successMessageAfterSubmit).toBeInTheDocument();
	});
});

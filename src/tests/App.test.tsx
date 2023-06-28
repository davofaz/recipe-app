import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';


test('renders the App component', () => {
    // Arrange
    render(<App />);

    // Act
    const headingElement = screen.getByText(/Recipe Finder/i);

    // Assert
    expect(headingElement).toBeInTheDocument();

});

test('API request returns status 200', async () => {
    // Mock the fetch function
    const mockFetch = jest.fn().mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValueOnce({ results: [] }),
    });
    global.fetch = mockFetch;

    render(<App />);

    // Simulate the action that triggers the API request
    userEvent.type(screen.getByRole('textbox', { name: /search/i }), 'chicken');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for the API request to complete
    //await screen.findByText('No results found');

    // Verify that fetch was called with the correct URL
    expect(mockFetch).toHaveBeenCalledWith(
        'https://api.spoonacular.com/recipes/complexSearch?apiKey=4afde5867b95408da83b5616319634e9&query=chicken&cuisine='
    );

    // Verify that the status code is 200
    expect(mockFetch.mock.calls[0][0].status).toBe(200);
});
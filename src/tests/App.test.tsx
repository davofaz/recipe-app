import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';


test('renders the App component', () => {
    // Arrange
    render(<App />);

    // Act
    const headingElement = screen.getByText(/Recipe Finder/i);

    // Assert
    expect(headingElement).toBeInTheDocument();

});



it('should fetch and display search results', async () => {
   
    render(<App />);


    //expect(screen.getByText('No results found')).toBeInTheDocument();

    // Simulate user interaction by filling the search input and clicking the search button
    const searchInput = screen.getByPlaceholderText('Search for a Recipe');
    const searchButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    fireEvent.click(searchButton);

    // Wait for the API response and the data to be rendered
    await waitFor(() => {
        expect(screen.getByText('Chicken 65')).toBeInTheDocument();
    });
    await waitFor(() => {
        expect(screen.getByText('Chicken Suya')).toBeInTheDocument();
    });

    
});
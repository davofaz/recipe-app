import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe("App renders", () => { 
    test('renders the App component', () => {
        // Arrange
        render(<App />);

        // Act
        const headingElement = screen.getByText(/Recipe Finder/i);

        // Assert
        expect(headingElement).toBeInTheDocument();
        //console.log('App name:', (headingElement).textContent)

    });
});
describe("API calls", () => { 
    it('should fetch and display search results', async () => {
   
        render(<App />);

        // Simulate user interaction by filling the search input and clicking the search button
        const searchInput = screen.getByPlaceholderText('Search for a Recipe');
        const searchButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(searchInput, { target: { value: 'beans' } });
        fireEvent.click(searchButton);
    
        //console.log('before  waitfor: ')
        const items = await screen.findAllByRole("listitem");
        const itemTexts = items.map((item) => item.textContent);
       // console.log(itemTexts);
        expect(itemTexts).toContain('Beans Hawaiian');
        expect(itemTexts).toContain('Escarole & Beans');    
    });
});

describe("User Actions", () => { 
    it('search state is cleared on button click', () => {
        render(<App />);

        const searchInput = screen.getByPlaceholderText('Search for a Recipe') as HTMLInputElement;
        const clearButton = screen.getByText('Clear');

        // Simulate user input
        fireEvent.change(searchInput, { target: { value: 'Pizza' } });

        // Verify search state is updated
        expect(searchInput.value).toBe('Pizza');

        // Simulate button click
        fireEvent.click(clearButton);

        // Verify search state is cleared
        expect(searchInput.value).toBe('');
    });
});
import { render, screen, fireEvent } from '@testing-library/react';
import { HashRouter as Router } from 'react-router-dom';
import App from '../App';

describe("App renders", () => { 
    test('renders the App component', () => {
        // Arrange
        render(
            <Router>
                <App />
            </Router>
            );

        // Act
        const headingElement = screen.getByText('My Recipe Finder');

        // Assert
        expect(headingElement).toBeInTheDocument();
        //console.log('App name:', (headingElement).textContent)

    });

});


describe("API calls", () => { 
    it('should fetch and display search results', async () => {
   
         render(
            <Router>
                <App />
            </Router>
            );

        // Simulate user interaction by filling the search input and clicking the search button
        const searchInput = screen.getByPlaceholderText(/Search for a Recipe/i);
        const searchButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(searchInput, { target: { value: 'beans' } });
        fireEvent.click(searchButton);
   
        //console.log('before  waitfor: ')
        const items = await screen.findAllByRole("listitem");
        const itemTexts = items.map((item) => item.textContent);
        expect(itemTexts).toContain('Beans Hawaiian');

        const recipeImage = await screen.findAllByAltText("Beans Hawaiian");
        expect(recipeImage.length).toBeGreaterThan(0);

        const servings = await screen.findByText(/servings/i);
        expect(servings).toBeInTheDocument();
        const mins = await screen.findByText(/mins/i);
        expect(mins).toBeInTheDocument();

        //console.log((mins).textContent);
        const linkElements = await screen.findAllByRole('link');
        const filteredLinks = linkElements.filter((linkElement) =>
        linkElement.className.includes('recipe-link')
        );

        filteredLinks.forEach((linkElement) => {
          expect(linkElement).toHaveAttribute(
            'href',
            'https://www.foodista.com/recipe/FL3QKDTP/beans-hawaiian'
          );
        });
        //console.log('LINK ELEMENTS' , filteredLinks);
        
    });
});

describe("User Actions", () => { 
    it('search state is cleared on button click', () => {
         render(
            <Router>
                <App />
            </Router>
            );

        const searchInput = screen.getByPlaceholderText('Search for a Recipe - try typing a main ingredient') as HTMLInputElement;
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

    it('bookmark is added when bookmark button is clicked', async () => {
        render(
            <Router>
                <App />
            </Router>
        );

       // Simulate user interaction by filling the search input and clicking the search button
        const searchInput = screen.getByPlaceholderText(/Search for a Recipe/i);
        const searchButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(searchInput, { target: { value: 'beans' } });
        fireEvent.click(searchButton);

        const items = await screen.findAllByRole("listitem");
        const itemTexts = items.map((item) => item.textContent);
        expect(itemTexts).toContain('Beans Hawaiian');
       // console.log('ITEM TEXT: ', itemTexts)


         //console.log('before  waitfor: ')
        const bookmarkButton = await screen.getAllByRole('button')[2];
        //console.log('Button: ', bookmarkButton)
        expect(bookmarkButton.className).toContain('bookmark-button');
        fireEvent.click(bookmarkButton);
        const bookmarkCounter = screen.getByText('1 Bookmark')
        expect(bookmarkCounter).toBeInTheDocument();
        //console.log('Bookmark Counter Text: ', bookmarkCounter.textContent)
        
        
    })


});



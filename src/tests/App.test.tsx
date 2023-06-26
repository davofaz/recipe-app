import React from 'react';
import { render, screen} from '@testing-library/react';
import App from '../App';


test('renders the App component', () => {
    // Arrange
    render(<App />);

    // Act
    const headingElement = screen.getByText(/Recipe Finder/i);

    // Assert
    expect(headingElement).toBeInTheDocument();

});
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';


test('renders the App component', () => {
    // Arrange
    const { getByText } = render(<App />);

    // Act
    const headingElement = getByText(/Recipe Finder/i);

    // Assert
    expect(headingElement).toBeInTheDocument();

});
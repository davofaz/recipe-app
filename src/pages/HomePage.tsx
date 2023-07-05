import React from 'react';
import { Link } from 'react-router-dom';
import App from '../App';

const HomePage = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Bookmarks">Bookmarks</Link>
          </li>
        </ul>
      </nav>
         <App />
    </div>
  );
};

export default HomePage;

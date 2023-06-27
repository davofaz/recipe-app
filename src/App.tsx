import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';

interface Recipe {
    value: string;
}

const App: React.FC = () => {

    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Recipe[]>([]);

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Api request

    try {
      // Perform API request using the search query
        const response = await fetch(`https://api.spoonacular.com/recipes/search?apiKey=4afde5867b95408da83b5616319634e9&search=${search}`);
        const data = await response.json();

      // Update the search results state
        setSearchResults(data.hits);

    } catch (error) {
      console.error('Error occurred during API request:', error);
    }
 };

    useEffect(() => {
        console.log(searchResults);
    }, [searchResults]);


  return (
    <div className="App">
          <header className="App-header">
              <h1 className="text-2xl">Recipe Finder</h1>
              <form onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    name="search" 
                    value={search} 
                    onChange={handleSearch} 
                    placeholder="Search for a Recipe" 
                  />
                <button type="submit">Submit</button>
              </form>
          </header>

          <div className="App-main">
              <p>Your results for: {search}</p>
              
          </div>
    </div>
  );
}

export default App;

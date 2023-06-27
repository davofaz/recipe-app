import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';

interface Recipe {
    //value: string;
    readyInMinutes: number;
    sourceUrl: string;
    image: string;
    servings: number;
    id: number;
    title: string;
    searchResults: null;
    //cuisine: string;
    //setCuisine: string;
}

const cuisines: string[] = [
    'African',
    'Asian',
    'American',
    'British',
    'Cajun',
    'Caribbean',
    'Chinese',
    'Eastern European',
    'European',
    'French',
    'German',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Japanese',
    'Jewish',
    'Korean',
    'Latin American',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese'
];


const App: React.FC = () => {

    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Recipe[]>([]);
    const [cuisine, setCuisine] = useState<string>('');

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Api request

    try {
      // Perform API request using the search query
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4afde5867b95408da83b5616319634e9&query=${search}&cuisine=${cuisine}`);
        const data = await response.json();

      // Update the search results state
        setSearchResults(data.results);

    } catch (error) {
      console.error('Error occurred during API request:', error);
    }
 };

    useEffect(() => {
        console.log(searchResults);
    }, [searchResults]);

    const handleCuisineChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCuisine(e.target.value);
    }

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
                  <select id="cuisine" value={cuisines} onChange={handleCuisineChange}>
                  <option value="">-- Select Cuisine --</option>
                  {cuisines.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>
                          {cuisine}
                      </option>
                  ))}
                  </select>
                <button type="submit">Submit</button>
              </form>
          </header>

          <div className="App-main">
              <p>Your results for: {search}</p>
              <ul>
                  {searchResults.map((recipe) => (
                      <li key={recipe.id}>{recipe.title}</li>
                  ))}
              </ul>
              
          </div>
    </div>
  );
}

export default App;

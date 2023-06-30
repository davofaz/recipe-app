import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';

interface Recipe {
    readyInMinutes: number;
    sourceUrl: string;
    image: string;
    servings: number;
    id: number;
    title: string;
}

const cuisineOptions = [
    { value: '', label: 'Select Cuisine' },
    { value: 'African', label: 'African' },
    { value: 'Asian', label: 'Asian' },
    { value: 'American', label: 'American' }, 
    { value: 'British', label: 'British' },
    { value: 'Cajun', label: 'Cajun' },
    { value: 'Caribbean', label: 'Caribbean' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Eastern European', label: 'Eastern European' },
    { value: 'European', label: 'European' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Greek', label: 'Greek' },
    { value: 'Indian', label: 'Indian' },
    { value: 'Irish', label: 'Irish' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Jewish', label: 'Jewish' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Latin American', label: 'Latin American' },
    { value: 'Mediterranean', label: 'Mediterranean' },
    { value: 'Mexican', label: 'Mexican' },
    { value: 'Middle Eastern', label: 'Middle Eastern' },
    { value: 'Nordic', label: 'Nordic' },
    { value: 'Southern', label: 'Southern' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Thai', label: 'Thai' },
    { value: 'Vietnamese', label: 'Vietnamese' },
];


const App: React.FC = () => {

    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Recipe[]>([]);
    const [cuisine, setCuisine] = useState<string>('');
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHasSubmitted(true);

    //Api request

    try {
      // Perform API request using the search query
        const apiKey = process.env.REACT_APP_RECIPE_API_KEY;

        const response = await fetch(`https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${search}&cuisine=${cuisine}`);
          if (response.status === 200) {
            const data = await response.json();
            setSearchResults(data.results);
            } else if (response.status === 404) {
            // Handle 404 error
            console.log('Unable to find device');
            } else {
            // Handle other error scenarios
            console.log('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error occurred during API request:', error);
        }
 };

    useEffect(() => {
        //console.log(searchResults);
    }, [searchResults]);

    const handleCuisineChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCuisine(e.target.value);
    }

    const handleClearResults = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch('');
        setCuisine('');
        setSearchResults([]);
        setHasSubmitted(false);
};

  return (
    <div className="App">
          <header className="App-header">
              <h1 className="text-2xl">Recipe Finder</h1>
              <form onSubmit={handleSubmit} onReset={handleClearResults} role="search">
                  <input 
                      type="text"
                    name="search" 
                    value={search} 
                    onChange={handleSearch} 
                    placeholder="Search for a Recipe" 
                  />
                  <select id="cuisine" value={cuisine} onChange={handleCuisineChange}>
                  <option value="">-- Select Cuisine --</option>
                  {cuisineOptions.map(option => (
                      <option key={option.value} value={option.value}>
                          {option.label}
                      </option>
                  ))}
                  </select>
                  <button type="submit" className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Submit</button>
                  <button
                      type="reset"
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Clear</button>
              </form>
          </header>

          <div className="App-main">
              
              {(hasSubmitted && searchResults.length === 0 && search !== '') && (
                  <p>No results found</p>
              )}
              {searchResults.length > 0 && (
                  <>
                      <p>Your results for: {search}</p>
                      <ul>
                          {searchResults.map((recipe) => (
                              <li key={recipe.id}>
                                  <ul>
                                      <li>{recipe.title}</li>
                                      <li><img src={`https://spoonacular.com/recipeImages/${recipe.image}`} alt={recipe.title} /></li>
                                      <li><a href={recipe.sourceUrl} target="_blank" rel="noreferrer"><button>Link</button></a></li>
                                  </ul>
                              </li>

                          ))}
                      </ul>
                  </>
              )}
          </div>
    </div>
  );
}

export default App;

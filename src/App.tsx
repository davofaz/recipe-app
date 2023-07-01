import React, { ChangeEvent, useEffect, useState } from 'react';
import { MdReadMore, MdOutlineFoodBank } from "react-icons/md";

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
      <div className="App bg-slate-900 text-rose-500 flex-1 flex-col sm:w-full md:w-7/12  ml-auto mr-auto p-2">
          <header className="App-header sticky top-0 bg-slate-900">
              <h1 className="text-2xl p-5 text-center flex flex-row-reverse">Recipe Finder<MdOutlineFoodBank size={34} /></h1>
              <form onSubmit={handleSubmit} onReset={handleClearResults} role="search" className="flex flex-col">
                  <input 
                    type="text"
                    className="border border-black p-2 rounded mb-2"
                    name="search" 
                    value={search} 
                    onChange={handleSearch} 
                    placeholder="Search for a Recipe" 
                  />
                  <select id="cuisine" value={cuisine} onChange={handleCuisineChange} className="border border-black p-2 rounded mb-2">
                  <option value="">-- Select Cuisine --</option>
                  {cuisineOptions.map(option => (
                      <option key={option.value} value={option.value}>
                          {option.label}
                      </option>
                  ))}
                  </select>
                  <button type="submit"
                      className="my-btn-rose">Submit</button>
                  <button
                      type="reset"
                      className="my-btn-rose">Clear</button>
              </form>
          </header>

          <div className="App-main">
              
              {(hasSubmitted && searchResults.length === 0 && search !== '') && (
                  <p>No results found</p>
              )}
              {searchResults.length > 0 && (
                  <>
                      <p className="mb-4">Your results for: {search}</p>
                      <ul>
                          {searchResults.map((recipe) => (
                              <li key={recipe.id}>
                                  <ul>
                                      <li><h2 className="mb-2">{recipe.title}</h2></li>
                                      <li><a href={recipe.sourceUrl} target="_blank" rel="noreferrer"><img className="mb-2" src={`https://spoonacular.com/recipeImages/${recipe.image}`} alt={recipe.title} /></a></li>
                                      <li>
                                          <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
                                              <button className="my-btn-rose"><MdReadMore size={24} />
                                              </button>
                                          </a>
                                      </li>
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

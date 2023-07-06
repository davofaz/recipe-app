import React, { ChangeEvent, useEffect, useState } from 'react';
import { MdOutlineFoodBank} from "react-icons/md";
import { cuisineOptions } from './components/Options';
import { Recipe, Bookmark } from './interfaces/app.interfaces';
import RecipeInfo from './components/RecipeInfo';
import { Outlet, Link } from "react-router-dom";


const App: React.FC = () => {

    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Recipe[]>([]);
    const [cuisine, setCuisine] = useState<string>('');
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

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

   const handleToggleBookmark = (updatedBookmarks: Bookmark[]) => {
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

    useEffect(() => {
        const storedBookmarks = localStorage.getItem('bookmarks');
        if (storedBookmarks) {
          const parsedBookmarks = JSON.parse(storedBookmarks);
          setBookmarks(parsedBookmarks);
          //console.log(storedBookmarks);
    }
  }, []);
    

    


  return (
      <div className="App bg-slate-900 text-rose-500 flex-1 flex-col sm:w-full md:w-7/12  ml-auto mr-auto p-2">
          <header className="App-header sticky top-0 bg-slate-900">
              <Link to={`/`}><h1 className="text-2xl p-5 text-center flex flex-row-reverse">Recipe Finder<MdOutlineFoodBank size={34} /></h1></Link>
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
                  <div className="flex flex-row">
                      <button type="submit"
                          className="my-btn-rose flex-1 w-64 mr-2">Submit</button>
                      <button
                          type="reset"
                              className="my-btn-rose flex-2 w-32">Clear</button>
                  </div>
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
                              <RecipeInfo 
                                key={recipe.id}
                                recipe={recipe}
                                bookmarks={bookmarks}
                                onToggleBookmark={handleToggleBookmark}
                                />
                          ))}
                      </ul>
                  </>
              )}
          </div>
           <Link to={`bookmarks`} state={bookmarks}>Bookmarks</Link> 
          {/*<Link to={{ pathname: '/bookmarks', state: { bookmarks } } as any}>Bookmarks</Link> */}
          <Outlet />
    </div>
  );
}

export default App;

import React, { ChangeEvent, useEffect, useState } from 'react';
import { MdReadMore, MdOutlineFoodBank, MdOutlineTimer, MdOutlineGroups, MdBookmarkAdd } from "react-icons/md";
import { cuisineOptions } from './components/Options'

interface Recipe {
    readyInMinutes: number;
    sourceUrl: string;
    image: string;
    servings: number;
    id: number;
    title: string;
}

interface RecipeInfoProps {
    recipe: Recipe;
    bookmarks: Bookmark[];
    onToggleBookmark: (updatedBookmarks: Bookmark[]) => void;
}
export interface Bookmark  {
    id: number;
    title: string;
    image: string;
    servings: number;
    readyInMinutes: number;
    sourceUrl: string,
};



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
    }
  }, []);
    

    const RecipeInfo: React.FC<RecipeInfoProps> = ({ recipe, bookmarks, onToggleBookmark }) => {
      const isBookmarked = bookmarks.some((bookmark) => bookmark.id === recipe.id);
      const handleBookmarkClick = () => {
        if (isBookmarked) {
          // Remove the recipe from bookmarks
          const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== recipe.id);
          onToggleBookmark(updatedBookmarks);
        } else {
          // Add the recipe to bookmarks
          const updatedBookmarks = [...bookmarks, recipe];
          onToggleBookmark(updatedBookmarks);
        }
  };


        return (
            <li className="mb-5">
                <ul>
                    <li><h2 className="mb-2">{recipe.title}</h2></li>
                    <li className="flex flex-row items-end">
                        <div className="w-[270px]">
                            <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
                                <img className="mb-2 object-cover h-60 w-80" src={`https://spoonacular.com/recipeImages/${recipe.image}`} alt={recipe.title} />
                            </a>
                        </div>
                        <div className="flex flex-col p-2 items-center">                                                     
                            {recipe.readyInMinutes && (
                                <div className="flex flex-col items-center">
                                    <MdOutlineTimer size={24} />
                                    <p className="ml-2 text-center pt-1 pb-2">Ready in {recipe.readyInMinutes} mins</p>
                                </div>
                            )}
                            {recipe.servings && (
                                <div className="flex flex-col p-2 items-center"> 
                                    <MdOutlineGroups className="ml-3" size={24} />
                                    <p className="ml-2 text-center pt-1 pb-2">{recipe.servings} servings</p>
                                </div>
                            )}
                            <div className="flex flex-row place-content-evenly">
                                
                                <button
                                    onClick={handleBookmarkClick}
                                    className="my-btn-rose m-2 mb-0 items-center"
                                ><MdBookmarkAdd size={24} />
                                {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                                </button>
                                
                                <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
                                    <button className="my-btn-rose m-2 mb-0 items-center"><MdReadMore size={24} /></button>
                                </a>
                            </div> 
                        </div>
                    </li>
                </ul>
            </li>
        )
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
    </div>
  );
}

export default App;

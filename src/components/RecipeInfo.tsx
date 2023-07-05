import { RecipeInfoProps } from '../interfaces/app.interfaces';
import { MdReadMore, MdOutlineTimer, MdOutlineGroups, MdBookmarkAdd } from "react-icons/md";

const RecipeInfo: React.FC<RecipeInfoProps> = ({ recipe, bookmarks, onToggleBookmark }) => {
      // Check whether the current recipe is in bookmarks array
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
                                    className={`my-btn-rose m-2 mb-0 items-center ${isBookmarked ? "bg-rose-500 text-rose-300" : ""}`}
                                ><MdBookmarkAdd size={24} />
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

export default RecipeInfo;
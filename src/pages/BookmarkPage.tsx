import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bookmark } from '../interfaces/app.interfaces';
import { MdReadMore, MdCancel, MdOutlineFoodBank } from "react-icons/md";
import { Link } from "react-router-dom";



const BookmarkPage: React.FC = () => {

    const location = useLocation();
    const state = location.state as Bookmark[]; // Assuming the state is of type Bookmark[]
    const navigate = useNavigate();
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(state);
   
    console.log('Bookmarks:', state);

    const handleRemoveBookmark = (id: number) => {
        const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
        setBookmarks(updatedBookmarks);
        // Perform any necessary actions, such as updating local storage
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    };

    return (

        <div className="App bg-slate-900 text-rose-500 flex-1 flex-col sm:w-full md:w-7/12  ml-auto mr-auto p-2">
            <header className="App-header sticky top-0 bg-slate-900">
                <Link to={`/`}><h1 className="text-2xl p-5 text-center flex flex-row-reverse">Recipe Finder<MdOutlineFoodBank size={34} /></h1></Link>
            </header>
            <div className="w-100 flex"><button onClick={() => navigate('/')} className="flex flex-row w-[100px]"><p>Close</p> <MdCancel className="mt-1 ml-2" size={18} /></button></div>
              
            {state.length > 0 ? (
            <ul>
                {bookmarks.map((bookmark, index) => (
                    
                    <ul key={bookmark.id}>
                        <li>
                            <ul className="flex flex-row">
                                <li className="w-20"><a href={bookmark.sourceUrl} target="_blank" rel="noreferrer">
                                        <img className="mb-2 object-cover h-[100px] w-[130px]" src={`https://spoonacular.com/recipeImages/${bookmark.image}`} alt={bookmark.title} />
                                    </a>
                                </li>
                                <li className="ml-2 w-70">
                                    <h3>{bookmark.title}</h3>
                                    <a href={bookmark.sourceUrl} target="_blank" rel="noreferrer">
                                        <button className="my-btn-rose m-1 mb-0 items-center"><MdReadMore size={18} /></button>
                                    </a>
                                    <button className="my-btn-rose m-1 mb-0 items-center" onClick={() => handleRemoveBookmark(bookmark.id)}>
                                        Remove
                                    </button>
                                </li>
                            </ul>                           
                        </li>
                    </ul>
                ))}
                </ul>
            ) : (
                    <p>No bookmarks found.</p>
            )}
        </div>
    );
};


export default BookmarkPage;

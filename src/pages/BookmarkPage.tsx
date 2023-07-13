import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bookmark } from '../interfaces/app.interfaces';
import { MdReadMore, MdCancel, MdOutlineFoodBank } from "react-icons/md";
import { Link } from "react-router-dom";
import BookmarkCounter from '../components/BookmarkCounter';
import TitleComponent from '../components/TitleComponent';



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
            <TitleComponent title="My Bookmarks" />
            </header>
            <div className="w-100 flex justify-end"><button onClick={() => navigate('/')} className="flex flex-row w-[100px]"><p>Close</p> <MdCancel className="mt-1 ml-2" size={18} /></button></div>
            
            {state.length > 0 ? (
            
                <ul>
                    <h3><BookmarkCounter bookmarks={bookmarks} /></h3>
                {bookmarks.map((bookmark, index) => (
                    
                    <ul key={bookmark.id}>
                        <li>
                            <ul className="flex flex-row mt-3">
                                <li className="w-1/5"><a href={bookmark.sourceUrl} target="_blank" rel="noreferrer">
                                        <img className="mb-2 object-cover h-[100px] w-[130px]" src={`https://spoonacular.com/recipeImages/${bookmark.image}`} alt={bookmark.title} />
                                    </a>
                                </li>
                                <li className="ml-2 w-4/5">
                                    <h4>{bookmark.title}</h4>
                                    <ul className="flex flex-row mt-2">
                                        <li>
                                        <a href={bookmark.sourceUrl} target="_blank" rel="noreferrer">
                                            <button className="my-btn-rose  items-center"><MdReadMore size={24} /></button>
                                            </a>
                                        </li>
                                        <li>
                                            <button className="my-btn-rose mt-0 ml-3 items-center" onClick={() => handleRemoveBookmark(bookmark.id)}>
                                                    Remove
                                            </button>
                                        </li>
                                    </ul>
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

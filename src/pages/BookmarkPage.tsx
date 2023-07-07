import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bookmark } from '../interfaces/app.interfaces';
import { MdReadMore } from "react-icons/md";



const BookmarkPage: React.FC = () => {

    const location = useLocation();
    const state = location.state as Bookmark[]; // Assuming the state is of type Bookmark[]
   
    console.log('Bookmarks:', state);

    return (
        <div>
            <ul>
                {state.map((bookmark, index) => (
                    
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
                                </li>
                            </ul>                           
                        </li>
                    </ul>
                ))}
            </ul>
        </div>
    );
};


export default BookmarkPage;

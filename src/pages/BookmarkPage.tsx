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
                    
                        <ul>
                            
                            <li key={index}><h2 className="mb-2">{bookmark.title}</h2></li>
                            <li><a href={bookmark.sourceUrl} target="_blank" rel="noreferrer">
                                  <img className="mb-2 object-cover h-60 w-80" src={`https://spoonacular.com/recipeImages/${bookmark.image}`} alt={bookmark.title} />
                            </a>
                            </li>
                      
                             <li><a href={bookmark.sourceUrl} target="_blank" rel="noreferrer">
                                    <button className="my-btn-rose m-2 mb-0 items-center"><MdReadMore size={24} /></button>
                                    </a>
                              </li>
                        </ul>
                ))}
            </ul>
        </div>
    );
};


export default BookmarkPage;

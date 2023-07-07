import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bookmark } from '../interfaces/app.interfaces';
import { MdReadMore, MdCancel } from "react-icons/md";



const BookmarkPage: React.FC = () => {

    const location = useLocation();
    const state = location.state as Bookmark[]; // Assuming the state is of type Bookmark[]
    const navigate = useNavigate();
   
    console.log('Bookmarks:', state);

    return (
        <div>
            <div className="w-100 flex"><button onClick={() => navigate('/')} className="flex flex-row w-[100px]"><p>Close</p> <MdCancel className="mt-1 ml-2" size={18} /></button></div>
            
            {state.length > 0 ? (
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
            ) : (
                    <p>No bookmarks found.</p>
            )}
        </div>
    );
};


export default BookmarkPage;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bookmark } from '../interfaces/app.interfaces';


const BookmarkPage: React.FC = () => {
    const location = useLocation();
    const state = location.state as Bookmark[]; // Assuming the state is of type Bookmark[]
   
    console.log('Bookmarks:', state);

    return (
        <div>
            <h2>Bookmarks</h2>
            <ul>
                {state.map((bookmark, index) => (
                    <li key={index}>{bookmark.title}</li>
                ))}
            </ul>
        </div>
    );
};


export default BookmarkPage;

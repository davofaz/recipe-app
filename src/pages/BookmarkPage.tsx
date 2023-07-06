// BookmarkPage.tsx
import React from 'react';
//import RecipeInfo from '../components/RecipeInfo';
//import { BookmarkPageProps } from '../interfaces/app.interfaces';

const BookmarkPage: React.FC = () => {
    return (

        <div>
            <h2>Bookmarks</h2>

                
        </div>

    )
}



/*
const BookmarkPage: React.FC<BookmarkPageProps> = ({ bookmarks, onToggleBookmark }) => {
  console.log('Bookmarks:', bookmarks);
  console.log('onToggleBookmark:', onToggleBookmark);

  return (
    <div>
      <h2>Bookmark Page</h2>
      {bookmarks.length > 0 ? (
        <ul>
          {bookmarks.map((bookmark) => (
            <RecipeInfo
              key={bookmark.id}
              recipe={bookmark}
              bookmarks={bookmarks}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </ul>
      ) : (
        <p>No bookmarked recipes found.</p>
      )}
    </div>
  );
};
*/



export default BookmarkPage;

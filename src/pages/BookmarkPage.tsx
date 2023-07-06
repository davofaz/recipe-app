import React from 'react';

interface BookmarkPageProps {
    prop1: string;
    prop2: string;
}

const BookmarkPage: React.FC<BookmarkPageProps> = ({ prop1, prop2 }) => {
    return (

        <div>
            <h2>Bookmarks</h2>
            <p>Prop 1: {prop1}</p>
            <p>Prop 2: {prop2}</p>
                
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

import React from 'react';

interface BookmarkCounterProps {
    bookmarks: any[]; // Replace 'any' with the actual type of your bookmarks array
}

const BookmarkCounter: React.FC<BookmarkCounterProps> = ({ bookmarks }) => {

        return (
        <>
            <h3 className="ml-1">{bookmarks.length} {bookmarks.length === 1 && 'Bookmark'} {bookmarks.length !== 1 && 'Bookmarks'}</h3>
        </>
    )
}

export default BookmarkCounter
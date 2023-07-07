import React from 'react';

interface BookmarkCounterProps {
    bookmarks: any[]; // Replace 'any' with the actual type of your bookmarks array
}

const BookmarkCounter: React.FC<BookmarkCounterProps> = ({ bookmarks }) => {

        return (
        <>
            {bookmarks.length} {bookmarks.length === 1 && 'Bookmark'} {bookmarks.length !== 1 && 'Bookmarks'}
        </>
    )
}

export default BookmarkCounter
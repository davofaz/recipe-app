import React from 'react';
import ReactDOM from 'react-dom/client';
//import { createBrowserRouter,  RouterProvider } from 'react-router-dom';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import BookmarkPage from './pages/BookmarkPage'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,    
    },
    {
        path: "bookmarks",
        element: <BookmarkPage />,
        errorElement: <ErrorPage />,
    },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
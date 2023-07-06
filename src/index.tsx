import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,  RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import BookmarkPage from './pages/BookmarkPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
     children: [
      {
        path: "bookmarks",
             element: <BookmarkPage prop1="value1" prop2="value2" />
      },
    ],
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
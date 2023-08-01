import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Testing from './pages/Testing';
import EditorJsonApproach from './pages/EditorJsonApproach';
import ErrorPage from './pages/Error';
import Editor from './pages/Editor';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <EditorJsonApproach />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/editor',
    element: <Editor />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/testing',
    element: <Testing />,
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

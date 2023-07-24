import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Editor from './pages/Editor';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Testing from './pages/Testing';
import EditorJsonApproach from './pages/EditorJsonApproach';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Editor />,
  },
  {
    path: '/editorjson',
    element: <EditorJsonApproach />,
  },
  {
    path: '/testing',
    element: <Testing />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

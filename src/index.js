import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ListPage from './component/ListPage';
import Create from './component/Create'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Detail from './component/Detail';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/listofpage/:id",
    element: <ListPage></ListPage>,
  },
  {
    path: "/create/:id",
    element: <Create></Create>,
  },
  {
    path: "/detail/:id",
    element: <Detail></Detail>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

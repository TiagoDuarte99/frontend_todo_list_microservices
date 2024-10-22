import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';


import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Login from './components/loginPage'
import Dashboard from './components/dashboard'
import ToDoList from './components/toDoListsPage'
import ProtectedRoute from './components/ProtectedRoute';


const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute element={<Dashboard />} />
        ),
      },
      {
        path: "/to-do-list",
        element: (
          <ProtectedRoute element={<ToDoList />} />
        ),
      }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='container main'>
    <RouterProvider router={router} />
    </div>
  </StrictMode>,
)

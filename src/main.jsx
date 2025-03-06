import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './router';
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./Components/AuthContext.jsx";
import HomeNav from './Components/HomeNav.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  </StrictMode>,
);
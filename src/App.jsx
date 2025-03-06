import React, { useState} from 'react';
import Home from "./Pages/Home";
import Login from './Pages/Login';
import About from './Pages/About';
import { useAuth } from './Components/AuthContext';
import SignUp from './Pages/SignUp';

export default function App() {
  const { session, user } = useAuth();
  return (
    <>
      <Home session={session}/>
    </>

  );
}
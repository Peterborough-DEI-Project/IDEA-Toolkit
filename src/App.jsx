
import React, { useState} from 'react';
import Routing from './Utils/Routes'
import HomeNav from './Components/HomeNav'
import { BrowserRouter } from 'react-router'

export default function App() {
  const [session, setSession] = useState(null);
  return (
    <BrowserRouter>
        <div className='flex flex-col h-full w-full'>
      <div className='sticky w-full'>
        <HomeNav session={session} setSession={setSession}/>
      </div>
      <div className='w-full min-h-[100vh]'>
        <Routing session={session} setSession={setSession}/>
      </div>
    </div>
    </BrowserRouter>

  )

}

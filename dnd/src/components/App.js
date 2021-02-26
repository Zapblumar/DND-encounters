import React, { useState } from 'react'
import Profile from './profile';
import Login from './Login'
import Signup from './Signup';
import NotFound from './notFound';
import Home from './home';
//import Chat from './Chat';
import useStorage from './useStorage';
import Nav from './Navbar';

const PAGE = {
  Home, Signup, Login, Profile
};


function App() {

  const [currentPage, handlePageChange] = useState("Home")
  const Page = PAGE[currentPage];

  return (
    <div>
      <Nav
        currentPage={currentPage} handlePageChange={handlePageChange}

      ></Nav>


      <main>
        {<Page />}


      </main>
    </div>
  )
}

export default App;


import React, { useState } from 'react'
import Profile from './Profile';
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
  const [user, setUser] = useStorage("user")
  const [currentPage, handlePageChange] = useState("Home")
  const Page = PAGE[currentPage];

  return (
    <div>
      <Nav
        currentPage={currentPage} handlePageChange={handlePageChange}

      ></Nav>


      <main>
        {user ? <Profile user={user} /> : <Page onUserSubmit={setUser} />}



      </main>
    </div>
  )
}

export default App;


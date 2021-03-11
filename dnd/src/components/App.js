import React, { useState } from 'react'
//import Profile from './Profile';
import Login from './Login'
import Signup from './Signup';
import NotFound from './notFound';
import Home from './home';
import Chat from './Chat';
import useStorage from './useStorage';
import Nav from './Navbar';
import Footer from './Footer';

const PAGE = {
  Home, Signup, Login, Chat
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
        {user ? <Chat user={user} /> : <Page onUserSubmit={setUser} />}



      </main>
      <Footer />
    </div>
  )
}

export default App;


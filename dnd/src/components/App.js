
import React, { useState } from 'react'
import './App.css';
import Login from './Login';
import LogOut from './LogOut'
import Signup from './Signup';
import NotFound from './notFound';
import Home from './home';
import Chat from './Chat';
import Character from './Characters';
import useStorage from './useStorage';
import Nav from './Navbar';
import Footer from './Footer';

const PAGE = {
  Home, Signup, Login, Chat, LogOut

};

function App() {
  const [character, setCharacter] = useStorage("character");
  const [user, setUser] = useStorage("user");
  const [currentPage, handlePageChange] = useState("Home");
  const Page = PAGE[currentPage];
  const onCharSubmit = () => { }
  return (
    <div>
      <Nav currentPage={currentPage} handlePageChange={handlePageChange}></Nav>

      <main>

        {character ? <Chat character={character} /> : user ? <Character user={user} onCharSubmit={setCharacter} /> : <Page onUserSubmit={setUser} />}




      </main>
      <Footer />
    </div>
  );
}

export default App;

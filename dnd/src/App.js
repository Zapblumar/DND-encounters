import React, { useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import './App.css';
import Login from './components/Login/index2';
import LogOut from './components/LogOut'
import Signup from './components/Signup/index1';
import NotFound from './components/notFound';
import Home from './components/home';
import Chat from './components/Chat';
import Character from './components/Characters';
import useStorage from './components/useStorage';
import Nav from './components/Navbar';
import Footer from './components/Footer';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});
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
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Nav currentPage={currentPage} handlePageChange={handlePageChange}></Nav>

        <main>

          {character ? <Chat character={character} /> : user ? <Character user={user} onCharSubmit={setCharacter} /> : <Page onUserSubmit={setUser} />}




        </main>
        <Footer />
      </div>

    </ApolloProvider>
  );

}

export default App;
{/* <div>
 
</div>
  );
} */}
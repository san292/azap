// == Imports NPM
import React from 'react';
// == Imports Components
import NavBar from '../NavBar';
import Header from '../Header';
import Footer from '../Footer';

const UserLibrary = () => {
  return (
    <div>
      <Header />
      <NavBar />
      Hello from UserLibrary !
      <Footer />
    </div>
  );
}

export default UserLibrary;
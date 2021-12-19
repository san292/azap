// == Imports NPM
import React from 'react';
// == Imports Components
import NavBar from '../NavBar';
import Header from '../Header';
import Footer from '../Footer';
// == Import library @material-ui
import { CardMedia, Card } from '@material-ui/core';
// == Import image 404
import error404 from '../../images/404.jpg';

const Error = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <Card>
        <CardMedia 
          component="img"
          alt="404 page"
          height="500"
          image={error404}
        />
      </Card>
      <p>"Nous sommes désolé, Une erreur s'est produite."</p>
      <Footer />
    </div>
  );
}

export default Error;
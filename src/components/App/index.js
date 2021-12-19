// == Import NPM
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
// == Import Css styles
import './styles.css';
// == Import Components
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Home from '../Home';
import User from '../User';
import UserLibrary from '../UserLibrary';
import MovieDetail from '../MovieDetail';
import Error from '../Error';
import Search from '../Search';
import Contact from '../Contact';

const App = () => {
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/sign-in">
          <SignIn />
        </Route>
        <Route exact path="/sign-up">
          <SignUp/>
        </Route>
        <Route exact path="/my-profile">
          <User />
        </Route>
        <Route exact path="/library">
          <UserLibrary />
        </Route>
        <Route exact path="/movie">
          <MovieDetail />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </div>
  );
}

export default App;


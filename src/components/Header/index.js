// == Import NPM
import React from 'react';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar,
  Toolbar,
  Button,
}from '@material-ui/core';
// == Import image
import Logo from '../Header/logo_azap.png';

/** variable useStyles store function makeStyles
 * function makeStyles () store component's classes uses for styling
 */
const useStyles = makeStyles(() => ({
  headerContainer: {
    background: 'linear-gradient(45deg, #bdc3c7 6.5%, #424642 16%)',
    // backgroundColor: '#424642',
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    width: 60,
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#F8D800',
  },
}));

/** function Header export Header component  */
export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.headerContainer}>
          <Button href="/">
            <img src={Logo} alt="Logo" className={classes.logo}/>
          </Button>    
          <Button variant="contained" href="/sign-in" className={classes.button} >
            Connexion
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
// == Imports NPM
import React from 'react';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography, 
} from '@material-ui/core';

import Contact from '../Contact';

const useStyles = makeStyles(() => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F3F4ED',
    paddingTop: 20,
    padding: 20,
  },
  footerTitle: {
    fontSize: 15,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <>
    <div className={classes.footer} >
      <Typography variant="h3" className={classes.footerTitle}>© "AZAP" 2021 </Typography>
      <Contact label="Nous contacter" mailto="mailto:azapteamcontact@gmail.com" />

    </div>
    </>
  );
}

export default Footer;
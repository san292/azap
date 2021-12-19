// == Imports NPM
import React from 'react';
// == Imports Components
import NavBar from '../NavBar';
import Header from '../Header';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  ButtonGroup,
} from '@material-ui/core';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Favorite from '@material-ui/icons/Favorite';
// == Import images
import parasite from '../../images/parasite.jpg';

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: '#F3F4ED',
  },
  cardContainer: {
    padding: 30,
  },
  action : {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  icon: {
    color: '#F8D800',
  },
});

const MovieDetail = () => {
  const classes = useStyles();

  return (
    <Box component="div" className={classes.mainContainer}>
      <Header />
      <NavBar />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card className={classes.cardContainer}>
            <CardActionArea>
              <CardMedia 
                component="img"
                alt="Toto et les oiseaux"
                
                image={parasite}
              />
              <CardContent>
                <CardActions className={classes.action}>
                  <ButtonGroup size="small" className={classes.icon}>
                    <Favorite />
                    <LibraryBooksIcon />
                  </ButtonGroup>
                </CardActions>
                <Typography gutterBottom variant="h5">
                  Toto et les oiseaux
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit tenetur hic culpa tempora labore nihil eius quae perferendis exercitationem illum, dignissimos neque eum porro illo possimus nulla! Magni, ex ipsam?
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
export default MovieDetail;
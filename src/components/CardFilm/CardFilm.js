// == Import NPM
import React from 'react';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
}
from '@material-ui/core';
import { findByLabelText } from '@testing-library/react';
// == Import Css styles
const useStyles = makeStyles({
  root: {
  },
  button: {
    backgroundColor: '#F8D800',
    margin: 'auto',
    display: 'flex',
    alignItems: 'baseline',
  },
  title: {
    margin: 0,
    padding: 0,
  }
});

export default function CardFilm({original_title: title, poster_path: poster, vote_average: vote, }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href="/movie">
        <CardMedia
          component="img"
          alt="Display top 20 films"

          image={`https://image.tmdb.org/t/p/w300/${poster}`}
          title="Display top 20 films"
        />
        <CardContent className={classes.title}>
          <Typography variant='subtitle2' component="h2" >
          {title}
          </Typography>
          {vote}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" href="/movie" size="small" className={classes.button}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
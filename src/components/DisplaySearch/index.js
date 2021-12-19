// == Imports NPM
import React from "react";
// == Import library @material-ui
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Favorite from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
/**useStyles is a function where you can modified css */
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 900,
    margin: "auto",
  },
  typography: {
    color: "#F8D800",
    backgroundColor: "#424642",
  },
  media: {
    paddingTop: "80.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#424642",
    color: "#F3F4ED",
  },
  iconButton: {
    color: '#F8D800',

  },
}));
/**resultat is a function for result of search
 * @param {string} films - The props of the search.
 */
const Resultat = ({ films }) => {
  //console.log("filmssssssssssssssssssssssssss", films);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  /**handleExpandClick is a function for expandClick */
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  /** map is a function for map of the result of search  */
  return films.map((film) => (
    <Card className={classes.root} key={film.id} id={film.id}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {film.vote_count}
          </Avatar>
        }
      />
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
        alt={film.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"className={classes.iconButton}>
          <Favorite />
        </IconButton>
        <IconButton aria-label="LibraryBook" className={classes.iconButton}>
          <LibraryBooksIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="50" unmountOnExit>
        <CardContent>
          <Typography paragraph className={classes.typography}>
            Resumé du film
          </Typography>
          <Typography paragraph>{film.title}</Typography>
          <Typography paragraph>Date de sortie: {film.release_date}</Typography>
          <Typography paragraph>{film.overview}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  ));
};
export default Resultat;

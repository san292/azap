// == Import NPM
import React, { useEffect, useState } from "react";
import axios from "axios";
// == import composant material-ui;
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  genre: {
    backgroundColor: "rgb(137, 148, 153)",
    padding: '2em',
    margin: '1em',
  },
  radioButton: {
    margin: "auto",
    width: '10em',
    color: "#000",
  },
  runtime: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: "center",
    backgroundColor: "rgb(137, 148, 153)",
    padding: '2em',
    margin: '1em',
  },
  title: {
    margin: "auto",
    fontWeight: 600,
    color: "#000",
    fontSize: "1.3em",
    padding: '1em',
  },
  button: {
    width: 200,
    margin: theme.spacing(1, 1, 0, 0),
    backgroundColor: "#F8D800",
    padding: theme.spacing(1, 2),
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
}));

/** permet de filtrer la recherche par genre  */
const Filters = ({ setResultat }) => {
  const [movies, setMovies] = useState([]);
  const classes = useStyles();

  const [valueGenre, setValueGenre] = useState("Action");
  const [valueTime, setValueTime] = useState("2h00 et 3h00");
  // eslint-disable-next-line no-unused-vars
  const [moviesResult, setMoviesResult] = useState([]);

  // je créé un tableau d'objet de durée
  const tabTime = [
    { time: "1h00 et 1h30", minutesgte: 60, minuteslte: 90 },
    { time: "1h30 et 2h00", minutesgte: 90, minuteslte: 120 },
    { time: "2h00 et 3h00", minutesgte: 120, minuteslte: 180 },
    { time: "3h00 et 4h00", minutesgte: 180, minuteslte: 300 },
    { time: "4h00 et 5h00", minutesgte: 240, minuteslte: 300 },
    { time: "5h00 et plus", minutesgte: 300, minuteslte: 600 },
  ];

  const getGenres = async () => {
    try {
      const response = await axios.get(
        "https://projet-azap-heroku.herokuapp.com/v1/genres"
      );

      const responseGenres = response.data;
      setMovies(responseGenres);
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const handleRadioChangeGenre = (e) => {
    setValueGenre(e.target.value);
  };

  const handleRadioChangeTime = (e) => {
    setValueTime(e.target.value);
  };

  /* Mise à jour de l'email de l'user */
  const handleSubmit = async (e) => {
    localStorage.removeItem("lastSearchedMovies");
    e.preventDefault();

    // je récupère l'id du genre sélectionné
    const genre = movies.filter((elem) => elem.name.includes(valueGenre));
    const genreId = genre[0].id;

    // je récupère le temps en minutes du time sélectionné
    const time = tabTime.filter((elem) => elem.time.includes(valueTime));
    const timeMinutesgte = time[0].minutesgte;
    const timeMinuteslte = time[0].minuteslte;
    // je cherche la date du jour et je la transforme au format yyyy-mm-dd
    const dateToday = new Date();
    let dd = dateToday.getDate();
    let mm = dateToday.getMonth() + 1;
    let yy = dateToday.getFullYear();
    // j'ajoute un 0 au cas où j'ai un nombre à un chiffre
    if (mm.toString().length === 1) mm = "0" + mm;
    if (dd.toString().length === 1) dd = "0" + dd;
    // et j'applique le format souhaitez pour la recherche
    const release_date = yy + "-" + mm + "-" + dd;

    try {

      const response = await fetch(
        `https://projet-azap-heroku.herokuapp.com/v1/search/withfilters/${genreId}/${timeMinutesgte}/${timeMinuteslte}/${release_date}`
      );

      const resultat = await response.json();

      //on stocke le tableau des movies dans le localStorage afin de garder en mémoire le résulat
      localStorage.setItem("lastSearchedMovies", JSON.stringify(resultat));

      setMoviesResult(resultat);
      setResultat(resultat);

      // permet de vider la derniere recherche enregistrée au bout de 5 minutes
      setTimeout(function () {
        localStorage.removeItem("lastSearchedMovies");
      }, 5 * 60 * 1000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getGenres();
    return () => setMovies([]);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" className={classes.genre}>
          <FormLabel component="h2" className={classes.title} >Séléctionnez un genre</FormLabel>
          <RadioGroup
            id="120"
            aria-label="genre"
            name="genre"
            value={valueGenre}
            onChange={handleRadioChangeGenre}
            row>
            {movies.map((genre, index) => (
              <FormControlLabel
                className={classes.radioButton}
                key={index}
                value={genre.name}
                control={<Radio />}
                label={genre.name}
                name="genre"
              />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.runtime}>
          <FormLabel component="h2" className={classes.title} >Sélectionnez une durée entre</FormLabel>
          <RadioGroup
            aria-label="time"
            name="time"
            value={valueTime}
            onChange={handleRadioChangeTime}
            row>
            {tabTime.map((time, index) => (
              <FormControlLabel
                key={index}
                value={time.time}
                control={<Radio />}
                label={time.time}
                name="genre"
              />
            ))}
          </RadioGroup>
          <Button type="submit" variant="contained" className={classes.button}>
            ACTION !
          </Button>
        </FormControl>
      </form>
      {/* <DisplaySearch films={moviesResult} /> */}
    </div>
  );

  /*   return (
    <div className={classes.genreContainer}>
      <div className={classes.genresStyle}>
        {movies.map((genre) => (
            <Chip label={genre.name} key={genre.id} color="#F8D800" clickable className={classes.genre} size='M' />
          ))}
      </div>
    </div>
  ); */
};

export default Filters;

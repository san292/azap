// == Imports NPM
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  filter: {
    padding: 20,
    minWidth: 100,
    backgroundColor: '#F3F4ED',
  },
}));


export default function Filters() {
  const classes = useStyles();

  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState([])
  const getGenres = async () => {
    try {
      const data = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=455dc6a8d89a57de7742f24ebbf4b441&language=en-US")
      console.log(data.data.genres)
      setGenres(data.data.genres)
    } catch(e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getGenres()
  }, [])

  const handleGenre = (e) => {
    setGenre(e.target.value);
  };

  return (
    
    <div className={classes.filter}>
    <InputLabel>Genre</InputLabel>
      <Select
          displayEmpty
          onChange={handleGenre}
          >
        <MenuItem value=""><em>None</em></MenuItem>   
            {genres.map((genre) => (
            <MenuItem  key={genre.id} value={genre.name}>{genre.name}</MenuItem>
          ))}
      </Select>

      <p>You selected : {genre} </p>
    </div>
    
  );
}
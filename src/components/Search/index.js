// == Import NPM
import React, { useState } from "react";
import axios from "axios";
// == Import components
import NavBar from "../NavBar";
import InputSearch from "../InputSearch";
import DisplaySearch from "../DisplaySearch";
import Filters from "../Filters";

/** permet de faire une recherche par nom, realisateur à partir de l'Api */
const Search = () => {
  const [searchText, setsearchText] = useState("");
  const [resultat, setResultat] = useState([]);

  /** permet de recuperer le texte saisie par l'utilisateur */
  const handleChange = (textSaisi) => {
    setsearchText(textSaisi);
    console.log(
      "verif data from component Search => handleChange :",
      textSaisi
    );
  };
  /** fetch vers l'Api pour recuperer les resultat de la recherche*/
  const fetchResult = async () => {
    try {
      localStorage.removeItem("lastSearchedMovies");

      const response = await axios.get(
        `https://projet-azap-heroku.herokuapp.com/v1/search/${searchText}`
      );

      const movies = response.data;

      setResultat(movies);

      localStorage.setItem("lastSearchedMovies", JSON.stringify(movies));

      setTimeout(function () {
        localStorage.removeItem("lastSearchedMovies");
      }, 5 * 60 * 1000);
      
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const handleSubmit = () => {
    // Je veux lancer une requête 
    fetchResult();
  };

  return (
    <div className="Search">
      <NavBar />
      <InputSearch
        searchText={searchText}
        onSearchChange={handleChange}
        onSearchSubmit={handleSubmit}
      />
      <Filters setResultat={setResultat} />
      <DisplaySearch films={resultat} />
    </div>
  );
};

export default Search;

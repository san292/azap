// == Imports NPM
import React from "react";
import { useState } from "react";
// == Import library @material-ui
import { makeStyles } from "@material-ui/core/styles";
// == Import components
import Display from "../Display";
import Footer from "../Footer";
import Header from "../Header";
import NavBar from "../NavBar";
import DisplaySearch from '../DisplaySearch/';
import InputSearch from "../InputSearch";
//import axios from "axios";

const useStyles = makeStyles(() => ({}));

const Home = () => {
  const [searchText, setsearchText] = useState("");
  const [resultat, setResultat] = useState([]);

  const handleChange = (textSaisi) => {
    setsearchText(textSaisi);
    //console.log('texteSaisie', textSaisi);
  };
  // à supprimer pour sécuriser le code
  //const api_key='455dc6a8d89a57de7742f24ebbf4b441';
  const fetchResult = async () => {
    //console.log('reponse api')
    // J'utilise axios pour lancer la requête

    /********** DEBUT : code ajouté par Back *************/
    try {
      const response = await fetch(`http://localhost:3050/v1/search/${searchText}`);
      const data = await response.json();
      setResultat(data);
    } catch (err) {
      console.log("🚀 ~ err", err)
    }
    /********** FIN : code ajouté par Back *************/

    // code front 
    /* await axios({
      method: 'get',
      //url:` https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=fr&query=${searchText}`
      url:`http://localhost:3050/v1/search`
    }) */
              // const fetchResult = await api
              //   .get("/search/movie", {
              //     params: {
              //       // on donne le paramètre "q" ( comme query, demandé par l'api )
              //       // qui correspond à ce qu'on cherche
              //       q: {searchText },
              //     },
              //   })
    /* .then((res) => {
      //console.log("donnéé general ", res);
      setResultat(res.data.results)
      //console.log("ce que j'ai besoin ", res.data);
    })
    .catch((error) => {
      console.error("verifier votre requete");
    })}; */
  };

    const handleSubmit = () => {
      // Je veux lancer une requête sur l'API Github
      fetchResult();
    }
  const classes = useStyles();
  return (
    <div className="main">
      <Header />
      <NavBar />
      <InputSearch 
        searchText= {searchText}
      onSearchChange= {handleChange}
      onSearchSubmit= {handleSubmit}
      />
      <Display/>
      <DisplaySearch films= {resultat}/>
      <Footer />
      {/*
    {resultatFilm.map((films) => (
    <Display key={films.id} films={films} />
    ))} */}
    </div>
  )
};

export default Home;
// import React from 'react';
// // == Import library @material-ui
// import { makeStyles } from '@material-ui/core/styles';
// // == Import components
// import Display from '../Display';
// import Footer from '../Footer';
// import Header from '../Header';
// import NavBar from '../NavBar';
// import InputSearch from '../InputSearch';

// const useStyles = makeStyles(() => ({

// }));

// const Home = () => {

//   const classes = useStyles();
//   return (
//     <div className='main'>
//     <Header />
//     <NavBar />
//     <InputSearch />
//     <Display />
//     <Footer />
//   {/*
//     {resultatFilm.map((films) => (
//     <Display key={films.id} films={films} />
//     ))} */}
//     </div>
//   );
// }

// export default Home;

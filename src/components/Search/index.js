// == Import NPM
import React from "react";
import { useState } from "react";
//import axios from "axios";
// == Import components
import Header from "../Header/index";
import NavBar from "../NavBar";
import InputSearch from "../InputSearch";
import Filters from "../Filters";
import DisplaySearch from "../DisplaySearch/";
import Footer from "../Footer";
// import api from 'src/api';

const Search = () => {
    const [searchText, setsearchText] = useState("");
    const [resultat, setResultat] = useState([]);

    const handleChange = (textSaisi) => {
        setsearchText(textSaisi);
        // console.log('texteSaisie', textSaisi);
    };
    // à supprimer pour sécuriser le code
    //const api_key='455dc6a8d89a57de7742f24ebbf4b441';
    const fetchResult = async () => {
        //console.log('mooooooiii')
        // J'utilise axios pour lancer la requête

        /********** DEBUT : code ajouté par Back *************/
        try {
            const response = await fetch(
                `http://localhost:3050/v1/search/${searchText}`
            );
            const data = await response.json();
            console.log("🚀 ~ data", data);
            setResultat(data);
        } catch (err) {
            console.log("🚀 ~ err", err);
        }
        /********** FIN : code ajouté par Back *************/

        // axios({
        //     method: "get",
        //     //url:` https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=fr&query=${searchText}`
        //     url: `http://localhost:3050/v1/search`,
        // })
        //     .then((res) => {
        //         // Dans res.data mon objet avec la list des films
        //         setResultat(res.data.results);
        //         //console.log('data==========================>',res.data)
        //     })
        //     // Si j'ai les résultats
        //     // faire un console.log(res.data)
        //     // Gérer l'affichage des résultats
        //     // -> mettre le tableau de repos dans le state
        //     .catch((err) => {
        //         // Sinon log l'erreur
        //         console.log(err);
        //     })
        //     .finally(() => {});
    };

    const handleSubmit = () => {
        // Je veux lancer une requête sur l'API Github
        fetchResult();
    };
    return (
        <div className="Search">
            <Header />
            <NavBar />
            <InputSearch
                searchText={searchText}
                onSearchChange={handleChange}
                onSearchSubmit={handleSubmit}
            />
            <Filters />
            <DisplaySearch films={resultat} />
            <Footer />
        </div>
    );
};

export default Search;

/* eslint-disable no-use-before-define */
// == Import NPM
import React from 'react';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  searchBar: {
    padding: 10,
    display: 'flex',
    justifyContent:'center',
    backgroundColor: '#F3F4ED',
  },

}));

/**fonction qui permet à l'utilisateur de faire une recherche par titre
 * @param {string} searchText - le film à chercher 
 * @param {string} onSearchChange - l'action des que le texte change 
 * @param {string} onSearchSubmit - soumettre le formulaire 

*/
export default function InputSearch ({ searchText, onSearchChange, onSearchSubmit }) {
  const classes = useStyles();
  return (
      <div className={classes.searchBar}>
            <form onSubmit={(evt) => {
               evt.preventDefault()
              onSearchSubmit();
             console.log(evt)
            }}>
              <input 
                icon='search'
                iconPosition='left'
                placeholder="taper votre recherche"
                value={searchText}
                onChange={(evt) => {
                  const textSaisi = evt.target.value;
                  onSearchChange(textSaisi);
                  console.log(textSaisi)
                }}
              />
            </form>
      </div>
  );
};


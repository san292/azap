// == Import NPM
import React from 'react';
import { Link } from "react-router-dom";
/**
 * @name Contact
 * @param {string} mailto - AZAP email
 * @param {string} label - text in label contact
 */
const Contact = ({ mailto, label }) => {
  return (
      <Link
        to='/contact'
        onClick={(event) => {
          window.location = mailto;
          event.preventDefault();
        }}
      >
        {label}
      </Link>
  );
};

export default Contact;

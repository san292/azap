const db = require("../database");

class NoMovieError extends Error {
    constructor() {
        super(`No Movies found in your library`);
    }
}

/**
 * @typedef Movie
 * @property {integer} id_themoviedb Movie id in APi the movie database
 * @property {boolean} seen Movie has been seen or not by user
 */

class Movie {
    //on référence l'erreur custom en tant que propriété statique du modèle pour pouvoir tester la class d'une erreur dans le contrôleur sans avoir à importer la classe de l'erreur
    static NoMovieError = NoMovieError;

    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    /**
     * Retrieves all movies contained in a library 
     * @static
     * @async
     * @returns {Array<Movie>} all movies in a library
     * @throws {Error} an error object
     */
    static async findAllMovies(libraryId) {
        try {
            const preparedQuery = {
                text: 'SELECT * FROM library_has_movie WHERE library_id=$1',
                values: [libraryId],
            };

            const { rows } = await db.query(preparedQuery);

            if (!rows) {
                throw new NoMovieError();
            } else {
                return rows.map((row) => new Movie(row));
            }
            
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            } else {
                throw error;
            }
        }
    }

}

module.exports = Movie;

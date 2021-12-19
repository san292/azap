const { random_array } = require("../utils/random_functions");
const Library = require("../models/library");
const Movie = require("../models/movie");

const libraryController = {
    random: async (req, res) => {
        // 1. on identifie la library dans laquelle on fait la selection aléatoire
        libraryId = req.params.library_id;

        try {
            // 2. on récupère un tableau des films contenus dans cette library
            const movies = await Movie.findAllMovies(libraryId);
            // console.log("🚀 ~ movies", movies)

            // 3. on pioche un film dans le tableau des films
            RandomMovie = random_array(movies);
            // console.log("🚀 ~ RandomMovie", RandomMovie)

            // 4. on retourne le resultat
            res.status(200).json(RandomMovie);
        } catch (error) {
            // console.log("🚀 ~ error", error)
            res.status(200).json(error.message);
        }
    },

    // affiche toutes les libraries d'un user grâce à son id
    findAllByUser: async (req, res) => {
        try {
            // on récupère l'id de l'user
            const id = parseInt(req.session.user.id, 10);

            const libraries = await Library.findAllByUser(id);
            res.json(libraries);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    // shows all movies contained in the user's library
    showMovies: async (req, res) => {
        // 1. on identifie la library dans laquelle on fait la selection aléatoire
        libraryId = req.params.library_id

        try {
            // 2. on récupère un tableau des films contenus dans cette library
            const movies = await Movie.findAllMovies(libraryId);
            // console.log("🚀 ~ movies", movies)

            // 3. on retourne le resultat
            res.status(200).json(movies);

        } catch (error) {
            // console.log("🚀 ~ error", error)
            res.status(200).json(error.message);
        }
    },

    // ajoute une nouvelle library à un user
    addLibrary: async (req, res) => {
        try {
            // on récupère l'id de l'user
            const user_id = parseInt(req.session.user.id, 10);
            // on utilise les données du formulaire pour créer une nouvealle library
            const data = { name: req.body.name, user_id: user_id };

            //  On créé une nouvelle instance de library
            const library = new Library(data);

            // mise à jour dans dans bdd
            const newLibrary = await library.create();

            //  on renvoie la nouvelle libray créé
            res.status(200).json(newLibrary);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    deleteLibrary: async (req, res) => {
        try {
            // on récupère l'id de la library dans la route paramétrée
            const library_id = parseInt(req.params.library_id, 10);

            // on cherche la library à delete par son id
            const library = await Library.findOne(library_id);

            // on delete la library de l'User
            await library.deleteLibrary();

            //  code status 200 tout est ok
            res.status(200).json("Le librarie a bien été supprimé");
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    updateLibrary: async (req, res) => {
        try {
            // on récupère l'id de la library dans la route paramétrée
            const library_id = parseInt(req.params.library_id, 10);

            // on récupère le nouveau nom de la library dans le body
            const { name } = req.body;

            // on cherche la library à delete par son id
            const library = await Library.findOne(library_id);

            // on met à jour le nom de la library
            library.name = name;

            // on update la library de l'User
            await library.updateLibrary();

            //  code status 200 tout est ok
            res.status(200).json("Le nom de la librarie a bien été modifié");
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
};

module.exports = libraryController;

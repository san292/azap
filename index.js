require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");

// import router
const apiSearchRouter = require("./app/router/apiSearchRouter");
const apiDetailMovie = require("./app/router/apiDetailMovie");
const adminRouter = require("./app/router/adminRouter");
const visitorRouter = require("./app/router/visitorRouter");
const userRouter = require("./app/router/userRouter");
const libraryRouter = require("./app/router/libraryRouter");

const app = express();

const expressSwagger = require("express-swagger-generator")(app);

const port = process.env.PORT || 5000;
const secret = process.env.SESSION_SECRET;

/******* CORS *******/
const corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(cors(corsOptions));
/******* END : CORS *******/

// utilisation du req.body via json()
app.use(express.json());

/************* SESSION ************/
// paramétrage des sessions
app.use(
    session({
        // Le secret permet de générer le session ID
        secret: secret,
        // Pour enregistrer toutes les sessions, même celles qui ne sont pas logguées
        saveUninitialized: true,
        // Pour enregistrer la session en cours à chaque chargement
        resave: true,
        cookie: {
            // Détermine l'âge du cookie , ici 1 jour
            // l'âge ttrue exprimé en millisecondes
            maxAge: 1000 * 60 * 60 * 24 * 1000,
        },
    })
);

// middlewares des routes
app.use("/v1", apiSearchRouter);
app.use("/v1", adminRouter);
app.use("/v1", apiDetailMovie);
app.use("/v1", visitorRouter);
app.use("/v1", userRouter);
app.use("/v1", libraryRouter);

/************* SWAGGER JS DOC ************/
// initialisation de swagger
let options = {
    swaggerDefinition: {
        info: {
            description: "Project AZAP (As ZeMovie As Possible)",
            title: "AZAP",
            version: "1.0.0",
        },
        host: `localhost:${port}`,
        basePath: "/v1",
        produces: ["application/json"],
        schemes: ["http", "https"],
    },
    basedir: __dirname, //app absolute path
    files: ["./app/**/*.js"], //Path to the API handle folder
};

// Lancement swagger
expressSwagger(options);

// Lorsque j'appelle la route "/" je redirige vers la page /api-docs
app.get("/", (_, response) => {
    response.redirect("/api-docs");
});

/********** SERVER INIT ********/
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

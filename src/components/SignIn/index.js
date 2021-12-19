// == Import NPM
import React, { useState } from "react";
// == Import library @material-ui
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
// == Import components
import NavBar from "../NavBar";
import Header from "../Header";
import Footer from "../Footer";
/**
 * represente la fonction qui definit le style css du composant
 */
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "white",
        backgroundColor: "#F3F4EE",
        color: "#424642",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#FED049",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: "#FED049",
    },
}));
/**
 * fonction signIn permet à l'utilisateur de sidentifier via son adresse email et son mot de passe
 */
const SignIn = () => {
    const classes = useStyles();
    const [status, setStatus] = useState("Action!");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("En cours...");
        const { email, password } = e.target.elements;
        // let details = {
        //   email: email.value,
        //   password: password.value,
        // };
        // console.log("🚀 ~ details", details)

        // await fetch("https://projet-azap-heroku.herokuapp.com/v1/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json;charset=utf-8",
        //   },
        //   body: JSON.stringify(details),
        // })
        // .then((response) => {
        //   if(response.ok) {
        //     console.log("Tout est OK");
        //     setStatus("Action!");
        //     console.log("REPONSE API AZAP ", response);
        //   } else {
        //     console.log('Mauvaise réponse du réseau');
        //   }
        // })
        // .catch((error) => {
        //   console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
        // });

        /*************** CODE AJOUT DU BACK ************/
        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                }),
            };
            const response = await fetch(
                "https://projet-azap-heroku.herokuapp.com/v1/login",
                requestOptions
            );
            console.log("🚀 ~ response", response);
            const data = await response.json();
            console.log("🚀 ~ data", data);
        } catch (err) {
            console.log("🚀 ~ err", err);
            console.error(this.props.url, status, err.toString());
        }
    };

    return (
        <>
            <Header />
            <NavBar />
            <Container component="main" maxWidth="xs" className={classes.root}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        S'identifier
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Adresse email"
                            name="email"
                            autoComplete="email"
                            type="email"
                            size="3"
                            required
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color=""
                            className={classes.submit}
                        >
                            {status}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {/* Lien vers mot de passe oublié sprint 2
                <Link href="#" variant="body2">
                  Mot de passe oublié?
                </Link> */}
                            </Grid>
                            <Grid item>
                                <Link href="/sign-up" variant="body2">
                                    {"Créer un compte"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Footer />
            </Container>
        </>
    );
};

export default SignIn;

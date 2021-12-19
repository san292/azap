import React, { useEffect, useState } from "react";
import axios from "axios";
// == Import library @material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography, Box } from "@material-ui/core";
// == Import library component CardFilm
import CardFilm from "../CardFilm/CardFilm";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const a11yProps = (index) => {
    return {
        id: `scrollable-force-tab-${index}`,
        "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
};

const useStyles = makeStyles(() => ({
    title: {
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "#F3F4ED ",
        color: "#424642",
        fontSize: 22,
        padding: 20,
    },
    cards: {
        width: "100%",
        display: "flex",
        backgroundColor: "#F3F4ED ",
    },
}));

const Display = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);

    const getTrending = async () => {
        try {
            // code fait par le Front
            //const data = await axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=455dc6a8d89a57de7742f24ebbf4b441")
            // console.log(data.data.results)
            // setTrending(data.data.results);

            // code ajouté par Back
            const response = await fetch("http://localhost:3050/v1/topmovies");
            const data = await response.json();
            setTrending(data);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getTrending();
    }, []);

    const getUpcoming = async () => {
        try {
            const data = await axios.get(
                "https://api.themoviedb.org/3/movie/upcoming?api_key=455dc6a8d89a57de7742f24ebbf4b441&language=en-US&page=1"
            );
            console.log(data.data.results);
            setUpcoming(data.data.results);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getUpcoming();
    }, []);

    return (
        <>
            <Typography variant="h2" className={classes.title}>
                À l'affiche en ce moment :
            </Typography>
            <div className={classes.cards}>
                <Tabs
                    value={value}
                    // onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="none"
                    textColor={"#424642"}
                    aria-label="scrollable force tabs example"
                >
                    {trending.map((film) => (
                        <Tab
                            icon={<CardFilm key={film.id} {...film} />}
                            {...a11yProps(0)}
                        />
                    ))}
                </Tabs>
            </div>
            <Typography variant="h2" className={classes.title}>
                Bientôt en salle :
            </Typography>
            <div className={classes.cards}>
                <Tabs
                    value={value}
                    // onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="none"
                    textColor={"#424642"}
                    aria-label="scrollable force tabs example"
                >
                    {upcoming.map((movie) => (
                        <Tab
                            icon={<CardFilm key={movie.id} {...movie} />}
                            {...a11yProps(0)}
                        />
                    ))}
                </Tabs>
            </div>
        </>
    );
};

export default Display;

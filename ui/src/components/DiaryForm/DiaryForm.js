import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import DiaryDraft from "./DiaryDraft";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 500,
  },
});

const authSelector = (state) => state.auth;

const DiaryForm = (props) => {
  const classes = useStyles();
  const [movieData, setMovieData] = useState();

  const movieID = parseInt(props.match.params.id);
  const auth = useSelector(authSelector);

  useEffect(() => {
    const getMovie = async () => {
      return await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_IMDB_KEY}`
      );
    };

    getMovie().then((res) => setMovieData(res.data));
    // eslint-disable-next-line
  }, []);

  const renderMovieInfo = () => {
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`https://image.tmdb.org/t/p/w300/${movieData.poster_path}`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Released Date:{movieData.release_date}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Overview:{movieData.overview}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  return (
    <>
      {movieData && auth ? (
        <Grid container justify="space-around" style={{ marginTop: "20px" }}>
          <Grid
            xs={11}
            md={5}
            item
            container
            justify="center"
            style={{ marginBottom: "20px" }}
          >
            {renderMovieInfo()}
          </Grid>

          <Grid item xs={11} md={6} style={{ marginBottom: "30px" }}>
            <DiaryDraft
              movieData={{
                title: movieData.title,
                poster_path: movieData.poster_path,
                movieID,
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default DiaryForm;

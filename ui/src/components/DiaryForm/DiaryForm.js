import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import styles from "./DiaryForm.module.css";
import { useForm } from "react-hook-form";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 500,
  },
});

const diarySelector = (state) => state.diaries;

const DiaryForm = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm();
  const [movieData, setMovieData] = useState();
  const [movieCredit, setMovieCredit] = useState();
  const movieID = parseInt(props.match.params.id);
  const diaryContent = useSelector(diarySelector).find(
    (diary) => diary.movieID === movieID
  );

  console.log(diaryContent);
  useEffect(() => {
    const getMovie = async () => {
      return await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_IMDB_KEY}`
      );
    };
    const getCredits = async () => {
      return await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.REACT_APP_IMDB_KEY}`
      );
    };
    getMovie().then((res) => setMovieData(res.data));
    getCredits().then((res) => setMovieCredit(res.data));
  }, []);

  const onSubmit = async (data) => {
    const { poster_path, title } = movieData;
    let requestBody;

    if (diaryContent) {
      const { _id } = diaryContent;
      requestBody = {
        ...data,
        _id,
      };
    } else {
      requestBody = {
        ...data,
        movieID,
        poster_path,
        title,
      };
    }

    await axios.post("/api/diary", requestBody);
    props.history.push("/");
  };

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
            <Typography gutterBottom variant="h5" component="h2">
              {movieData.title}
            </Typography>
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

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <label>Description:</label>
        </div>
        <textarea
          name="description"
          defaultValue={diaryContent ? diaryContent.description : ""}
          cols="50"
          rows="10"
          ref={register}
        />
        <div>
          <label>Rating</label>
        </div>
        <input
          name="rating"
          type="number"
          step="0.5"
          min="1"
          max="5"
          ref={register}
          defaultValue={diaryContent ? diaryContent.rating : ""}
        />
        <div>
          <label>Watched Date</label>
        </div>
        <input
          name="watchedDate"
          type="date"
          ref={register}
          defaultValue={
            diaryContent ? diaryContent.watchedDate.slice(0, 10) : ""
          }
        />
        <div>
          <input type="submit" value={diaryContent ? "Update" : "Submit"} />
        </div>
      </form>
    );
  };

  return (
    <div className={styles.container}>
      {" "}
      {movieData ? renderMovieInfo() : <div></div>}
      {renderForm()}
    </div>
  );
};

export default withRouter(DiaryForm);

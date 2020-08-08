import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import movieSearchReducer from "../reducers/movieSearchReducer";
import CreateIcon from "@material-ui/icons/Create";
import DiaryForm from "./DiaryForm/DiaryForm";
import { Link } from "react-router-dom";
import userDiaryReducer from "../reducers/userDiaryReducer";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 30,
  },
  media: {
    height: 140,
  },
});

const movieSelector = (state) => state.movies;
const diarySelector = (state) => state.diaries;
const userSelector = (state) => state.auth;

export default function Cards() {
  const classes = useStyles();
  const movies = useSelector(movieSelector);
  const diaries = useSelector(diarySelector);
  const auth = useSelector(userSelector);
  const userDiaries = diaries.filter((diary) => diary._user === auth._id);

  const renderCards = () => {
    return movies.map((movie) => {
      return (
        <Card key={movie.id} className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {movie.original_title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {movie.overview}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {auth ? (
              <Button size="small" color="primary" startIcon={<CreateIcon />}>
                {userDiaries.find((diary) => diary.movieID === movie.id) ? (
                  <Link to={`/diary/${movie.id}`}>See Diary</Link>
                ) : (
                  <Link to={`/write/${movie.id}`}>Write</Link>
                )}
              </Button>
            ) : (
              <></>
            )}
          </CardActions>
        </Card>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {renderCards()}
    </div>
  );
}

import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setModal, fetchMovies } from "../actions";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid } from "@material-ui/core/";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import movieSearchReducer from "../reducers/movieSearchReducer";
import CreateIcon from "@material-ui/icons/Create";
import DiaryForm from "./DiaryForm/DiaryDraft";
import { Link as RouterLink } from "react-router-dom";
import userDiaryReducer from "../reducers/userDiaryReducer";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 30,
  },
  media: {
    height: 140,
  },
  watchedMovie: {
    backgroundColor: "rgb(252, 242, 250)",
  },
});

const movieSelector = (state) => state.movies;
const diarySelector = (state) => state.diaries;
const userSelector = (state) => state.auth;

function Cards(props) {
  const classes = useStyles();
  const { results, page, total_pages, term, total_results } = useSelector(
    movieSelector
  );
  const diaries = useSelector(diarySelector);
  const auth = useSelector(userSelector);
  const userDiaries = diaries.filter((diary) => diary._user === auth._id);
  const dispatch = useDispatch();

  const onCardClickHandler = (isWatched, movieID) => {
    if (!auth) {
      dispatch(
        setModal({
          open: true,
          title: "Write first diary? Log in by GOOGLE!",
          noMessage: "NOT NOW",

          yesButton: (
            <Button href="/auth/google" color="primary" variant="outlined">
              Log in by Google
            </Button>
          ),
        })
      );
    } else if (isWatched) {
      props.history.push(`/diary/${movieID}`);
    } else {
      props.history.push(`/write/${movieID}`);
    }
  };

  const onClicKPageForwardHandler = (isNext) => {
    window.scrollTo({ top: 0 });
    console.log("clicked");
    dispatch(fetchMovies(term, isNext ? page + 1 : page - 1));
  };

  const renderCards = () => {
    return results.map((movie) => {
      const isWatched = userDiaries.find((diary) => diary.movieID === movie.id);

      return (
        <Card
          key={movie.id}
          className={
            isWatched ? `${classes.root} ${classes.watchedMovie}` : classes.root
          }
        >
          <CardActionArea
            onClick={() => onCardClickHandler(isWatched, movie.id)}
            disableRipple
          >
            <CardMedia
              className={classes.media}
              image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <Grid container alignItems="center">
                  {movie.original_title}
                  {isWatched ? (
                    <VisibilityIcon style={{ marginLeft: "5px" }} />
                  ) : (
                    <></>
                  )}
                </Grid>
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                {movie.overview}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {auth ? (
              <Button
                size="small"
                color="primary"
                variant="outlined"
                startIcon={<CreateIcon />}
                component={RouterLink}
                to={isWatched ? `/diary/${movie.id}` : `/write/${movie.id}`}
              >
                {isWatched ? "See Diary" : "Write"}
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
    <>
      {results ? (
        <Typography
          style={{ marginLeft: "20px" }}
        >{`${total_results} movies found.`}</Typography>
      ) : (
        <></>
      )}
      <Grid xs={12} container justify="space-around">
        {results ? renderCards() : <></>}
      </Grid>
      {results ? (
        <Grid xs={12} container justify="space-evenly" alignItems="center">
          <Button
            onClick={() => onClicKPageForwardHandler(false)}
            startIcon={<ArrowBackIosIcon />}
            variant="outlined"
            style={
              page == 1
                ? { opacity: 0, cursor: "default" }
                : { display: "active" }
            }
          >
            Back
          </Button>
          {`Pages: ${page} / ${total_pages}`}
          <Button
            onClick={() => onClicKPageForwardHandler(true)}
            startIcon={<ArrowForwardIosIcon />}
            variant="outlined"
            style={
              page == total_pages
                ? { opacity: 0, cursor: "default" }
                : { display: "active" }
            }
          >
            Next
          </Button>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}

export default withRouter(Cards);

import React from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import CreateIcon from "@material-ui/icons/Create";
import axios from "axios";
import { withRouter, Link as RouterLink } from "react-router-dom";

const diarySelector = (state) => state.diaries;

const DiaryContent = (props) => {
  const diaries = useSelector(diarySelector);
  const movieID = props.match.params.id;

  const { _id, poster_path, title, rating, description } = diaries.find(
    (diary) => {
      return diary.movieID == movieID;
    }
  );

  const deleteHandler = async () => {
    const res = await axios.delete("/api/diary", { data: { _id } });
    props.history.push("/diary");
  };

  const renderStarRate = () => {
    const intger = Math.floor(rating);
    const afterDecimal = rating - intger;

    const stars = [];
    for (let i = 0; i < intger; i++) {
      stars.push(<StarIcon color="primary" />);
    }
    if (afterDecimal) {
      stars.push(<StarHalfIcon color="primary" />);
    }

    return stars;
  };

  const renderContent = () => {
    return (
      <Grid
        container
        spacing={4}
        justify="center"
        style={{ marginTop: "10px" }}
      >
        <Grid item xs={12} sm={6} container justify="center">
          <img
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            alt="poster"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          direction="column"
          alignItems="center"
        >
          <Typography variant="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {rating}
            {renderStarRate()}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {description}
          </Typography>
          <Grid container item justify="center">
            <Grid xs={8} item container justify="space-evenly">
              <Link component={RouterLink} to={`/write/${movieID}`}>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<CreateIcon />}
                >
                  Edit
                </Button>
              </Link>

              <Button
                variant="outlined"
                onClick={deleteHandler}
                size="small"
                color="primary"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return <>{diaries ? renderContent() : <div></div>}</>;
};

export default withRouter(DiaryContent);

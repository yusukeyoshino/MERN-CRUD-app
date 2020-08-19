import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSpinner, setModal, fetchDiaries } from "../../actions";
import {
  Grid,
  Typography,
  Link,
  Card,
  CardContent,
  Divider,
  CardActions,
  makeStyles,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import CreateIcon from "@material-ui/icons/Create";
import axios from "axios";
import { withRouter, Link as RouterLink } from "react-router-dom";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Modal from "../../util/Modal";

const diarySelector = (state) => state.diaries;
const useStyles = makeStyles(() => ({
  divider: {
    margin: "20px 0",
  },
  bottomElement: {
    marginBottom: "10px",
  },
}));

const DiaryContent = (props) => {
  const dispatch = useDispatch();

  const diaries = useSelector(diarySelector);
  const movieID = props.match.params.id;
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchDiaries);
  }, []);

  const deleteHandler = async (_id) => {
    dispatch(setModal({ open: false }));
    dispatch(setSpinner(true));
    const res = await axios.delete("/api/diary", { data: { _id } });
    dispatch(setSpinner(false));
    props.history.push("/diary");
  };

  const onClickDeleteHandler = (_id) => {
    dispatch(
      setModal({
        open: true,
        title: "Are you sure to delete the diary?",
        noMessage: "Disagree",
        yesButton: (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => deleteHandler(_id)}
          >
            Agree
          </Button>
        ),
      })
    );
  };

  const renderContent = () => {
    const {
      _id,
      poster_path,
      title,
      rating,
      description,
      watchedDate,
    } = diaries.find((diary) => {
      return diary.movieID == movieID;
    });
    return (
      <Grid container justify="space-around" style={{ marginTop: "10px" }}>
        <Grid
          style={{ marginTop: "65px" }}
          item
          xs={12}
          md={5}
          container
          justify="center"
          alignItems="flex-start"
        >
          <img
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            alt="poster"
          />
        </Grid>
        <Grid item xs={11} md={5}>
          <Typography
            variant="h4"
            style={{
              marginBottom: "15px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
          <Card>
            <CardContent>
              Description
              <Typography component="h2">{description}</Typography>
              <Divider className={classes.divider} />
              Rating
              <Grid container alignItems="center" style={{ marginTop: "10px" }}>
                <Typography color="textSecondary">{rating}</Typography>
                <Rating
                  style={{ marginLeft: "10px" }}
                  name="customized-empty"
                  precision={0.5}
                  value={rating}
                  readOnly
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
              </Grid>
              <Divider className={classes.divider} />
              Watched Date
              <Typography variant="body2" component="p">
                {watchedDate.slice(0, 10)}
              </Typography>
              <Divider style={{ marginTop: "20px" }} />
            </CardContent>
            <CardActions>
              <Grid
                container
                justify="space-around"
                className={classes.bottomElement}
              >
                <Link
                  component={RouterLink}
                  to={`/write/${movieID}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    size="small"
                    color="default"
                    variant="outlined"
                    startIcon={<CreateIcon />}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  onClick={() => onClickDeleteHandler(_id)}
                  startIcon={<DeleteIcon />}
                  size="small"
                  color="primary"
                  variant="outlined"
                >
                  Delete
                </Button>
              </Grid>
            </CardActions>
          </Card>
          <Button
            onClick={() => props.history.push("/diary")}
            style={{ margin: "20px 0" }}
            variant="outlined"
            startIcon={<KeyboardBackspaceIcon />}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {diaries.length !== 0 &&
      diaries.find((diary) => movieID === diary.movieID) ? (
        renderContent()
      ) : (
        <></>
      )}
    </>
  );
};

export default withRouter(DiaryContent);

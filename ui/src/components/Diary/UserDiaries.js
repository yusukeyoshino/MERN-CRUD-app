import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Rating } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import { Link as RouterLink, withRouter } from "react-router-dom";
import * as actions from "../../actions";
import DeleteIcon from "@material-ui/icons/Delete";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import TodayIcon from "@material-ui/icons/Today";
import Modal from "../../util/Modal";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 30,
  },
  media: {
    height: 140,
  },
});

const diarySelector = (state) => state.diaries;

const UserDiaries = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const diaries = useSelector(diarySelector);
  const [isModalOpened, setIsModalOpened] = useState({ open: false, id: "" });
  const [isDiaryDeleted, setIsDiaryDeleted] = useState(false);

  useEffect(() => {
    dispatch(actions.fetchDiaries());
  }, [isDiaryDeleted]);

  const toDiaryContent = (movieID) => {
    const ID = movieID.toString();
    props.history.push(`/diary/${ID}`);
  };

  const deleteHandler = async (_id) => {
    dispatch(actions.setModal({ open: false }));
    dispatch(actions.setSpinner(true));

    const res = await axios.delete("/api/diary", { data: { _id } });

    setIsDiaryDeleted(!isDiaryDeleted);
    dispatch(actions.setSpinner(false));
  };

  const onClickDeleteHandler = (diaryID) => {
    dispatch(
      actions.setModal({
        open: true,
        title: "Are you sure to delete the diary?",
        noMessage: "Disagree",
        yesButton: (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => deleteHandler(diaryID)}
          >
            Agree
          </Button>
        ),
      })
    );
  };

  const renderCards = () => {
    return diaries.map((diary) => {
      return (
        <Card
          // onClick={() => toDiaryContent(diary.movieID)}
          key={diary._id}
          className={classes.root}
        >
          <CardMedia
            className={classes.media}
            image={`https://image.tmdb.org/t/p/w300/${diary.poster_path}`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {diary.title}
            </Typography>

            <Rating
              value={diary.rating}
              readOnly
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
            <Grid container>
              <TodayIcon style={{ marginRight: "5px" }} />
              <Typography>{diary.watchedDate.slice(0, 10)}</Typography>
            </Grid>
          </CardContent>

          <CardActions>
            <Button
              size="small"
              color="primary"
              startIcon={<CreateIcon />}
              component={RouterLink}
              to={`/diary/${diary.movieID}`}
            >
              See Diary
            </Button>
            <Button
              onClick={() => onClickDeleteHandler(diary._id)}
              startIcon={<DeleteIcon />}
              size="small"
              color="primary"
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      );
    });
  };

  return (
    <>
      <Grid container justify="space-evenly">
        {renderCards()}
      </Grid>
    </>
  );
};

export default withRouter(UserDiaries);

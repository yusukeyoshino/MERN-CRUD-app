import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import { Link, withRouter } from "react-router-dom";
import * as actions from "../../actions";

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

  useEffect(() => {
    dispatch(actions.fetchDiaries());
  }, []);

  const toDiaryContent = (movieID) => {
    const ID = movieID.toString();
    props.history.push(`/diary/${ID}`);
  };

  console.log(diaries);
  const renderCards = () => {
    return diaries.map((diary) => {
      return (
        <Card
          onClick={() => toDiaryContent(diary.movieID)}
          key={diary._id}
          className={classes.root}
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`https://image.tmdb.org/t/p/w300/${diary.poster_path}`}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {diary.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" startIcon={<CreateIcon />}>
              <Link to={`/write/${diary.id}`}>Write</Link>
            </Button>
            <Button size="small" color="primary">
              Write
            </Button>
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
};

export default withRouter(UserDiaries);

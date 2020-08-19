import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardActions,
  Typography,
  Button,
  CardContent,
  Grid,
  Divider,
  makeStyles,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import PublishIcon from "@material-ui/icons/Publish";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Rating } from "@material-ui/lab";

const formSelector = (state) => state.form;
const useStyles = makeStyles(() => ({
  divider: {
    margin: "20px 0",
  },
  bottomElement: {
    marginBottom: "10px",
  },
}));

const DiaryReview = (props) => {
  const form = useSelector(formSelector);
  const classes = useStyles();
  console.log(form);

  const renderReview = () => {
    return (
      <Card>
        <CardContent>
          Description
          <Typography component="h2">{form.description}</Typography>
          <Divider className={classes.divider} />
          Rating
          <Grid container alignItems="center" style={{ marginTop: "10px" }}>
            <Typography color="textSecondary">{form.rating}</Typography>
            <Rating
              style={{ marginLeft: "10px" }}
              name="customized-empty"
              precision={0.5}
              value={form.rating}
              readOnly
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
          </Grid>
          <Divider className={classes.divider} />
          Watched Date
          <Typography variant="body2" component="p">
            {form.watchedDate}
          </Typography>
          <Divider style={{ marginTop: "20px" }} />
        </CardContent>
        <CardActions>
          <Grid
            container
            justify="space-around"
            className={classes.bottomElement}
          >
            <Button
              size="small"
              color="default"
              variant="outlined"
              onClick={props.onBackToEdit}
              startIcon={<EditIcon />}
            >
              Back to Edit
            </Button>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              startIcon={<PublishIcon />}
              onClick={() => props.submitDiary(form)}
            >
              Submit
            </Button>
          </Grid>
        </CardActions>
      </Card>
    );
  };

  return <div>{renderReview()}</div>;
};

export default DiaryReview;

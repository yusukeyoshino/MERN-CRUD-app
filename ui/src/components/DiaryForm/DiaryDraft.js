import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import DiaryReview from "./DiaryReview";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Rating } from "@material-ui/lab";
import {
  Grid,
  TextField,
  MenuItem,
  Input,
  Button,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import * as actions from "../../actions";
import { useForm, Controller } from "react-hook-form";

const diarySelector = (state) => state.diaries;

const DiaryDraft = (props) => {
  const [show, setShow] = useState(false);
  const { register, handleSubmit, watch, errors, control } = useForm({
    shouldUnregister: false,
  });
  const watchRating = watch("rating", 2);

  const diaryContent = useSelector(diarySelector).find(
    (diary) => diary.movieID === props.movieData.movieID
  );
  const dispatch = useDispatch();

  const onReviewForm = (data) => {
    console.log(data);
    dispatch(actions.formReview(data));
    setShow(true);
  };

  const submitDiary = async (formData) => {
    dispatch(actions.setSpinner(true));
    const { poster_path, title } = props.movieData;
    let requestBody;

    if (diaryContent) {
      const { _id } = diaryContent;
      requestBody = {
        ...formData,
        _id,
      };
    } else {
      requestBody = {
        ...formData,
        movieID: props.movieData.movieID,
        poster_path,
        title,
      };
    }

    await axios.post("/api/diary", requestBody);
    dispatch(actions.setSpinner(false));
    dispatch(actions.fetchDiaries());
    props.history.push("/");
  };

  const renderForm = () => {
    const renderRatingOptions = () => {
      const ratingOptions = [];
      for (let i = 1; i < 5.5; i = i + 0.5) {
        ratingOptions.push(
          <MenuItem key={i} value={i}>
            {i}
          </MenuItem>
        );
      }
      return ratingOptions;
    };

    return (
      <>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          {props.movieData.title}
        </Typography>
        <form onSubmit={handleSubmit(onReviewForm)}>
          <TextField
            name="description"
            defaultValue={diaryContent ? diaryContent.description : ""}
            inputRef={register({ required: true })}
            multiline
            rows={8}
            variant="outlined"
            fullWidth
            label="description"
            margin="dense"
            error={errors.description ? true : false}
            helperText={errors.description ? "required" : ""}
          />

          {/* <TextField
          name="a"
          select
          inputRef={register}
          variant="outlined"
          margin="dense"
          label="Rating"
          defaultValue={3}
          fullWidth
        > */}
          <Grid container alignItems="center">
            <FormControl margin="normal">
              <InputLabel>Rating</InputLabel>
              <Controller
                name="rating"
                as={<Select>{renderRatingOptions()}</Select>}
                control={control}
                rules={{ required: true }}
                defaultValue={2}
                variant="outlined"
              />
            </FormControl>
            <Rating
              style={{ marginLeft: "20px" }}
              name="customized-empty"
              defaultValue={2}
              precision={0.5}
              value={watchRating}
              readOnly
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
          </Grid>

          {/* </TextField> */}
          <Grid>
            <TextField
              name="watchedDate"
              inputRef={register({ required: true })}
              margin="normal"
              label="Watched Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={
                diaryContent ? diaryContent.watchedDate.slice(0, 10) : ""
              }
              margin="normal"
              fullWidth
              variant="outlined"
              error={errors.watchedDate ? true : false}
              helperText={errors.watchedDate ? "required" : ""}
            />
          </Grid>
          <Grid container justify="space-around">
            <Button
              onClick={() => props.history.push("/")}
              variant="outlined"
              startIcon={<KeyboardBackspaceIcon />}
            >
              Back
            </Button>
            <input type="submit" id="review" style={{ display: "none" }} />
            <label htmlFor="review">
              <Button variant="contained" color="secondary" component="span">
                Review
              </Button>
            </label>
          </Grid>
        </form>
      </>
    );
  };

  return (
    <>
      {show ? (
        <DiaryReview
          submitDiary={submitDiary}
          onBackToEdit={() => setShow(false)}
        />
      ) : (
        renderForm()
      )}
    </>
  );
};

export default withRouter(DiaryDraft);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const diarySchema = new Schema({
  movieID: Number,
  description: String,
  rating: Number,
  watchedDate: Date,
  poster_path: String,
  title: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("diary", diarySchema);

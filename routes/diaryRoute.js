const mongoose = require("mongoose");

const Diary = mongoose.model("diary");

module.exports = (app) => {
  app.get("/api/diary", async (req, res) => {
    const diaries = await Diary.find({ _user: req.user.id });
    res.send(diaries);

    // bad example fetching all data
    // const surveys = await Survey.find({ user: req.user.id });
    // res.send(surveys)
  });

  app.delete("/api/diary", async (req, res) => {
    console.log(req.body._id);

    const diary = await Diary.findByIdAndDelete(req.body._id);
    if (!diary) {
      res.status(404).send("No diary found");
    } else {
      res.status(200).send();
    }
  });

  app.post("/api/diary", async (req, res) => {
    const {
      description,
      rating,
      watchedDate,
      movieID,
      poster_path,
      title,
      _id,
    } = req.body;

    if (!_id) {
      const diary = new Diary({
        movieID,
        description,
        rating,
        watchedDate,
        title,
        poster_path,
        _user: req.user.id,
      });
      await diary.save();
      res.redirect("/");
      return;
    }
    Diary.findByIdAndUpdate(
      { _id },
      { description, rating, watchedDate },
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/");
        }
      }
    );
  });
};

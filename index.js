const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
require("./models/User");
require("./models/Diary");
require("./servicies/passport");
mongoose.connect(keys.mongoURI);

const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(bodyParser.json());
// these following 2 lines are for cookie set up.
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoute")(app);
require("./routes/diaryRoute")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("ui/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "ui", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

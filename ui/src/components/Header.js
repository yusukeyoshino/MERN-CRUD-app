import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Link, Grid } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
// import MenuIcon from "@material-ui/icons/Menu";

const authSelector = (state) => state.auth;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const auth = useSelector(authSelector);
  const classes = useStyles();

  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <Button
            startIcon={<AssignmentIndIcon />}
            href="/auth/google"
            variant="outlined"
          >
            Log in with Google
          </Button>
        );
      default:
        return (
          <>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CreateIcon />}
              component={RouterLink}
              to="/diary"
            >
              Diary
            </Button>

            <Button href="/api/logout" variant="outlined">
              Logout
            </Button>
          </>
        );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between">
            <Link
              style={{ textDecoration: "none" }}
              component={RouterLink}
              color="textSecondary"
              to="/"
            >
              <Button>Movie-diary</Button>
            </Link>
            <Grid item>{renderContent()}</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

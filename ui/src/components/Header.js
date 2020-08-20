import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Link,
  Grid,
  Hidden,
  IconButton,
  Button,
  Toolbar,
} from "@material-ui/core";

import CreateIcon from "@material-ui/icons/Create";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import FavoriteIcon from "@material-ui/icons/Favorite";

const authSelector = (state) => state.auth;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
            color="secondary"
            variant="contained"
          >
            Log in with Google
          </Button>
        );
      default:
        return (
          <>
            <Hidden xsDown>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CreateIcon />}
                component={RouterLink}
                to="/diary"
                className={classes.menuButton}
              >
                Diary
              </Button>
            </Hidden>
            <Hidden smUp>
              <IconButton component={RouterLink} to="/diary" color="secondary">
                <FavoriteIcon />
              </IconButton>
            </Hidden>

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
          <Grid container justify="space-between" alignItems="center">
            <Link
              style={{ textDecoration: "none" }}
              component={RouterLink}
              color="textSecondary"
              to="/"
            >
              <Button
                style={{
                  fontFamily: "Coiny, cursive",
                  fontSize: "25px",
                  color: "white",
                }}
              >
                diary
              </Button>
            </Link>
            <Grid item>{renderContent()}</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

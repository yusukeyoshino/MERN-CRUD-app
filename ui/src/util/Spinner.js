import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import zIndex from "@material-ui/core/styles/zIndex";

export default function SimpleBackdrop(props) {
  return (
    <div>
      <Backdrop style={{ zIndex: "10" }} open={props.open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

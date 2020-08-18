import React from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../actions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  const dispatch = useDispatch();

  const onCloseModalHandler = () => {
    dispatch(setModal({ open: false }));
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
    Open alert dialog
    </Button> */}
      <Dialog
        open={props.open}
        onClose={onCloseModalHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>

        <DialogActions>
          <Button onClick={onCloseModalHandler}>{props.noMessage}</Button>
          {props.yesButton}
        </DialogActions>
      </Dialog>
    </div>
  );
}

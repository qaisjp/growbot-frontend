import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core";

function Dialogue(props) {
  const { open, close, title, contentText, content, actions } = props;
  return (
    <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        {content}
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}

export default withStyles({})(Dialogue);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import styles from "../../assets/components/Dialogue/jss/full-screen-dialogue-style";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function FullScreenDialogue(props) {
  const { classes, open, close, title, content } = props;
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={close} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              <DialogTitle>{title}</DialogTitle>
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    </div>
  );
}

FullScreenDialogue.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenDialogue);

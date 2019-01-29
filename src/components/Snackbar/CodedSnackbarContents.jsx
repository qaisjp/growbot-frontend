import React, { Component } from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import styles from '../../assets/components/Snackbar/jss/coded-snackbar-contents-style';
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

let variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

class CodedSnackbarContents extends Component {


    render() {
        const { classes, className, message, onClose, variant, ...other } = this.props;
        const Icon = variantIcon[variant];

        return (
            <SnackbarContent
                className={classNames(classes[variant], className)}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
                        {message}
        </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={onClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
                {...other}
            />
        );
    }
}

export default withStyles(styles)(CodedSnackbarContents);
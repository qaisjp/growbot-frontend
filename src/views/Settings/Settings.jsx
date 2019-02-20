import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styles from '../../assets/views/Settings/jss/settings-style'
import banner from '../../assets/views/Settings/img/forgot-password-banner.jpg'

class Settings extends Component {

    render() {
        let {classes} = this.props;
        return (
            <main className={classes.main}>
                <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            alt="Forgotten Password"
                            className={classes.media}
                            height="140"
                            image={banner}
                            title="Forgotten Password"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Change Password
                            </Typography>
                            <Typography component="p">
                                Reset your password by filling in the form.
                            </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="currentPassword">Current Password</InputLabel>
                                <Input name="currentPassword" type="password" id="currentPassword" />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="newPassword">New Password</InputLabel>
                                <Input name="newPassword" type="password" id="newPassword" />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="confirmNewPassword">Confirm New Password</InputLabel>
                                <Input name="confirmNewPassword" type="password" id="confirmNewPassword" />
                            </FormControl>

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={()=>{}}
                            >
                                Submit
                            </Button>
                        </form>
                        </CardContent>
                </Card></main>
        );
    }

}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
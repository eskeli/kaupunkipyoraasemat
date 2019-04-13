import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    toolbarTitle: {
        flex: 1,
    },
});

function MyAppBar(props) {
    const { classes } = props;
    return (
        <>
        <CssBaseline />
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit" className={classes.toolbarTitle}>
                    Kaupunkipyöräasemat
              </Typography>
                <Button variant="contained" color="secondary" className={classes.button} component={Link} to="/">
                    Etusivu
              </Button>
                <Button variant="contained" color="secondary" className={classes.button} component={Link} to="/muuta">
                    Muuta
              </Button>
            </Toolbar>
        </AppBar>
        </>
    );
}

MyAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyAppBar);
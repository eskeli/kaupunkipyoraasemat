import React, { Component } from "react";
import { BrowserRouter as Route, Router, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { DateTimePicker } from "material-ui-pickers";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import stations from "./stations.js";

const styles = theme => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 1,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3
        }
    }
});

class RealTimeInfo extends Component {
    state = {
        isLoading: false,
        stationData: {},
        updateTime: null
    };
    componentWillReceiveProps() {
        this.fetchData();
    };
    componentDidMount() {
        this.fetchData();
    };
    fetchData() {
         if (this.props.selectedStation) {
            this.setState({
                isLoading: true,
            });
            var schema = `
    {
        bikeRentalStation(id:"${this.props.selectedStation}") {
          stationId
          name
          bikesAvailable
          spacesAvailable
          lat
          lon
        }
      }
    `;
            fetch(
                `https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: schema }),
                }
            )
                .then(res => res.json())
                .then(
                    result => {
                        this.setState({
                            isLoading: false,
                            stationData: result.data.bikeRentalStation,
                            updateTime: moment()
                        });

                    },
                    error => {
                        this.setState({
                            isLoading: false,
                            error
                        });
                    }
                );
        }
    };

    render() {
        const { stationData, updateTime } = this.state;
        const { classes } = this.props;

        // Render empty if the data has not been updated
        if (!updateTime) {
            return (
                <>
                </>
            )
        }

        return (
            <>
                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <Typography variant="subtitle2" gutterBottom>Tiedot päivitetty</Typography>
                        <Typography variant="body2">{updateTime.format('H.mm')}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle2" gutterBottom>Pyöriä vapaana</Typography>
                        <Typography variant="body2">{stationData.bikesAvailable}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle2" gutterBottom>Paikkoja vapaana</Typography>
                        <Typography variant="body2">{stationData.spacesAvailable}</Typography>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(RealTimeInfo);

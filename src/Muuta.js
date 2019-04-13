import React, { Component } from "react";
import { BrowserRouter as Route, Router, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { DateTimePicker } from "material-ui-pickers";
import Paper from "@material-ui/core/Paper";
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

class App extends Component {
  state = {
    selectedStation: "",
    timeFrom: moment("2019-04-06T20:00"),
    timeTo: moment(),
    isLoading: false,
    stations: [],
    latitude: 60.192059,
    longitude: 24.945831,
    meters: 300,
    hour: "2019-04-13T07"
  };
  handleChange = () => {
    this.setState({
      isLoading: true
    });
    fetch(
      `https://exnd0cvym5.execute-api.eu-north-1.amazonaws.com/test/getbikestationhistorywithinradius/${
      this.state.latitude}/${this.state.longitude}/${this.state.meters}?hour=${this.state.hour}`,
      {
        headers: {
          "x-api-key": "9vpFpkbbx67kd1Xtswfw7a5W3D7oNP5g485MJYTM"
        }
      }
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoading: false,
            stations: result.body
          });
        },
        error => {
          this.setState({
            isLoading: false,
            error
          });
        }
      );
  };

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleDateChangeFrom = timeFrom => {
    this.setState({
      timeFrom: timeFrom,
      hour: timeFrom.toISOString().substring(0, 12) // "2019-04-13T07"
    });
    if (this.state.selectedStation)
      this.handleChange(this.state.selectedStation);
  };

  render() {
    const { selectedStation, stations, timeFrom, timeTo } = this.state;
    const { classes } = this.props;

    return (
      <>
        <main className={classes.layout}>
          <div className="picker">
            <DateTimePicker
              value={timeFrom}
              onChange={value => this.handleDateChangeFrom(value)}
              label="With Today Button"
              showTodayButton
            />
            <TextField
              id="latitude"
              label="Latitude"
              className={classes.textField}
              value={this.state.latitude}
              onChange={this.handleInputChange('latitude')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="longitude"
              label="Longitude"
              className={classes.textField}
              value={this.state.longitude}
              onChange={this.handleInputChange('longitude')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="radius"
              label="Radius"
              className={classes.textField}
              value={this.state.meters}
              onChange={this.handleInputChange('meters')}
              margin="normal"
              variant="outlined"
            />
            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleChange}>
              Päivitä
              </Button>
          </div>
          <Paper className={classes.paper} elevation={1}>
            {Object.keys(stations).map((item, index) => (
              <>
                <Typography variant="h4" gutterBottom>
                  {stations[item].name}
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell component="th">Päivä</TableCell>
                      <TableCell>Kello</TableCell>
                      <TableCell align="right">Pyöriä vapaana</TableCell>
                      <TableCell align="right">Paikkoja vapaana</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stations[item].history.map((historyItem, i) => (
                      <TableRow key={index}>
                        <TableCell>
                          {moment(historyItem.timestamp).format("D.M.")}
                        </TableCell>
                        <TableCell>
                          {moment(historyItem.timestamp).format("H.mm")}
                        </TableCell>
                        <TableCell align="right"> {historyItem.bikesAvailable}</TableCell>
                        <TableCell align="right"> {historyItem.spacesAvailable}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

              </>
            ))}
          </Paper>
        </main>
      </>
    );
  }
}

export default withStyles(styles)(App);

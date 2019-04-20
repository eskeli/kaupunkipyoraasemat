import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Divider from '@material-ui/core/Divider';
import Select from "react-select";
import moment from "moment";
import stations from "./stations.js";
import RealTimeInfo from "./RealTimeInfo.js";
import DateTimeRangePicker from "./DateTimeRangePicker";

const styles = theme => ({
  /*root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4
  },*/
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
  },
  divider: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  }
});

class App extends Component {
  state = {
    selectedStation: "",
    timeFrom: moment().subtract(1, 'hours'),
    timeTo: moment(),
    isLoading: false,
    stationItems: []
  };
  handleChange = selectedStation => {
    this.setState({
      selectedStation,
      isLoading: true
    });
    fetch(
      `https://exnd0cvym5.execute-api.eu-north-1.amazonaws.com/test/getbikestationhistory/${
        selectedStation.value
      }?timeFrom=${this.state.timeFrom.toISOString()}&timeTo=${this.state.timeTo.toISOString()}`,
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
            stationItems: result.body
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

  handleDateChange = dateTime => {
    this.setState({
      timeFrom: dateTime.start,
      timeTo: dateTime.end
    });
  };

  render() {
    const { selectedStation, stationItems } = this.state;
    const { classes } = this.props;

    return (
      <>
        <main className={classes.layout}>
          <div className="picker">
          <DateTimeRangePicker handleChange={this.handleDateChange} />
          </div>
          <Select
            value={selectedStation}
            onChange={this.handleChange}
            options={stations}
          />
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="h4" gutterBottom>
              {stationItems &&
                stationItems.length !== 0 &&
                stationItems[0].name}
            </Typography>
            <RealTimeInfo selectedStation={selectedStation.value} />
            <Divider variant="middle" className={classes.divider} />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Päivä</TableCell>
                  <TableCell>Kello</TableCell>
                  <TableCell align="right">Pyöriä vapaana</TableCell>
                  <TableCell align="right">Paikkoja vapaana</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stationItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {moment(item.timestamp).format("D.M.")}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {moment(item.timestamp).format("H.mm")}
                    </TableCell>
                    <TableCell align="right">{item.bikesAvailable}</TableCell>
                    <TableCell align="right">{item.spacesAvailable}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </main>
      </>
    );
  }
}

export default withStyles(styles)(App);

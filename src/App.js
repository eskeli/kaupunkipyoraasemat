import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DateAndTimePicker, TimeNow } from './DateAndTimePicker.js';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';
import Moment from 'moment';
import stations from './stations.js';

const styles = theme => ({
  /*root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4
  },*/
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 1,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
},
});

class App extends Component {
  state = {
    selectedStation: '',
    timeFrom: "2019-04-06T10:30",
    timeTo: TimeNow(),
    isLoading: false,
    stationItems: [],
  }
  handleChange = (selectedStation) => {
    this.setState({
      selectedStation,
      isLoading: true
    });
    fetch(`https://exnd0cvym5.execute-api.eu-north-1.amazonaws.com/test/getbikestationhistory/${selectedStation.value}?timeFrom=${document.getElementById("timeFrom").value}&timeTo=${document.getElementById("timeTo").value}`,
      {
        headers: {
          "x-api-key": "9vpFpkbbx67kd1Xtswfw7a5W3D7oNP5g485MJYTM",
        },
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoading: false,
            stationItems: result.body
          });
        },
        (error) => {
          this.setState({
            isLoading: false,
            error
          });
        }
      )
  }

  handleDateChange = (event) => {
    this.setState( {[event.target.id]: event.target.value });
    if (this.state.selectedStation) this.handleChange(this.state.selectedStation);
  }

  render() {
    const { selectedStation, stationItems } = this.state;
    const { classes } = this.props;

    return (
      <>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Kaupunkipyöräasemat
                </Typography>
            </Toolbar>
          </AppBar>
        </div>
        
        <main className={classes.layout}>
        <div className="flex-container">
          <DateAndTimePicker id="timeFrom" label="Alkaen" onChangeHandler={this.handleDateChange} defaultDate={this.state.timeFrom} />
          <DateAndTimePicker id="timeTo" label="Loppuen" onChangeHandler={this.handleDateChange} defaultDate={this.state.timeTo} />
        </div>
          <Select
            value={selectedStation}
            onChange={this.handleChange}
            options={stations}
          />
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="h4" gutterBottom>
              {stationItems && stationItems.length !== 0 && stationItems[0].name}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Päivä</TableCell>
                  <TableCell>Kello</TableCell>
                  <TableCell align="right">Pyöriä vapaana</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stationItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">{Moment(item.timestamp).format('D.M.')}</TableCell>
                    <TableCell component="th" scope="row">{Moment(item.timestamp).format('H.mm')}</TableCell>
                    <TableCell align="right">{item.bikesAvailable}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </main>
        {/*{stationItems.map(item => (
          <DataRow datetime={item.timestamp} availableCount={item.bikesAvailable} />
        ))}*/}
        {/*<Button variant="contained" color="primary">
          Hello World
      </Button>*/}
      </>
    );
  }
}

export default withStyles(styles)(App);

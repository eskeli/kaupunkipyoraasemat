import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { DateTimePicker } from "@material-ui/pickers";
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import MapIcon from '@material-ui/icons/Map';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import RefreshIcon from '@material-ui/icons/Refresh';
import AsyncSelect from 'react-select/lib/Async';
import moment from "moment";
import RealTimeInfo from "./RealTimeInfo.js";
import MapExpandCard from "./MapExpandCard.js";
import debounce from "debounce-promise";


const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(6) * 2)]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  locationButton: {
    minHeight: 48,
    maxHeight: 48,
    maxWidth: 48,
    minWidth: 48,
  },
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
  },
});

class Muuta extends Component {
  state = {
    selectedStation: "",
    timeFrom: moment(),
    isLoading: false,
    stations: [],
    latitude: 60.23065006057714,
    longitude: 24.948921203613285,
    meters: localStorage.getItem('radius') || '400',
    hour: "2019-04-13T07",
    settings: [],
  };

  constructor(props) {
    super(props);

    const loadOptions = inputValue => this.promiseOptions(inputValue);
    this.debouncedPromiseOptions = debounce(loadOptions, 1000, {
      leading: false
    });
  }

  handleChange = () => {
    this.setState({
      isLoading: true
    });
    var time = '';
    if (this.state.settings.includes('time')) {
      time = this.state.timeFrom.toISOString();
    } else {
      time = moment().toISOString();
    }

    fetch(
      `https://exnd0cvym5.execute-api.eu-north-1.amazonaws.com/test/getbikestationhistorywithinradius/${
      this.state.latitude}/${this.state.longitude}/${this.state.meters}?time=${time}`,
      {
        headers: {
          "x-api-key": "9vpFpkbbx67kd1Xtswfw7a5W3D7oNP5g485MJYTM"
        }
      }
    )
      .then(res => res.json())
      .then(
        result => {
          // Save radius
          localStorage.setItem('radius', this.state.meters);
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

  positionButtonClicked = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          latitude: latitude,
          longitude: longitude
        });
      },
      () => {

      }
    );
  };

  handleSettings = (event, newSettings) => {
    this.setState({
      settings: newSettings
    });
  };

  handleAddressChange = location => {
    console.log(location);
    this.setState({
      latitude: location.value[0],
      longitude: location.value[1]
    });
  };

  onMapClick = event => {
    this.setState({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng
    });
  }

  promiseOptions = inputValue => {
      return fetch(
        `https://api.digitransit.fi/geocoding/v1/autocomplete?text=${inputValue}`
      )
        .then(res => res.json())
        .then(
          result => {
            return result.features.map(feature => {
              return {
                value: [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
                label: feature.properties.label,
              }
            });
          },
          error => {
            this.setState({
              error
            });
          }
        );
    };

  render() {
    const { stations, timeFrom, settings } = this.state;
    const { classes } = this.props;

    return (
      <>
        <main className={classes.layout}>
          <div className={classes.toggleContainer}>
            <Grid container spacing={0} justify="space-between">
              <ToggleButtonGroup value={settings} onChange={this.handleSettings}>
                <ToggleButton value="time">
                  <AccessTimeIcon />
                </ToggleButton>
                <ToggleButton value="position">
                  <TrackChangesIcon />
                </ToggleButton>
                <ToggleButton value="address">
                  <EditLocationIcon />
                </ToggleButton>
                <ToggleButton value="map">
                  <MapIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              <Button variant="outlined" color="primary" className={classes.locationButton} onClick={this.positionButtonClicked}>
                <MyLocationIcon />
              </Button>

            </Grid>
          </div>
          <Grid container spacing={1} alignItems="flex-end" justify="space-between">
            <Grid item xs>
              <TextField
                id="radius"
                className={classes.textField}
                value={this.state.meters}
                onChange={this.handleInputChange('meters')}
                margin="normal"
                InputProps={{
                  endAdornment: <InputAdornment position="end">m</InputAdornment>,
                  startAdornment: <InputAdornment position="start">Etäisyys</InputAdornment>
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" className={classes.locationButton} onClick={this.handleChange}>
                <RefreshIcon />
              </Button>
            </Grid>
          </Grid>

          <Card className={classes.card}>
            <Grid container spacing={0} justify="space-between" alignContent="center">
              <Grid item xs={4}></Grid>


            </Grid>
            <div className="picker" style={{ display: this.state.settings.includes('time') ? 'block' : 'none' }}>
              <DateTimePicker
                value={timeFrom}
                onChange={value => this.handleDateChangeFrom(value)}
                showTodayButton
                InputProps={{
                  startAdornment: <InputAdornment position="start"><AccessTimeIcon /></InputAdornment>
                }}
              />
            </div>
            <Box mt={2} style={{ display: this.state.settings.includes('address') ? 'block' : 'none' }}>
              <AsyncSelect cacheOptions defaultOptions loadOptions={this.debouncedPromiseOptions} onChange={this.handleAddressChange} />
            </Box>
            <Grid container spacing={1} alignItems="center" justify="space-around">
              <Grid item xs>
                <TextField
                  id="latitude"
                  className={classes.textField}
                  value={this.state.latitude}
                  onChange={this.handleInputChange('latitude')}
                  margin="normal"
                  disabled={!this.state.settings.includes('position')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">&deg;</InputAdornment>,
                    startAdornment: <InputAdornment position="start">Lat</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="longitude"
                  className={classes.textField}
                  value={this.state.longitude}
                  onChange={this.handleInputChange('longitude')}
                  margin="normal"
                  disabled={!this.state.settings.includes('position')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">&deg;</InputAdornment>,
                    startAdornment: <InputAdornment position="start">Lon</InputAdornment>
                  }}
                />
              </Grid>
            </Grid>
            <MapExpandCard onMapClick={this.onMapClick} latitude={this.state.latitude} longitude={this.state.longitude} />
          </Card>
          {stations.map((item, index) => (
            <div key={item.stationId}>
              <Paper className={classes.paper} elevation={1}>
                <Typography variant="h4" gutterBottom>
                  {item.name} ({item.stationId})
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Etäisyys {item.distance} m
                </Typography>
                <RealTimeInfo selectedStation={item.stationId} />
                <Divider variant="middle" className={classes.divider} />
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
                    {item.history.map((historyItem, i) => (
                      <TableRow key={item.stationId + '' + i}>
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
              </Paper>
            </div>
          ))}

        </main>
      </>
    );
  }
}

export default withStyles(styles)(Muuta);

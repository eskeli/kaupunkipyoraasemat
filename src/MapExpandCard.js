import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import MapIcon from '@material-ui/icons/Map';
import { Map, Marker, Popup, TileLayer, withLeaflet } from 'react-leaflet';
import VectorGridDefault from 'react-leaflet-vectorgrid';
import Icon from './Icon.js'
import StationHistory from './StationHistory.js';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(360deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  map: {
    height: 300,
  }
}));


function MapExpandCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const [selectedStation, setSelectedStation] = useState({});
  const onMapClick = props.onMapClick;
  const position = [props.latitude, props.longitude]
  const VectorGrid = withLeaflet(VectorGridDefault);

  const handleStationClick = (layer) => {
    setSelectedStation(
      { value: layer.properties.id, 
        label: layer.properties.id + " " + layer.properties.name 
      });
  }

  const options = {
    type: 'protobuf',
    url: 'https://cdn.digitransit.fi/map/v1/hsl-citybike-map/{z}/{x}/{y}.pbf',
    vectorTileLayerStyles: {
      stations: {
          icon: Icon('city-bike-station')
      }
    },
    popup: (layer) => `<p>${layer.properties.name}</p>`,
    onClick: (event) => handleStationClick(event.layer),
    subdomains: {}
  };

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <>
      <CardActions disableSpacing>
        <Button
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Näytä kartta"
        >
          <MapIcon /> {expanded ? "Sulje kartta" : "Näytä kartta" }
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Map 
          center={position} 
          zoom={15} 
          maxZoom={18} 
          className={classes.map}
          onClick={onMapClick}
          >
            <TileLayer
              url="https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              tileSize={512}
              zoomOffset={-1}
            />
            <VectorGrid {...options} />
            <Marker position={position}>
              <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>
          </Map>
          <StationHistory selectedStation={selectedStation}/>
        </CardContent>
      </Collapse>
    </>
  );
}

export default MapExpandCard;
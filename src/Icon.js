import L from 'leaflet';

function Icon(iconName) {
    return new L.Icon({
        iconUrl: require(`./assets/icons/${iconName}.svg`),
        iconRetinaUrl: require(`./assets/icons/${iconName}.svg`),
        iconAnchor: [10, 10],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(75, 75),
        className: 'leaflet-div-icon'
    });
}

export default Icon;
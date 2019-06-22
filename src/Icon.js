import L from 'leaflet';

function Icon(iconName) {
    return new L.Icon({
        iconUrl: require(`./assets/icons/${iconName}.svg`),
        iconRetinaUrl: require(`./assets/icons/${iconName}.svg`),
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(70, 70),
        className: 'leaflet-div-icon'
    });
}

export default Icon;
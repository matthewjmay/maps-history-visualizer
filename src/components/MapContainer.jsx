import React from "react";
import Leaflet from "leaflet";
import { Map, TileLayer, Polyline, FeatureGroup } from "react-leaflet";

// Map bounds
// Allow scroll over the international date line,
// so users can comfortably zoom into locations near the date line.
const corner1 = Leaflet.latLng(-90, -200);
const corner2 = Leaflet.latLng(90, 200);
const bounds = Leaflet.latLngBounds(corner1, corner2);

export default class MapContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.groupRef = React.createRef();
  }

  shouldFitNewBounds = (prevPolylines) => {
    const prevLatLngsById = prevPolylines.reduce(
      (map, poly) => ({ ...map, [poly.id]: poly.latLngs }),
      {}
    );
    return this.props.polylines.some(
      ({ id, latLngs }) =>
        !prevLatLngsById[id] || prevLatLngsById[id] !== latLngs
    );
  };

  componentDidUpdate() {
    if (this.props.polylines.some(({ isFirstShow }) => isFirstShow)) {
      const map = this.mapRef.current.leafletElement;
      const group = this.groupRef.current.leafletElement;
      map.fitBounds(group.getBounds());
    }
  }

  render() {
    return (
      <Map
        center={[0, 0]}
        zoom={2}
        style={{ width: "100%", height: "100%" }}
        maxBoundsViscosity={0.5}
        maxBounds={bounds}
        ref={this.mapRef}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          minZoom={2}
          maxZoom={18}
        />
        <FeatureGroup ref={this.groupRef}>
          {this.props.polylines.map(({ latLngs, color, id }) => (
            <Polyline key={id} color={color} positions={latLngs} />
          ))}
        </FeatureGroup>
      </Map>
    );
  }
}

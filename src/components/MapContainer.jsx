import React, { Component } from "react";
import { Map, TileLayer, Polyline } from "react-leaflet";

const DEFAULT_VIEWPORT = {
  center: [0, 0],
  zoom: 2,
};

export default class MapContainer extends Component {
  state = {
    viewport: DEFAULT_VIEWPORT,
  };

  onClickReset = () => {
    this.setState({ viewport: DEFAULT_VIEWPORT });
  };

  onViewportChanged = (viewport) => {
    this.setState({ viewport });
  };

  render() {
    return (
      <Map
        center={[0, 0]}
        zoom={2}
        viewport={this.state.viewport}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.props.polylines.map(({ latLngs, color, id }) => (
          <Polyline key={id} color={color} positions={latLngs} />
        ))}
      </Map>
    );
  }
}

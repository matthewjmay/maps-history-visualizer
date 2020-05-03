import React, { Component } from "react";

import {
  chunkFileBlocking,
  getLatLng,
  isValidLocation,
  colorGenerator,
  fetchLatLngs,
} from "../utils.js";

import MapContainer from "./MapContainer";
import Controls from "./Controls";

const getNextColor = colorGenerator();

class App extends Component {
  state = {
    historyIds: [],
    latLngs: {},
    historySettings: {},
    nextId: 0,
  };

  handleStartUploadNewHistory = async (file) => {
    console.log(`Uploading new file: ${file.name}`);
    const newHistoryId = this.state.nextId;

    // update UI to show we started upload
    this.setState({
      ...this.state,
      historySettings: {
        ...this.state.historySettings,
        [newHistoryId]: {
          loadingProgress: 0,
          color: getNextColor.next().value,
          label: file.name,
          isShownOnMap: true,
        },
      },
      historyIds: [...this.state.historyIds, newHistoryId],
      nextId: newHistoryId + 1,
    });

    const latLngs = await fetchLatLngs(file, (progress) => {
      this.handleFileUploadProgress(progress, newHistoryId);
    });
    this.handleDoneUploadNewHistory(latLngs, newHistoryId);
  };

  handleFileUploadProgress = (progress, id) => {
    console.log(`Made progress of ${(100 * progress).toFixed(2)}% on ${id}`);
  };

  handleHistoryLabelChanged = (label, id) => {
    console.log(`Changing id ${id} to label ${label}`);
  };

  handleHistoryShownOnMapChanged = (isShown, id) => {
    console.log(`Changing id ${id} to ${isShown ? "visible" : "hidden"}`);
  };

  handleHistoryColorChanged = (isShown, id) => {
    console.log(`Changing id ${id} to ${isShown ? "visible" : "hidden"}`);
  };

  handleDoneUploadNewHistory = (latLngs, historyId) => {
    this.setState({
      ...this.state,
      historySettings: {
        ...this.state.historySettings,
        [historyId]: {
          ...this.state.historySettings[historyId],
          loadingProgress: 100,
        },
      },
      latLngs: {
        ...this.state.latLngs,
        [historyId]: latLngs,
      },
    });
  };

  render() {
    const { historyIds, latLngs, historySettings } = this.state;
    return (
      <>
        <MapContainer
          polylines={historyIds
            .filter((id) => latLngs[id])
            .map((id) => ({
              id,
              latLngs: latLngs[id],
              color: historySettings[id].color,
            }))}
        />
        <Controls
          historyControls={historyIds.map((id) => ({
            id,
            ...historySettings[id],
          }))}
          onAddNewHistory={this.handleStartUploadNewHistory}
          onHistoryLabelChanged={this.handleHistoryLabelChanged}
          onHistoryShownOnMapChanged={this.handleHistoryShownOnMapChanged}
          onHistoryColorChanged={this.handleHistoryColorChanged}
        />
      </>
    );
  }
}

export default App;

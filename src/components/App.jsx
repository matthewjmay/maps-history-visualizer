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

    // update UI to show we started upload
    this.setState((prevState, props) => {
      const newHistoryId = prevState.nextId;
      fetchLatLngs(file, (progress) => {
        this.handleFileUploadProgress(progress, newHistoryId);
      }).then((latLngs) => {
        this.handleDoneUploadNewHistory(latLngs, newHistoryId);
      });

      return {
        historySettings: {
          ...prevState.historySettings,
          [newHistoryId]: {
            loadingProgress: 0,
            color: getNextColor.next().value,
            label: file.name,
            isShownOnMap: true,
          },
        },
        historyIds: [...prevState.historyIds, newHistoryId],
        nextId: newHistoryId + 1,
      };
    });
  };

  handleFileUploadProgress = (loadingProgress, historyId) => {
    console.log(
      `Made progress of ${(100 * loadingProgress).toFixed(2)}% on ${historyId}`
    );
    this.setState((prevState, props) => ({
      historySettings: {
        ...prevState.historySettings,
        [historyId]: {
          ...prevState.historySettings[historyId],
          loadingProgress,
        },
      },
    }));
  };

  handleHistoryLabelChanged = (label, historyId) => {
    console.log(`Changing id ${historyId} to label ${label}`);
    this.setState((prevState, props) => ({
      historySettings: {
        ...prevState.historySettings,
        [historyId]: {
          ...prevState.historySettings[historyId],
          label,
        },
      },
    }));
  };

  handleToggleHistoryShownOnMap = (historyId) => {
    this.setState((prevState, props) => {
      console.log(
        `Changing id ${historyId} to ${
          !prevState.historySettings[historyId].isShownOnMap
            ? "visible"
            : "hidden"
        }`
      );

      return {
        historySettings: {
          ...prevState.historySettings,
          [historyId]: {
            ...prevState.historySettings[historyId],
            isShownOnMap: !prevState.historySettings[historyId].isShownOnMap,
          },
        },
      };
    });
  };

  handleHistoryColorChanged = (color, historyId) => {
    console.log(`Changing id ${historyId} to color ${color}`);
    this.setState((prevState, props) => ({
      historySettings: {
        ...prevState.historySettings,
        [historyId]: {
          ...prevState.historySettings[historyId],
          color,
        },
      },
    }));
  };

  handleDoneUploadNewHistory = (latLngs, historyId) => {
    this.setState((prevState, props) => ({
      historySettings: {
        ...prevState.historySettings,
        [historyId]: {
          ...prevState.historySettings[historyId],
          loadingProgress: 1,
        },
      },
      latLngs: {
        ...prevState.latLngs,
        [historyId]: latLngs,
      },
    }));
  };

  render() {
    const { historyIds, latLngs, historySettings } = this.state;
    return (
      <>
        <MapContainer
          polylines={historyIds
            .filter(
              (id) =>
                historySettings[id] &&
                historySettings[id].isShownOnMap &&
                latLngs[id]
            )
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
          onHistoryToggleShownOnMap={this.handleToggleHistoryShownOnMap}
          onHistoryColorChanged={this.handleHistoryColorChanged}
        />
      </>
    );
  }
}

export default App;

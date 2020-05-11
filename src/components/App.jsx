import React from "react";

import { openDB, deleteDB, wrap, unwrap } from "idb";

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

class App extends React.Component {
  state = {
    historyIds: [],
    latLngs: {},
    historySettings: {},
    nextId: 0,
    doneLoading: false,
  };

  db = null;

  async componentDidMount() {
    if (!("indexedDB" in window)) {
      console.log(
        "Browser does not support IndexedDB, no caching will be done"
      );
      return;
    }
    this.db = openDB("maps-history-visualizer", 3, {
      upgrade: (db) => {
        if (!db.objectStoreNames.contains("historyIds")) {
          db.createObjectStore("historyIds");
        }
        if (!db.objectStoreNames.contains("historySettings")) {
          db.createObjectStore("historySettings");
        }
        if (!db.objectStoreNames.contains("latLngs")) {
          db.createObjectStore("latLngs");
        }
      },
    });
    const db = await this.db;
    const tx = db.transaction(
      ["historyIds", "historySettings", "latLngs"],
      "readonly"
    );

    const idStore = tx.objectStore("historyIds");
    const ids = await idStore.getAll();
    if (ids.length === 0) return;
    this.setState({ nextId: Math.max(...ids) + 1 });

    const settingsStore = tx.objectStore("historySettings");
    const latLngsStore = tx.objectStore("latLngs");
    // start concurrent fetches
    const idData = ids.map((id) => ({
      id,
      settingsPromise: settingsStore.get(id),
      latLngsPromise: latLngsStore.get(id),
    }));

    await Promise.all(
      idData.map(async ({ id, settingsPromise, latLngsPromise }) => {
        const settings = await settingsPromise;
        const latLngs = await latLngsPromise;
        this.setState((prevState) => ({
          historyIds: [...prevState.historyIds, id],
          historySettings: {
            ...prevState.historySettings,
            [id]: settings,
          },
          latLngs: {
            ...prevState.latLngs,
            [id]: latLngs,
          },
        }));
      })
    );
    this.setState({ doneLoading: true });
  }

  cacheNewHistory = async (historyId) => {
    const db = await this.db;
    const tx = db.transaction(
      ["historyIds", "historySettings", "latLngs"],
      "readwrite"
    );
    tx.objectStore("historyIds").add(historyId, historyId);
    tx.objectStore("historySettings").add(
      this.state.historySettings[historyId],
      historyId
    );
    tx.objectStore("latLngs").add(this.state.latLngs[historyId], historyId);
    await tx.complete;
    console.log(`Saved new history ${historyId} to database`);
  };

  cacheSettings = async (historyId) => {
    const db = await this.db;
    const tx = db.transaction("historySettings", "readwrite");
    tx.objectStore("historySettings").put(
      this.state.historySettings[historyId],
      historyId
    );
    await tx.complete;
    console.log(`Saved history settings for ${historyId} to database`);
  };

  handleStartUploadNewHistory = async (file) => {
    if (!this.state.doneLoading) return;
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
    this.setState(
      (prevState, props) => ({
        historySettings: {
          ...prevState.historySettings,
          [historyId]: {
            ...prevState.historySettings[historyId],
            label,
          },
        },
      }),
      () => {
        this.cacheSettings(historyId);
      }
    );
  };

  handleToggleHistoryShownOnMap = (historyId) => {
    this.setState(
      (prevState, props) => {
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
      },
      () => {
        this.cacheSettings(historyId);
      }
    );
  };

  handleHistoryColorChanged = (color, historyId) => {
    console.log(`Changing id ${historyId} to color ${color}`);
    this.setState(
      (prevState, props) => ({
        historySettings: {
          ...prevState.historySettings,
          [historyId]: {
            ...prevState.historySettings[historyId],
            color,
          },
        },
      }),
      () => {
        this.cacheSettings(historyId);
      }
    );
  };

  handleDoneUploadNewHistory = (latLngs, historyId) => {
    this.setState(
      (prevState, props) => ({
        historySettings: {
          ...prevState.historySettings,
          [historyId]: {
            ...prevState.historySettings[historyId],
            loadingProgress: 1,
            isFirstShow: true,
          },
        },
        latLngs: {
          ...prevState.latLngs,
          [historyId]: latLngs,
        },
      }),
      () => {
        this.setState(
          (prevState, props) => ({
            historySettings: {
              ...prevState.historySettings,
              [historyId]: {
                ...prevState.historySettings[historyId],
                loadingProgress: 1,
                isFirstShow: false,
              },
            },
          }),
          () => this.cacheNewHistory(historyId)
        );
      }
    );
  };

  getShownIds = () => {
    const { historyIds, latLngs, historySettings } = this.state;
    return historyIds.filter(
      (id) =>
        historySettings[id] && historySettings[id].isShownOnMap && latLngs[id]
    );
  };

  render() {
    const { historyIds, latLngs, historySettings } = this.state;

    return (
      <>
        <MapContainer
          polylines={this.getShownIds().map((id) => ({
            id,
            latLngs: latLngs[id],
            color: historySettings[id].color,
            isFirstShow: historySettings[id].isFirstShow,
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

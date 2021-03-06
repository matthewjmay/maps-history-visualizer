import React from "react";

import { throttle } from "../utils.js";

import PathControl from "./PathControls";

class Controls extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputOpenFileRef = React.createRef();
  }

  showOpenFileDlg = throttle(() => {
    this.inputOpenFileRef.current.click();
  }, 500);

  handleFileSelect = (evt) => {
    evt.preventDefault();
    this.props.onAddNewHistory(this.inputOpenFileRef.current.files[0]);
    evt.target.value = null;
  };

  render() {
    const {
      historyControls,
      onHistoryToggleShownOnMap,
      onHistoryColorChanged,
      onHistoryLabelChanged,
    } = this.props;

    return (
      <div className="controls">
        <input
          ref={this.inputOpenFileRef}
          type="file"
          style={{ display: "none" }}
          onInput={this.handleFileSelect}
        />
        <button className="newpathcontainer" onClick={this.showOpenFileDlg}>
          Upload a new file
        </button>
        {historyControls.map(
          ({ id, loadingProgress, isShownOnMap, label, color }) => (
            <PathControl
              key={id}
              loadingProgress={loadingProgress}
              label={label}
              isShownOnMap={isShownOnMap}
              color={color}
              onToggled={() => {
                onHistoryToggleShownOnMap(id);
              }}
              onColorChanged={(val) => {
                onHistoryColorChanged(val, id);
              }}
              onLabelChanged={(val) => {
                onHistoryLabelChanged(val, id);
              }}
            />
          )
        )}
      </div>
    );
  }
}

export default Controls;

import React from "react";

import PathControl from "./PathControls";

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.inputOpenFileRef = React.createRef();
  }

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  };

  handleFileSelect = (evt) => {
    event.preventDefault();
    this.props.onAddNewHistory(this.inputOpenFileRef.current.files[0]);
    evt.target.value = null;
  };

  render() {
    const {
      historyControls,
      onShownOnMapChanged,
      onColorChanged,
      onNameChanged,
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
              onShownOnMapChanged={onShownOnMapChanged}
              onColorChanged={onColorChanged}
              onLabelChanged={onNameChanged}
            />
          )
        )}
      </div>
    );
  }
}

export default Controls;

import React from "react";
import classnames from "classnames";

import HistoryLabel from "./HistoryLabel";

const PathControls = (props) => (
  <div className="pathcontrols">
    <div className="pathconfig">
      <span
        onClick={props.onToggled}
        className={classnames("slider-container", {
          checked: props.isShownOnMap,
        })}
      >
        <span
          className={classnames("slider-inner", {
            checked: props.isShownOnMap,
          })}
        />
      </span>
      <HistoryLabel onChange={props.onLabelChanged} label={props.label} />
      <span className="color-chooser-container">
        <input
          className="color-chooser"
          type="color"
          value={props.color}
          onChange={(e) => props.onColorChanged(e.target.value)}
        />
      </span>
    </div>
    {props.loadingProgress < 1 && (
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar"
          style={{ width: `${100 * props.loadingProgress}%` }}
        />
      </div>
    )}
  </div>
);

export default PathControls;

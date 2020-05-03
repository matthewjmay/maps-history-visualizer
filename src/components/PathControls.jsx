import React, { Component } from "react";

export default (props) => {
  console.log(props);
  return (
    <div className="pathconfig">
      <div className="inner">{props.label}</div>
    </div>
  );
};

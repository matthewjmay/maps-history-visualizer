import React, { useRef, useState } from "react";

class HistoryLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
    this.inputRef = React.createRef();
  }

  setEditing = (isEditing) => {
    this.setState({ isEditing });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      !prevState.isEditing &&
      this.state.isEditing &&
      this.inputRef &&
      this.inputRef.current
    ) {
      this.inputRef.current.focus();
    }
  }

  handleKeyDown = (event) => {
    if (["Enter", "Tab", "Escape"].includes(event.key)) {
      this.setEditing(false);
    }
  };

  render() {
    return this.state.isEditing ? (
      <input
        className="history-label"
        type="text"
        name="label"
        value={this.props.label}
        onChange={(e) => this.props.onChange(e.target.value)}
        onBlur={() => this.setEditing(false)}
        onKeyDown={this.handleKeyDown}
        ref={this.inputRef}
      />
    ) : (
      <span
        className="history-label editable"
        onClick={() => this.setEditing(true)}
      >
        {this.props.label}
      </span>
    );
  }
}

export default HistoryLabel;

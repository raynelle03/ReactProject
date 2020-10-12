import React, { Component } from "react";

let dialogStyles = {
  width: "140px",
  maxwidth: "100%",
  margin: "0 auto",
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  zindex: "999",
  backgroundColor: "#eee",
  padding: "10px 20px 40px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
};

let dialogCloseButtonStyle = {
  marginBottom: "15px",
  padding: "3px 8px",
  cursor: "pointer",
  borderRadius: "50%",
  border: "none",
  width: "30px",
  height: "30px",
  fontWeight: "bold",
  alignSelf: "flex-end",
};

class Dialog extends Component {
  render() {
    let dialog = (
      <div style={dialogStyles} className="modal-content">
        <h2 id="dialog_title">Alert</h2>
        <button style={dialogCloseButtonStyle} onClick={this.props.onClose}>
          x
        </button>
        {this.props.children}
      </div>
    );

    if (!this.props.isOpen) {
      dialog = null;
    }

    return (
      <div className="modal-container" role="dialog" aria-modal="true">
        {dialog}
      </div>
    );
  }
}

export default Dialog;

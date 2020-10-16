import React, { Component } from "react";

class Dialog extends Component {
  render() {
    return (
      <div className="dialog" role="dialog" aria-labelledby="dialog_title">
        <div className="dialog__window">
          <div>
            <h2 id="dialog_title">Alert</h2>
          </div>
          <div>
            <p>Please enter your name and comment</p>
            <button>close</button>
            <button>ok</button>
          </div>
        </div>
        <div className="dialog__mask"></div>
      </div>
    );
  }
}

export default Dialog;

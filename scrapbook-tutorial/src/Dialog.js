import React, { Component } from "react";

class Dialog extends Component {
  render() {
    return (
      <div class="dialog" role="dialog" aria-labelledby="dialog_title">
        <div class="dialog__window">
          <div>
            <h2 id="dialog_title">Alert</h2>
          </div>
          <div>
            <p>Please enter your name and comment</p>
            <button>close</button>
            <button>ok</button>
          </div>
        </div>
        <div class="dialog__mask"></div>
      </div>
    );
  }
}

export default Dialog;

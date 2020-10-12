import React, { Component } from "react";
import Comment from "./Comment";
import Form from "./Form";
import Dialog from "./Dialog";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class App extends Component {
  static previousActiveElement;
  constructor() {
    super();
  }

  state = {
    comments: [],
  };

  onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const items = this.state.comments;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.setState({ comments: items });
  };

  render() {
    const { comments } = this.state;
    return (
      <div className="container">
        <Form handleSubmit={this.handleSubmit} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Comment characterData={comments} />
        </DragDropContext>

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
      </div>
    );
  }

  handleSubmit = (comment) => {
    if (comment.name === "" || comment.comment === "") {
      this.openDialog();
      return;
    }

    console.log(comment);
    this.setState({ comments: [...this.state.comments, comment] });
  };

  //Dialog stuff

  openDialog = () => {
    this.previousActiveElement = document.activeElement;

    Array.from(document.body.children).forEach((child) => {
      if (child != document.querySelector(".dialog")) {
        child.inert = true;
      }
    });

    document.querySelector(".dialog").classList.add("opened");
    document
      .querySelector(".dialog__window")
      .querySelectorAll("button")
      .forEach((button) => {
        button.addEventListener("click", this.closeDialog);
      });
    document.addEventListener("keydown", this.checkCloseDialog);
    document.querySelector(".dialog").querySelector("button").focus();
  };

  checkCloseDialog = (e) => {
    if (e.keyCode === 27) {
      this.closeDialog();
    }
  };

  closeDialog = () => {
    document
      .querySelector(".dialog__window")
      .querySelectorAll("button")
      .forEach((button) => {
        button.removeEventListener("click", this.closeDialog);
      });

    document.removeEventListener("keydown", this.checkCloseDialog);

    Array.from(document.body.children).forEach((child) => {
      if (child != document.querySelector(".dialog")) {
        child.inert = false;
      }
    });

    document.querySelector(".dialog").classList.remove("opened");
    this.previousActiveElement.focus();
  };
}

export default App;

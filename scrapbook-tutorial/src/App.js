import React, { Component } from "react";
import Comment from "./Comment";
import Form from "./Form";
import Dialog from "./Dialog";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class App extends Component {
  static previousActiveElement;
  static dialog;
  static dialogMask;
  static dialogWindow;

  static lastFocusableEl;
  static firstFocusableEl;

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

  componentDidMount() {
    this.dialog = document.querySelector(".dialog");
    this.dialogMask = document.querySelector(".dialog__mask");
    this.dialogWindow = document.querySelector(".dialog__window");
  }

  render() {
    const { comments } = this.state;
    return (
      <div className="container">
        <Form handleSubmit={this.handleSubmit} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Comment characterData={comments} />
        </DragDropContext>
        <Dialog></Dialog>
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
    this.dialog.classList.add("opened");
    this.dialogWindow.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", this.closeDialog);
    });
    document.addEventListener("keydown", this.checkCloseDialog);
    this.dialog.querySelector("button").focus();

    var focusableEls = this.dialogWindow.querySelectorAll("button");
    this.firstFocusableEl = focusableEls[0];
    this.lastFocusableEl = focusableEls[focusableEls.length - 1];
  };

  checkCloseDialog = (e) => {
    switch (e.keyCode) {
      case 27: //Close dialog on esc key
        this.closeDialog();
      case 9:
        this.handleTabKey(e);
    }
  };

  handleTabKey = (e) => {
    if (document.activeElement === this.lastFocusableEl) {
      e.preventDefault();
      this.firstFocusableEl.focus();
    }
  };

  closeDialog = () => {
    this.dialogWindow.querySelectorAll("button").forEach((button) => {
      button.removeEventListener("click", this.closeDialog);
    });

    document.removeEventListener("keydown", this.checkCloseDialog);
    this.dialog.classList.remove("opened");
    this.previousActiveElement.focus();
  };
}

export default App;

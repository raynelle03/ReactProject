import React, { useState, useEffect, useCallback } from "react";
import Comment from "./Comment";
import Form from "./Form";
import Dialog from "./Dialog";
import axios from "axios";
import ApiList from "./ApiList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const myDogServerBaseURL = "https://dog.ceo/api";

const App = () => {
  var previousActiveElement;
  var dialog;
  var dialogMask;
  var dialogWindow;

  var lastFocusableEl;
  var firstFocusableEl;

  const [comments, setComments] = useState([]);
  const [items, setItems] = useState([]);
  const [callInProgress, setCallInProgress] = useState(false);

  const loadItems = () => {
    setCallInProgress(true);
    axios
      .get(`${myDogServerBaseURL}/breed/hound/list`)
      .then((response) => {
        console.log("response");
        console.log(response);
        setItems(response.data.message);
        setCallInProgress(false);
      })

      .catch((error) => {
        console.log("error found");
        setCallInProgress(false);
      });
  };

  useEffect(() => {
    dialog = document.querySelector(".dialog");
    dialogMask = document.querySelector(".dialog__mask");
    dialogWindow = document.querySelector(".dialog__window");
  }, []);

  useEffect(() => {
    if (callInProgress) {
      console.log("call in progress");
    } else {
      console.log("call not in progress");
    }
  });

  const handleSubmit = (comment) => {
    if (comment.name === "" || comment.comment === "") {
      openDialog();
      return;
    }
    let updatedComments = [...comments, comment];
    setComments(updatedComments);
  };

  //Dialog stuff
  const openDialog = () => {
    console.log(dialog);
    previousActiveElement = document.activeElement;
    dialog.classList.add("opened");
    dialogWindow.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", closeDialog);
    });
    document.addEventListener("keydown", checkCloseDialog);
    dialog.querySelector("button").focus();

    const focusableEls = dialogWindow.querySelectorAll("button");
    firstFocusableEl = focusableEls[0];
    lastFocusableEl = focusableEls[focusableEls.length - 1];
  };

  const checkCloseDialog = (e) => {
    switch (e.keyCode) {
      case 27: //Close dialog on esc key
        closeDialog();
      case 9:
        handleTabKey(e);
    }
  };

  const handleTabKey = (e) => {
    if (document.activeElement === lastFocusableEl) {
      e.preventDefault();
      firstFocusableEl.focus();
    }
  };

  const closeDialog = () => {
    dialogWindow.querySelectorAll("button").forEach((button) => {
      button.removeEventListener("click", closeDialog);
    });

    document.removeEventListener("keydown", checkCloseDialog);
    dialog.classList.remove("opened");
    previousActiveElement.focus();
  };

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const items = comments;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setComments(items);
  };

  return (
    <div className="container">
      <Form handleSubmit={handleSubmit} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Comment characterData={comments} />
      </DragDropContext>
      <Dialog></Dialog>
      <input type="button" value="Get list" onClick={loadItems} />
      <ApiList items={items} />
    </div>
  );
};

export default App;

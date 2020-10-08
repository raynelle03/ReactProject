import React, { Component } from "react";
import Comment from "./Comment";
import Form from "./Form";
import Dialog from "./Dialog";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class App extends Component {
  state = {
    characters: [],
    isOpen: false,
  };

  onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const items = this.state.characters;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.setState({ characters: items });
  };

  render() {
    const { characters } = this.state;

    return (
      <div className="container">
        <Form handleSubmit={this.handleSubmit} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Comment characterData={characters} />
        </DragDropContext>
        <Dialog isOpen={this.state.isOpen} onClose={this.onClose}>
          Please enter your name and comment
        </Dialog>
      </div>
    );
  }

  onClose = () => {
    this.setState({ isOpen: false });
  };

  handleSubmit = (character) => {
    if (character.name === "" || character.comment === "") {
      this.setState({ isOpen: true });
      return;
    }

    console.log(character);
    this.setState({ characters: [...this.state.characters, character] });
  };
}

export default App;

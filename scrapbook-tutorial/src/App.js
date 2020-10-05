import React, { Component } from "react";
import Comment from "./Comment";
import Form from "./Form";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class App extends Component {
  state = {
    characters: [],
  };

  onDragEnd = (result) => {};

  render() {
    const { characters } = this.state;

    return (
      <div className="container">
        <Form handleSubmit={this.handleSubmit} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Comment characterData={characters} />
        </DragDropContext>
      </div>
    );
  }

  handleSubmit = (character) => {
    console.log(character);
    this.setState({ characters: [...this.state.characters, character] });
  };
}

export default App;

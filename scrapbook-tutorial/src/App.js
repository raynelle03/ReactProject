import React, { Component } from "react";
import Comment from "./Comment";
import Form from "./Form";

class App extends Component {
  state = {
    characters: [],
  };

  render() {
    const { characters } = this.state;

    return (
      <div className="container">
        <Form handleSubmit={this.handleSubmit} />
        <Comment characterData={characters} />
      </div>
    );
  }

  handleSubmit = (character) => {
    this.setState({ characters: [...this.state.characters, character] });
  };
}

export default App;

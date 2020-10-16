import React, { Component } from "react";

class Form extends Component {
  initialState = {
    name: "",
    comment: "",
  };

  state = this.initialState;

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, comment } = this.state;

    return (
      <form>
        <ul className="wrapper">
          <li className="form-row">
            <label htmlFor="name">Enter Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={this.handleChange}
            />
          </li>
          <li className="form-row">
            <label htmlFor="comment">Leave your message here</label>

            <textarea
              ype="textarea"
              name="comment"
              id="comment"
              value={comment}
              onChange={this.handleChange}
              rows="5"
            />
          </li>
          <li className="form-row">
            <input type="button" value="Submit" onClick={this.submitForm} />
          </li>
        </ul>
      </form>
    );
  }

  submitForm = () => {
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };
}

export default Form;

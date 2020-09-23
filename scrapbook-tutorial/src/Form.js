import React, { Component } from "react";

class Form extends Component {
  initialState = {
    name: "",
    job: "",
  };

  state = this.initialState;

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, job } = this.state;

    return (
      <form>
        <ul class="wrapper">
          <li class="form-row">
            <label htmlFor="name">Enter Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={this.handleChange}
            />
          </li>
          <li class="form-row">
            <label htmlFor="job">Leave your message here</label>

            <textarea
              ype="textarea"
              name="job"
              id="job"
              value={job}
              onChange={this.handleChange}
              rows="5"
            />
          </li>
          <li class="form-row">
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

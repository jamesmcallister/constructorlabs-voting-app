import React, { Component } from "react";

export class Form extends Component {
  constructor() {
    super(null);
    this.state = {
      currentInput: ""
    };
    this.handelChange = this.handelChange.bind(this);
  }
  handelChange(event) {
    this.setState({ currentInput: event.target.value });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={event =>
            this.props.submitNewTopic(event, this.state.currentInput)
          }
        >
          <label>Add new topic </label>
          <input onChange={this.handelChange} value={this.state.currentInput} />
        </form>
      </div>
    );
  }
}

import React, { Component } from "react";

export class Form extends Component {
  constructor() {
    super();
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
            this.props.submitMessage(event, this.state.currentInput)
          }
        >
          <label>message for server</label>
          <input onChange={this.handelChange} value={this.state.currentInput} />
        </form>
      </div>
    );
  }
}

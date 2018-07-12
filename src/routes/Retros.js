import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
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
            this.props.submitNewRetro(event, {
              color: this.state.type,
              text: this.state.currentInput
            })
          }
        >
          <label>Add new retro </label>
          <input onChange={this.handelChange} value={this.state.currentInput} />
        </form>
      </div>
    );
  }
}

const RetroCards = ({ color, text }) => (
  <li>
    <h3>{color}</h3>
    <div>{text}</div>
  </li>
);

export class Retros extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Red</h2>
          <Form type="Red" submitNewRetro={this.props.submitNewRetro} />
          <h2>Yellow</h2>
          <Form type="Yellow" submitNewRetro={this.props.submitNewRetro} />
        </div>
        <div>
          <h1>The good the bad the ugly...</h1>
          {Object.keys(this.props.retros).map(item =>
            // @ts-ignore
            Object.entries(this.props.retros[item]).map(([ip, data]) => (
              <RetroCards key={data.text} {...data} />
            ))
          )}
        </div>
      </div>
    );
  }
}

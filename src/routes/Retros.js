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

const Reults = ({ data }) => <li>as</li>;

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
        {Object.keys(this.props.retros).map(item => (
          <Reults key={item} data={this.props.retros[item]} />
        ))}
      </div>
    );
  }
}

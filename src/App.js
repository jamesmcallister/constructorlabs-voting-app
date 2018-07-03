import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Form } from "./Form";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      fromServer: {}
    };
    this.submitMessage = this.submitMessage.bind(this);
  }
  componentDidMount() {
    this.socket = new WebSocket("ws://192.168.0.151:3002");
    this.socket.addEventListener("open", event => {});

    this.socket.addEventListener("message", ({ data }) => {
      this.setState(prevState => ({
        fromServer: { ...prevState.fromServer, data }
      }));
    });
  }
  submitMessage(event, message) {
    event.preventDefault();
    this.socket.send(message);
    this.setState({ message });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.fromServer.data} </p>
        <Form submitMessage={this.submitMessage} />
        <div>{this.state.message}</div>
      </div>
    );
  }
}

export default App;

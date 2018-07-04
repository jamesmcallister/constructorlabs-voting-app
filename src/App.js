import React, { Component } from "react";
import logo from "./constructor-labs-badge.png";
import "./App.css";
import { Form } from "./Form";
import { ErrorBoundary } from "./ErrorBoundary";

import { Topic } from "./Topic";

class App extends Component {
  constructor() {
    super();
    this.state = {
      options: ["camel", "duck", "donut", "potato", "mash"],
      data: {
        message: "",
        votes: {},
        topics: []
      }
    };
    this.submitNewTopic = this.submitNewTopic.bind(this);
    this.submitVote = this.submitVote.bind(this);
  }
  componentDidMount() {
    this.socket = new WebSocket("ws://192.168.0.151:3002");

    this.socket.addEventListener("message", event => {
      const { data } = event;
      this.setState(prevState => ({
        data: { ...JSON.parse(data) }
      }));
    });
  }
  componentDidCatch(error, info) {
    console.log(info.componentStack);
  }
  submitNewTopic(event, newTopic) {
    event.preventDefault();
    const result = { TYPE: "ADD_TOPIC", newTopic };
    this.socket.send(JSON.stringify(result));
  }
  submitVote({ topic, name }) {
    const result = { TYPE: "ADD_VOTE", vote: name, topic: topic };
    this.socket.send(JSON.stringify(result));
  }
  render() {
    return (
      <ErrorBoundary>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome Constructor Labs</h1>
            <h2>Vote NOW, fellow Potatos!!!!!</h2>
          </header>
          <p className="App-intro">{this.state.data.message}</p>
          <Form submitNewTopic={this.submitNewTopic} />
          {this.state.data.topics.map(topic => (
            <Topic
              key={topic}
              topic={topic}
              submitVote={this.submitVote}
              votes={this.state.data.votes}
              options={this.state.options}
            />
          ))}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;

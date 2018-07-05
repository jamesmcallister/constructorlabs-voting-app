import React, { Component } from "react";

import "./App.css";
import { ErrorBoundary } from "./ErrorBoundary";

import { Form } from "./Form";
import { Topic } from "./components/Topic";
import { Header } from "./components/Header";

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
    this.socket.addEventListener("message", ({ data }) => {
      this.setState({ data: { ...JSON.parse(data) } });
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
        <div className="app">
          <Header message={this.state.data.message} />

          <main class="main">
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
          </main>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
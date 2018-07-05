import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";
import { ErrorBoundary } from "./ErrorBoundary";

import { Form } from "./Form";
import { Topic } from "./components/Topic";
import { Header } from "./components/Header";
import { Results } from "./components/Results";

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
          <main className="main">
            <Switch>
              <Route exact path="/" component={() => <div>Home</div>} />
              <Route
                exact
                path="/votes"
                render={() =>
                  this.state.data.topics.map(topic => (
                    <Results
                      key={topic}
                      topic={topic}
                      votes={this.state.data.votes[topic]}
                      options={this.state.options}
                    />
                  ))
                }
              />
              <Route
                exact
                path="/topics"
                render={() =>
                  this.state.data.topics.map(topic => (
                    <Link key={topic} to={`/topic/${topic}`}>
                      {topic}
                    </Link>
                  ))
                }
              />
              <Route
                exact
                path="/topic/:topicid"
                render={({ match }) => (
                  <Topic
                    key={match.params.topicid}
                    topic={match.params.topicid}
                    submitVote={this.submitVote}
                    votes={this.state.data.votes}
                    options={this.state.options}
                  />
                )}
              />
              <Route
                exact
                path="/newtopic"
                render={() => <Form submitNewTopic={this.submitNewTopic} />}
              />
              <Route component={() => <div>404 error</div>} />
            </Switch>
          </main>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { ErrorBoundary } from "./ErrorBoundary";
import { Form } from "./Form";
import { Header } from "./components/Header";

import { TopicRoute } from "./routes/TopicRoute";
import { VotesRoute } from "./routes/VotesRoute";
import { TopicsRoute } from "./routes/TopicsRoute";
import { HomeRoute } from "./routes/HomeRoute";
import { Route404 } from "./routes/Route404";

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
    this.socket = new WebSocket("ws://192.168.1.85:3002");
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
              <Route exact path="/" component={() => <HomeRoute />} />
              <Route
                exact
                path="/votes"
                render={() => (
                  <VotesRoute
                    topics={this.state.data.topics}
                    options={this.state.options}
                    votes={this.state.data.votes}
                  />
                )}
              />
              <Route
                exact
                path="/topics"
                render={() => <TopicsRoute topics={this.state.data.topics} />}
              />
              <Route
                exact
                path="/topic/:topicid"
                render={({ match }) => (
                  <TopicRoute
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
              <Route component={({ match }) => <Route404 {...match} />} />
            </Switch>
          </main>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;

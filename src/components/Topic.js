import React, { Component } from "react";
import { Buttons } from "./Buttons";
import { Results } from "./Results";

export class Topic extends Component {
  render() {
    const { topic, submitVote, votes, options } = this.props;
    return (
      <div>
        <Buttons topic={topic} submitVote={submitVote} options={options} />
        <Results topic={topic} votes={votes[topic]} options={options} />
      </div>
    );
  }
}

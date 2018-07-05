import React, { Component } from "react";
import { Graph } from "./Graph";

function convertVotesToGraphData(currentTopic, votes, options) {
  const result = Object.entries(votes).reduce((acc, [id, { vote, topic }]) => {
    if (currentTopic === topic) {
      const currentTotal = acc[vote] ? acc[vote] : 0;
      acc[vote] = currentTotal + 1;
    }
    return acc;
  }, {});
  return options.map(voteType => {
    return result[voteType]
      ? { item: voteType, votes: result[voteType] }
      : { item: voteType, votes: 0 };
  });
}

function totalVotes(data) {
  return data.reduce((acc, item) => {
    acc = acc + item.votes;
    return acc;
  }, 0);
}

export class Results extends Component {
  render() {
    if (typeof this.props.votes === "undefined") {
      return null;
    }
    const graphData = convertVotesToGraphData(
      this.props.topic,
      this.props.votes,
      this.props.options
    );
    const total = totalVotes(graphData);

    return (
      <div>
        {total}
        <Graph graphData={graphData} options={this.props.options} />
      </div>
    );
  }
}

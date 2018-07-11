import React, { Component } from "react";
import PropTypes from "prop-types";
import { Graph } from "./Graph";

function convertVotesToGraphData(currentTopic, votes, options) {
  // @ts-ignore
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
      return <div>no votes in yet</div>;
    }
    const graphData = convertVotesToGraphData(
      this.props.topic,
      this.props.votes,
      this.props.options
    );
    const total = totalVotes(graphData);

    return (
      <div>
        <h1>{this.props.topic}</h1>
        <Graph graphData={graphData} options={this.props.options} />
        Total votes so far {total}
      </div>
    );
  }
}

Results.PropTypes = {
  votes: PropTypes.arrayOf(PropTypes.string),
  topic: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string)
};

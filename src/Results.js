import React, { Component } from "react";
import { Graph } from "./Graph";

function convertVotesToGraphData(topicccccc, votes, options) {
  const result = Object.entries(votes).reduce((acc, [id, { vote, topic }]) => {
    if (topicccccc === topic) {
      const currentTotal = acc[vote] ? acc[vote] : 0;
      acc[vote] = currentTotal + 1;
    }
    return acc;
  }, {});
  return options.map(voteType => {
    console.log(result[voteType]);
    return result[voteType]
      ? { item: voteType, votes: result[voteType] }
      : { item: voteType, votes: 0 };
  });
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

    return (
      <div>
        <Graph graphData={graphData} />
      </div>
    );
  }
}

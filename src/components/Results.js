import React from "react";
import { Graph } from "./Graph";

/**
 * @param {string} currentTopic
 * @param {object} votes
 * @param {object} options
 * @returns
 */
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

/**
 * @param {Array} data
 * @returns
 */
function totalVotes(data) {
  return data.reduce((acc, item) => {
    acc = acc + item.votes;
    return acc;
  }, 0);
}

/**
 * @param {object} props
 * @param {Array} props.votes
 * @param {string} props.topic
 * @param {object} props.options
 * @returns
 */
export const Results = ({ votes, topic, options }) => {
  if (typeof votes === "undefined") {
    return <div>no votes in yet</div>;
  }
  const graphData = convertVotesToGraphData(topic, votes, options);
  const total = totalVotes(graphData);

  return (
    <div>
      <h1>{topic}</h1>
      <Graph graphData={graphData} options={options} />
      Total votes so far {total}
    </div>
  );
};

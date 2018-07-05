import React from "react";
import { Buttons } from "../components/Buttons";
import { Results } from "../components/Results";

export const TopicRoute = ({ topic, submitVote, votes, options }) => {
  return (
    <div>
      <Buttons topic={topic} submitVote={submitVote} options={options} />
      <Results topic={topic} votes={votes[topic]} options={options} />
    </div>
  );
};

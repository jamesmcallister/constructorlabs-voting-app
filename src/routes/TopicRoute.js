import React from "react";
import { Link } from "react-router-dom";
import { Buttons } from "../components/Buttons";
import { Results } from "../components/Results";

export const TopicRoute = ({ topic, submitVote, votes, options }) => {
  return (
    <div className="graph">
      <Buttons topic={topic} submitVote={submitVote} options={options} />
      <Results topic={topic} votes={votes[topic]} options={options} />
      <Link to={`/fullscreen/${topic}`}>FullScreen</Link>
    </div>
  );
};

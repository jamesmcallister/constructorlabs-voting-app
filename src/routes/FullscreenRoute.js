import React from "react";

import { Results } from "../components/Results";

export const FullscreenRoute = ({ topic, submitVote, votes, options }) => {
  return (
    <div className="graph__fullscreen">
      <Results topic={topic} votes={votes[topic]} options={options} />
    </div>
  );
};

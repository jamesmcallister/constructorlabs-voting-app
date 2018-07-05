import React from "react";
import { Link } from "react-router-dom";
import { Results } from "../components/Results";

export const VotesRoute = ({ topics, votes, options }) => {
  let total = 0;
  return (
    <div className="VotesRoute">
      {topics.map(topic => {
        total = total + 1;
        return (
          <div key={topic}>
            <Link to={`/topic/${topic}`}>
              <Results
                total={total}
                topic={topic}
                votes={votes[topic]}
                options={options}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

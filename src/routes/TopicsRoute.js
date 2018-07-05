import React from "react";
import { Link } from "react-router-dom";

export const TopicsRoute = ({ topics }) => {
  return (
    <ul>
      {topics.map(topic => (
        <Link key={topic} to={`/topic/${topic}`}>
          <li>{topic}</li>
        </Link>
      ))}
    </ul>
  );
};

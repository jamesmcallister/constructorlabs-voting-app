import React from "react";
import PropTypes from "prop-types";

export const SingleButton = ({ submitVote, title, topic }) => {
  return (
    <button
      onClick={event => submitVote(event, { topic, name: title })}
      name={title}
    >
      {title}
    </button>
  );
};

SingleButton.PropTypes = {
  tag: PropTypes.string,
  topic: PropTypes.string,
  submitVote: PropTypes.func
};

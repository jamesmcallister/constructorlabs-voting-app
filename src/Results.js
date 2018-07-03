import React, { Component } from "react";

const props = {
  react: {
    "::ffff:192.168.1.85": {
      topic: "react",
      vote: "camel"
    },
    "::ffff:192.168.1.105": {
      topic: "react",
      vote: "donut"
    }
  },
  css: {
    "::ffff:192.168.1.85": {
      topic: "react",
      vote: "duck"
    },
    "::ffff:192.168.1.105": {
      topic: "react",
      vote: "duck"
    }
  }
};

const score = {
  camel: 5,
  duck: 4,
  donut: 3,
  potato: 2,
  "Mash Potato": 1
};

const SingleResult = ({ data }) => (
  <div>
    <label>{data.vote} </label>
    <progress max="5" value={score[data.vote]} />
  </div>
);

export class Results extends Component {
  render() {
    return (
      <div>
        {Object.keys(props).map(topic => (
          <div key={topic}>
            <h2>{topic}</h2>
            {Object.keys(props[topic]).map(x => (
              <SingleResult key={x} data={props[topic][x]} />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

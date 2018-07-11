import React from "react";
import PropTypes from "prop-types";

import { SingleButton } from "./SingelButton";

export class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { click: 0 };
    this.handelClick = this.handelClick.bind(this);
  }
  handelClick(event, data) {
    event.preventDefault();
    this.setState(
      prevState => ({ click: prevState.click + 1 }),
      () => this.props.submitVote(data)
    );
  }
  render() {
    const { topic, options } = this.props;
    if (this.state.click > 20) {
      throw new Error(`
      Stop pressing buttons!!
      ${topic} is getting angry now..: "" }
      `);
    }
    return (
      <div>
        {options.map(tag => (
          <SingleButton
            key={tag}
            title={tag}
            topic={topic}
            submitVote={this.handelClick}
          />
        ))}
      </div>
    );
  }
}

Buttons.PropTypes = {
  topic: PropTypes.string,
  submitVote: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string)
};

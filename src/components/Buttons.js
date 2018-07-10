import React from "react";

const Button = ({ submitVote, title, topic }) => {
  return (
    <button
      onClick={event => submitVote(event, { topic, name: title })}
      name={title}
    >
      {title}
    </button>
  );
};

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
          <Button
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

import React from "react";

const Button = ({ submitVote, title, topic }) => {
  return (
    <button
      onClick={event => submitVote(event, { topic, name: title })}
      topic={topic}
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
    const { topic } = this.props;
    // if (this.state.click > 4) {
    //   throw new Error(`We searched for ${topic} last time! try and differnt `);
    // }
    return (
      <div key={topic}>
        <h1>{topic}</h1>
        <Button title="Camel" topic={topic} submitVote={this.handelClick} />
        <Button title="Duck" topic={topic} submitVote={this.handelClick} />
        <Button title="Donut" topic={topic} submitVote={this.handelClick} />
        <Button title="Potato" topic={topic} submitVote={this.handelClick} />
        <Button
          title="Mash Potato"
          topic={topic}
          submitVote={this.handelClick}
        />
      </div>
    );
  }
}

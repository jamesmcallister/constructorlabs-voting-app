import React, { Component } from "react";
import PropTypes from "prop-types";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

export class Graph extends Component {
  render() {
    return (
      <VictoryChart>
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5]}
          tickFormat={this.props.options}
        />
        <VictoryBar data={this.props.graphData} x="item" y="votes" />
      </VictoryChart>
    );
  }
}

Graph.PropTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  graphData: PropTypes.array
};

import React, { Component } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

export class Graph extends Component {
  render() {
    return (
      <div className="graph">
        <VictoryChart>
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5]}
            tickFormat={this.props.options}
          />
          <VictoryBar data={this.props.graphData} x="item" y="votes" />
        </VictoryChart>
      </div>
    );
  }
}

import React, { Component } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

export class Graph extends Component {
  render() {
    console.log(this.props.graphData);
    return (
      <VictoryChart>
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5]}
          tickFormat={["camel", "duck", "donut", "potato", "mash"]}
        />
        <VictoryBar
          data={this.props.graphData}
          x="item"
          y="votes"
          width={450}
        />
      </VictoryChart>
    );
  }
}

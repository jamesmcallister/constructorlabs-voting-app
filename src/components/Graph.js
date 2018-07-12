import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

/**
 * @param {object} props
 * @param {Array} props.options
 * @param {object} props.graphData
 * @returns
 */
export const Graph = ({ options, graphData }) => {
  return (
    <VictoryChart>
      <VictoryAxis tickValues={[1, 2, 3, 4, 5]} tickFormat={options} />
      <VictoryBar data={graphData} x="item" y="votes" />
    </VictoryChart>
  );
};

// const { addNewTopic } = require("./helpers");

const dataFromProps = {
  "::ffff:192.168.0.151": {
    vote: "camel",
    topic: "react"
  },
  "::ffff:192.168.0.185": {
    vote: "camel",
    topic: "react"
  },
  "::ffff:192.168.0.1d5": {
    vote: "mash",
    topic: "react"
  }
};

function convertVotesToGraphData(topicccccc, votes) {
  const result = Object.entries(votes).reduce((acc, [id, { vote, topic }]) => {
    if (topicccccc === topic) {
      const currentTotal = acc[vote] ? acc[vote] : 0;
      acc[vote] = currentTotal + 1;
    }

    return acc;
  }, {});

  return ["camel", "duck", "donut", "potato", "mash"].map(
    voteType =>
      result[voteType]
        ? { item: voteType, votes: result[voteType] }
        : { item: voteType, votes: 0 }
  );
}
test("ssd", () => {
  const result = [
    { item: "camel", votes: 2 },
    { item: "duck", votes: 0 },
    { item: "donut", votes: 0 },
    { item: "potato", votes: 0 },
    { item: "mash", votes: 1 }
  ];

  expect(convertVotesToGraphData("react", dataFromProps)).toEqual(result);
});

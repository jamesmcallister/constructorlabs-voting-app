function addNewTopic(newTopic) {
  topics.push(newTopic.toLowerCase());
  return topics;
}

module.exports = {
  addNewTopic
};

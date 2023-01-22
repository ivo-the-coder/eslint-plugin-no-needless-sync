const ASTNodeMap = require("./nodes");

const findInputs = (node) => {
  return ASTNodeMap.get(node.type).aggregateInputs(
    node,
    findInputs,
    isSynchronised
  );
};

const findOutputs = (node) => {
  return ASTNodeMap.get(node.type).aggregateOutputs(node, findOutputs);
};

const isSynchronised = (node) => {
  return ASTNodeMap.get(node.type).isSynchronised(node, isSynchronised);
};

module.exports = { isSynchronised, findInputs, findOutputs };

ASTTraverser = require('./ASTTraverser')

const findInputs = node => {
  return ASTTraverser.get(node.type).aggregateInputs(node, findInputs, isSynchronised);
}

const findOutputs = node => {
  return ASTTraverser.get(node.type).aggregateOutputs(node, findOutputs);
}

const isSynchronised = node => {
  return ASTTraverser.get(node.type).isSynchronised(node, isSynchronised);
}


module.exports = { isSynchronised, findInputs, findOutputs };
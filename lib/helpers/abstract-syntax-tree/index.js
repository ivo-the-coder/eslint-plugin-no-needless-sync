ASTTraverser = require('./ASTTraverser')

const findInputs = node => {
  return ASTTraverser.get(node.type).aggregateInputs(node, findInputs);
}

const findOutputs = node => {
  return ASTTraverser.get(node.type).aggregateOutputs(node, findOutputs);
}

const isSynchronised = node => {
  return ASTTraverser.get(node.type).is(node, isSynchronised);
}


module.exports = { isSynchronised, findInputs, findOutputs};
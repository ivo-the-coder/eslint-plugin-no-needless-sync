class VariableDeclarationSynchronised {
  static isSynchronised(node, predicate) {
    return node.declarations.some(predicate);
  }

  static aggregateInputs(node, aggregator) {
    return node.declarations.flatMap(aggregator);
  }

  static aggregateOutputs(node, aggregator) {
    return node.declarations.flatMap(aggregator);
  }
}

module.exports = VariableDeclarationSynchronised;
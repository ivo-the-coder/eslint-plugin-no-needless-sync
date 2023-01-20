class VariableDeclarator {
  static is(node, predicate) {
    return predicate(node.init);
  }

  static aggregateInputs(node, aggregator) {
    return aggregator(node.init);
  }

  static aggregateOutputs(node, aggregator) {
    return aggregator(node.id);
  }
}

module.exports = VariableDeclarator;


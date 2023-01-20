class ReturnStatement {
  static is(node, predicate) {
    return predicate(node.argument);
  }

  static aggregateInputs(node, aggregator) {
    return aggregator(node.argument);
  }

  static aggregateOutputs() {
    return [];
  }
}

module.exports = ReturnStatement;
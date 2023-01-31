class ReturnStatement {
  static isSynchronised(node, predicate) {
    return node.argument ? predicate(node.argument) : false;
  }

  static aggregateInputs(node, aggregator) {
    return node.argument ? aggregator(node.argument) : [];
  }

  static aggregateOutputs() {
    return [];
  }
}

module.exports = ReturnStatement;

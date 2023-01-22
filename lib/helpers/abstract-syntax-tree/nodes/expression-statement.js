class ExpressionStatement {
  static isSynchronised(node, predicate) {
    return predicate(node.expression);
  }

  static aggregateInputs(node, aggregator) {
    return aggregator(node.expression);
  }

  static aggregateOutputs(node, aggregator) {
    return aggregator(node.expression);
  }
}

module.exports = ExpressionStatement;

class ArrowFunctionExpression {
  static isSynchronised(node, predicate) {
    return node.arguments.some(predicate);
  }

  static aggregateInputs(node, aggregator) {
    return node.arguments.flatMap(aggregator);
  }

  static aggregateOutputs() {
    return [];
  }
}

module.exports = ArrowFunctionExpression;

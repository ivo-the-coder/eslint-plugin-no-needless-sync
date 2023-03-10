class ArrayExpression {
  static isSynchronised(node, predicate) {
    return node.elements.some(predicate);
  }

  static aggregateInputs(node, aggregator) {
    return node.elements.flatMap(aggregator);
  }

  static aggregateOutputs() {
    return [];
  }
}

module.exports = ArrayExpression;

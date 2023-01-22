class ObjectExpression {
  static isSynchronised(node, predicate) {
    return node.properties.some(predicate);
  }

  static aggregateInputs(node, aggregator) {
    return node.properties.flatMap(aggregator);
  }

  static aggregateOutputs() {
    return [];
  }
}

module.exports = ObjectExpression;
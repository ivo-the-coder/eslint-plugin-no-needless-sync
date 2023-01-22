class ObjectExpression {
  static isSynchronised() {
    return false;
  }

  static aggregateInputs(node, aggregator) {
    return node.properties.flatMap(aggregator);
  }

  static aggregateOutputs() {
    return [];
  }
}

module.exports = ObjectExpression;
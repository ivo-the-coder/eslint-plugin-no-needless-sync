class ObjectPattern {
  static isSynchronised() {
    return false;
  }

  static aggregateInputs() {
    return [];
  }

  static aggregateOutputs(node, aggregator) {
    return node.properties.flatMap(aggregator);
  }
}

module.exports = ObjectPattern;

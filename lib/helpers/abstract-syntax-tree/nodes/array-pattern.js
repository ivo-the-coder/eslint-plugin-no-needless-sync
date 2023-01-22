class ArrayPattern {
  static isSynchronised() {
    return false;
  }

  static aggregateInputs() {
    return [];
  }

  static aggregateOutputs(node, aggregator) {
    return node.elements.flatMap(aggregator);
  }
}

module.exports = ArrayPattern;
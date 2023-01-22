class Property {
  static isSynchronised(node, predicate) {
    return predicate(node.value);
  }

  static aggregateInputs(node, aggregator) {
    return aggregator(node.value);
  }

  static aggregateOutputs(node, aggregator) {
    return aggregator(node.value);
  }
}

module.exports = Property;

class Property {
  static is() {
    return false;
  }

  static aggregateInputs() {
    return [];
  }

  static aggregateOutputs(node, aggregator) {
    return aggregator(node.value);
  }
}

module.exports = Property;

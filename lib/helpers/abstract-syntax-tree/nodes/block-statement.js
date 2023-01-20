class ObjectPattern {
  static is(node, predicate) {
    return node.body.some(predicate);
  }

  static aggregateInputs(node, aggregator) {
    return node.body.flatMap(aggregator);
  }

  static aggregateOutputs(node, aggregator) {
    return node.body.flatMap(aggregator);
  }
}

module.exports = ObjectPattern;


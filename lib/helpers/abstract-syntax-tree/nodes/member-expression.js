class MemberExpression {
  static isSynchronised(node, predicate) {
    return predicate(node.object) || predicate(node.property);
  }

  static aggregateInputs(node, aggregator) {
    return [...aggregator(node.object), ...aggregator(node.property)];
  }

  static aggregateOutputs(node, aggregator) {
    return [...aggregator(node.object), ...aggregator(node.property)];
  }
}

module.exports = MemberExpression;

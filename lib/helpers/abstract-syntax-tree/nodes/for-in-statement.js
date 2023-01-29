class ForInStatement {
  static isSynchronised(node, predicate) {
    return predicate(node.right) || predicate(node.body);
  }

  static aggregateInputs(node, aggregator) {
    return [...aggregator(node.right), ...aggregator(node.body)];
  }

  static aggregateOutputs(node, aggregator) {
    return aggregator(node.body);
  }
}

module.exports = ForInStatement;


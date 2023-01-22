class AssignmentExpression {
  static isSynchronised(node, predicate) {
    return predicate(node.left) || predicate(node.right);
  }

  static aggregateInputs(node, aggregator, predicate) {
    const leftInputs = predicate(node.left) ? aggregator(node.left) : [];
    return [...leftInputs, ...aggregator(node.right)];
  }

  static aggregateOutputs(node, aggregator) {
    return aggregator(node.left);
  }
}

module.exports = AssignmentExpression;

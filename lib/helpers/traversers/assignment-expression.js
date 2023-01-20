class AssignmentExpression {
  static is(node, predicate) {
    return node.declarations.some(predicate);
  }

  static aggregateInputs(node, aggregator) {
    return aggregator(node.right);
  }

  static aggregateOutputs(node, aggregator) {
    return aggregator(node.left);
  }
}

module.exports = AssignmentExpression;

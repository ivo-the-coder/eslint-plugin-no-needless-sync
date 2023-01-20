class CallExpression {
  static is(node, predicate) {
    return predicate(node.callee) || node.arguments.some(predicate);
  }

  static aggregateInputs(node, aggregator) {
    return aggregator(node.callee).concat(node.arguments.flatMap(aggregator));
  }

  static aggregateOutputs() {
    return [];
  }
}

module.exports = CallExpression;


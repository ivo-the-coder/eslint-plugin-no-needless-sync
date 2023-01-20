class CallExpression {
  static is() {
    return false;
  }

  // TODO: add callee as input in case callee is sync
  static aggregateInputs(node, aggregator) {
    return node.arguments.flatMap(aggregator);
  }

  static aggregateOutputs() {
    return [];
  }
}

module.exports = CallExpression;


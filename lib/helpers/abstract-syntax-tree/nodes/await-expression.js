class AwaitExpression {
  static is() {
    return true;
  }

  static aggregateInputs(node, aggregator) {
    return aggregator(node.argument);
  }

  static aggregateOutputs() {
    return [];
  }
}

module.exports = AwaitExpression;
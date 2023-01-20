class MemberExpression {
  static is() {
    return false;
  }

  static aggregateInputs(node, aggregator) {
    return aggregator(node.object);
  }

  static aggregateOutputs(node, aggregator) {
    return aggregator(node.object);
  }
}

module.exports = MemberExpression;
class IfStatement {
  static isSynchronised(node, predicate) {
    return [node.test, node.consequent, node.alternate].some(node => node && predicate(node));
  }

  static aggregateInputs(node, aggregator) {
    return aggregator(node.test);
  }

  static aggregateOutputs(node, aggregator) {
    const consequentOutputs = aggregator(node.consequent);
    const alternateOutputs = node.alternate ? aggregator(node.alternate) : [];
    return [...consequentOutputs, ...alternateOutputs];
  }
}

module.exports = IfStatement;

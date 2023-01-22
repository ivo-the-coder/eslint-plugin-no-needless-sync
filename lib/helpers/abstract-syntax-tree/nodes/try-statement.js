class TryStatement {
  static isSynchronised(node, predicate) {
    return (
      predicate(node.block) ||
      predicate(node.handler.body) ||
      (node.finalizer && predicate(node.finalizer))
    );
  }

  static aggregateInputs(node, aggregator) {
    return [
      ...aggregator(node.block),
      ...aggregator(node.handler.body),
      ...(node.finalizer ? aggregator(node.finalizer) : []),
    ];
  }

  static aggregateOutputs() {
    return [];
  }
}

module.exports = TryStatement;

class VariableDeclarator {
  static isSynchronised(node, predicate) {
    return node.init ? predicate(node.init) : false;
  }

  static aggregateInputs(node, aggregator) {
    return node.init ? aggregator(node.init) : [];
  }

  static aggregateOutputs(node, aggregator) {
    return aggregator(node.id);
  }
}

module.exports = VariableDeclarator;

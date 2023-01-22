class Identifier {
  static isSynchronised() {
    return false;
  }

  static aggregateInputs(node) {
    return [node.name];
  }

  static aggregateOutputs(node) {
    return [node.name];
  }
}

module.exports = Identifier;


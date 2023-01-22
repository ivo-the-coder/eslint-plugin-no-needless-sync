const { isSynchronised, findOutputs, findInputs } = require('./abstract-syntax-tree');
const { intersection, union } = require('./set-operations');

const hasDirectInputDependency = (latterNode, priorNode) => {
  const priorNodeOutputs = new Set(findOutputs(priorNode));
  const latterNodeInputs = new Set(findInputs(latterNode));
  
  return intersection(priorNodeOutputs, latterNodeInputs).size > 0;
}

const directDependencySets = (nodes) => {
  const result = nodes.map(() => new Set());
  nodes.forEach((node, index) => {
    nodes.slice(index + 1).forEach((otherNode, otherIndex) => {
      if (hasDirectInputDependency(otherNode, node)) {
        result[index + otherIndex + 1].add(index)
      }
    });
  });
  return result;
}

const flattenDependencySets = (directDependencySets) => {
  directDependencySets.forEach((dependencySet, index) => {
    for (let dependency of dependencySet) {
      directDependencySets[index] = union(dependencySet, directDependencySets[dependency]);
    }
  });
};

const findMutuallyIndependentAwaitIndices = (dependencySets, nodes) => {
  const results = new Set();
  nodes.forEach((node, index) => {
    if (isSynchronised(node)) {
      const priorNodeIndices = [...Array(index).keys()];
      priorNodeIndices.forEach(priorIndex => {
        if (isSynchronised(nodes[priorIndex]) && !dependencySets[index].has(priorIndex)) {
          results.add(index);
          results.add(priorIndex);
        }
      });
    }
  });
  return [...results.values()];
}

const findNeedlesslySynchronisedAwaitExpressions = (blockStatement) => {
  const dependencySets = directDependencySets(blockStatement.body);
  flattenDependencySets(dependencySets);
  const independentAwaitIndices = findMutuallyIndependentAwaitIndices(dependencySets, blockStatement.body);

  return independentAwaitIndices.map(index => blockStatement.body[index]);
}

module.exports = { findNeedlesslySynchronisedAwaitExpressions }
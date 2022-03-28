const { findAwaitExpressions, findVariableIdentifierNames, findArgumentIdentifierNames } = require('./finders');
const { intersection, isEqual, union } = require('./set-operations');

const hasDirectInputDependency = (priorAwait, latterAwait) => {
  const priorAwaitOutputs = new Set();
  const latterAwaitInputs = new Set();

  const outputs = findVariableIdentifierNames(priorAwait.parent);
  outputs.forEach(output => priorAwaitOutputs.add(output));
  
  const identifiers = findArgumentIdentifierNames(latterAwait.argument);
  identifiers.forEach(id => latterAwaitInputs.add(id));
  
  return intersection(priorAwaitOutputs, latterAwaitInputs).size > 0;
}

const directDependencySets = (awaitExpressions) => {
  const result = awaitExpressions.map(() => new Set());
  awaitExpressions.forEach((awaitExpression, index) => {
    awaitExpressions.forEach((otherAwaitExpression, otherIndex) => {
      if (hasDirectInputDependency(otherAwaitExpression, awaitExpression)) {
        result[index].add(otherIndex)
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

const findMutuallyIndependentAwaits = (dependencySets) => {
  const results = new Set();
  dependencySets.forEach((dependencySet, index) => {
    const priorAwaitIndices = [...Array(index).keys()];
    priorAwaitIndices.forEach(priorIndex => {
      if (!dependencySet.has(priorIndex)) {
        results.add(index);
        results.add(priorIndex);
      }
    });
  })
  return [...results.values()];
}

const findNeedlesslySynchronisedAwaitExpressions = (node) => {
  const awaitExpressions = findAwaitExpressions(node);
  const dependencySets = directDependencySets(awaitExpressions);
  flattenDependencySets(dependencySets);
  const independentAwaitIndices = findMutuallyIndependentAwaits(dependencySets);

  return independentAwaitIndices.map(awaitIndex => awaitExpressions[awaitIndex]);
}

module.exports = { findNeedlesslySynchronisedAwaitExpressions }
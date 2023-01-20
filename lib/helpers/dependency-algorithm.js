const { isSynchronised, findVariableIdentifierNames, findArgumentIdentifierNames } = require('./finders');
const { intersection, union } = require('./set-operations');

const hasDirectInputDependency = (priorExpression, latterExpression) => {
  const priorExpressionOutputs = new Set(findVariableIdentifierNames(priorExpression));
  const latterExpressionInputs = new Set(findArgumentIdentifierNames(latterExpression));
  
  return intersection(priorExpressionOutputs, latterExpressionInputs).size > 0;
}

const directDependencySets = (expressions) => {
  const result = expressions.map(() => new Set());
  expressions.forEach((expression, index) => {
    expressions.forEach((otherExpression, otherIndex) => {
      if (hasDirectInputDependency(otherExpression, expression)) {
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

const findMutuallyIndependentAwaitIndices = (dependencySets, expressions) => {
  const results = new Set();
  expressions.forEach((expression, index) => {
    if (isSynchronised(expression)) {
      const priorExpressionIndices = [...Array(index).keys()];
      priorExpressionIndices.forEach(priorIndex => {
        if (isSynchronised(expressions[priorIndex]) && !dependencySets[index].has(priorIndex)) {
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
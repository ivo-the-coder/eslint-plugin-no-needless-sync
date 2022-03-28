const findAwaitExpressions = node => {
  switch (node.type) {
    case 'AwaitExpression':
      return [node];
    case 'BlockStatement':
      return node.body.flatMap(findAwaitExpressions);
    case 'VariableDeclarator':
      return findAwaitExpressions(node.init);
    case 'VariableDeclaration':
      return node.declarations.flatMap(findAwaitExpressions);
    case 'ExpressionStatement':
      return findAwaitExpressions(node.expression);
    default:
      return [];
  }
}

const findArgumentIdentifierNames = node => {
  switch (node.type) {
    case 'Identifier':
      return [node.name];
    case 'MemberExpression':
      return findArgumentIdentifierNames(node.object);
    case 'ArrayExpression':
      return node.elements.flatMap(findArgumentIdentifierNames);
    case 'CallExpression':
      return node.arguments.flatMap(findArgumentIdentifierNames);
    default:
      return [];
  }
}

const findVariableIdentifierNames = node => {
  switch (node.type) {
    case 'Identifier':
      return [node.name];
    case 'VariableDeclarator':
      return findVariableIdentifierNames(node.id);
    case 'ArrayPattern':
      return node.elements.flatMap(findVariableIdentifierNames);
    case 'ObjectPattern':
      return node.properties.flatMap(findVariableIdentifierNames);
    case 'Property':
      return findVariableIdentifierNames(node.value);
    default:
      return [];
  }
}

module.exports = { findAwaitExpressions, findArgumentIdentifierNames, findVariableIdentifierNames};
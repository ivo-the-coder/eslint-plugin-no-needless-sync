const isRelevantExpression = node => {
  switch (node.type) {
    case 'AwaitExpression':
      return true;
    case 'ExpressionStatement':
      return isRelevantExpression(node.expression);
    case 'VariableDeclaration':
      return true;
    case 'IfStatement':
      return [node.test, node.consequent, node.alternate].some(node => node && isRelevantExpression(node));
    case 'BlockStatement':
      return node.body.some(isRelevantExpression)
    default:
      return false;

  }
}

const findRelevantExpressions = blockStatement => {
  return blockStatement.body.filter(isRelevantExpression)
}

const findArgumentIdentifierNames = node => {
  switch (node.type) {
    case 'ExpressionStatement':
      return findArgumentIdentifierNames(node.expression);
    case 'AssignmentExpression':
      return findArgumentIdentifierNames(node.right);
    case 'VariableDeclaration':
      return node.declarations.flatMap(findArgumentIdentifierNames);
    case 'VariableDeclarator':
      return findArgumentIdentifierNames(node.init);
    case 'AwaitExpression':
      return findArgumentIdentifierNames(node.argument);
    case 'CallExpression':
      return node.arguments.flatMap(findArgumentIdentifierNames);
    case 'Identifier':
      return [node.name];
    case 'MemberExpression':
      return findArgumentIdentifierNames(node.object);
    case 'ArrayExpression':
      return node.elements.flatMap(findArgumentIdentifierNames);
    case 'IfStatement':
      return findArgumentIdentifierNames(node.test);
    default:
      return [];
  }
}

const findVariableIdentifierNames = node => {
  switch (node.type) {
    case 'ExpressionStatement':
      return findVariableIdentifierNames(node.expression);
    case 'AssignmentExpression':
      return findVariableIdentifierNames(node.left);
    case 'MemberExpression':
      return findVariableIdentifierNames(node.object);
    case 'VariableDeclaration':
      return node.declarations.flatMap(findVariableIdentifierNames);
    case 'VariableDeclarator':
      return findVariableIdentifierNames(node.id);
    case 'Identifier':
      return [node.name];
    case 'ArrayPattern':
      return node.elements.flatMap(findVariableIdentifierNames);
    case 'ObjectPattern':
      return node.properties.flatMap(findVariableIdentifierNames);
    case 'Property':
      return findVariableIdentifierNames(node.value);
    case 'IfStatement':
      return findVariableIdentifierNames(node.consequent).concat(findVariableIdentifierNames(node.alternate || []))
    case 'BlockStatement':
      return node.body.flatMap(findVariableIdentifierNames);
    default:
      return [];
  }
}

const isSynchronised = node => {
  switch (node.type) {
    case 'AwaitExpression':
      return true;
    case 'ExpressionStatement':
      return isSynchronised(node.expression);
    case 'VariableDeclaration':
      return node.declarations.some(declarator => declarator.init.type === 'AwaitExpression');
    case 'IfStatement':
      return [node.test, node.consequent, node.alternate].some(node => node && isSynchronised(node));
    case 'BlockStatement':
      return node.body.some(isSynchronised);
    default:
      false;
  }
}

module.exports = { isSynchronised, findRelevantExpressions, findArgumentIdentifierNames, findVariableIdentifierNames};
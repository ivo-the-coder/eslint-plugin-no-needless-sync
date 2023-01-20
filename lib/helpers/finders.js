const findArgumentIdentifierNames = node => {
  return dictionary[node.type].aggregateInputs(node, findArgumentIdentifierNames);
}

const findVariableIdentifierNames = node => {
  return dictionary[node.type].aggregateOutputs(node, findVariableIdentifierNames);
}

const isSynchronised = node => {
  return dictionary[node.type].is(node, isSynchronised);
}

const dictionary = {
  'ExpressionStatement': require('./traversers/expression-statement'),
  'AwaitExpression': require('./traversers/await-expression'),
  'VariableDeclaration': require('./traversers/variable-declaration'),
  'AssignmentExpression': require('./traversers/assignment-expression'),
  'VariableDeclarator': require('./traversers/variable-declarator'),
  'CallExpression': require('./traversers/call-expression'),
  'MemberExpression': require('./traversers/member-expression'),
  'Identifier': require('./traversers/identifier'),
  'Property': require('./traversers/property'),
  'IfStatement': require('./traversers/if-statement'),
  'ArrayExpression': require('./traversers/array-expression'),
  'ArrayPattern': require('./traversers/array-pattern'),
  'ObjectPattern': require('./traversers/object-pattern'),
  'ObjectExpression': require('./traversers/object-expression'),
  'BlockStatement': require('./traversers/block-statement'),
  'Literal': require('./traversers/literal'),
  'ReturnStatement': require('./traversers/return-statement'),
}

module.exports = { isSynchronised, findArgumentIdentifierNames, findVariableIdentifierNames};
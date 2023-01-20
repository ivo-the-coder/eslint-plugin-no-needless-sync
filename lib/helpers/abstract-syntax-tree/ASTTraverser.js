
class ASTTraverser {
  static dictionary = {
    'ExpressionStatement': require('./nodes/expression-statement'),
    'AwaitExpression': require('./nodes/await-expression'),
    'VariableDeclaration': require('./nodes/variable-declaration'),
    'AssignmentExpression': require('./nodes/assignment-expression'),
    'VariableDeclarator': require('./nodes/variable-declarator'),
    'CallExpression': require('./nodes/call-expression'),
    'MemberExpression': require('./nodes/member-expression'),
    'Identifier': require('./nodes/identifier'),
    'Property': require('./nodes/property'),
    'IfStatement': require('./nodes/if-statement'),
    'ArrayExpression': require('./nodes/array-expression'),
    'ArrayPattern': require('./nodes/array-pattern'),
    'ObjectPattern': require('./nodes/object-pattern'),
    'ObjectExpression': require('./nodes/object-expression'),
    'BlockStatement': require('./nodes/block-statement'),
    'Literal': require('./nodes/literal'),
    'ReturnStatement': require('./nodes/return-statement'),
    'TryStatement': require('./nodes/try-statement'),
  }

  static get(nodeType) {
    return this.dictionary[nodeType];
  }
}

module.exports = ASTTraverser;
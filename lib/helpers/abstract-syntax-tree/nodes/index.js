class ASTNodeMap {
  static dictionary = {
    ExpressionStatement: require("./expression-statement"),
    AwaitExpression: require("./await-expression"),
    VariableDeclaration: require("./variable-declaration"),
    AssignmentExpression: require("./assignment-expression"),
    VariableDeclarator: require("./variable-declarator"),
    CallExpression: require("./call-expression"),
    MemberExpression: require("./member-expression"),
    Identifier: require("./identifier"),
    Property: require("./property"),
    IfStatement: require("./if-statement"),
    ConditionalExpression: require("./conditional-expression"),
    ArrayExpression: require("./array-expression"),
    ArrayPattern: require("./array-pattern"),
    ObjectPattern: require("./object-pattern"),
    ObjectExpression: require("./object-expression"),
    BlockStatement: require("./block-statement"),
    Literal: require("./literal"),
    ReturnStatement: require("./return-statement"),
    TryStatement: require("./try-statement"),
    ForInStatement: require("./for-in-statement"),
  };

  static get(nodeType) {
    return this.dictionary[nodeType];
  }
}

module.exports = ASTNodeMap;

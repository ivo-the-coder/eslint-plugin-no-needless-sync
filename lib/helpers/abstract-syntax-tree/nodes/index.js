const ExpressionStatement = require("./expression-statement");
const AwaitExpression = require("./await-expression");
const VariableDeclaration = require("./variable-declaration");
const AssignmentExpression = require("./assignment-expression");
const VariableDeclarator = require("./variable-declarator");
const CallExpression = require("./call-expression");
const MemberExpression = require("./member-expression");
const Identifier = require("./identifier");
const Property = require("./property");
const IfStatement = require("./if-statement");
const ConditionalExpression = require("./conditional-expression");
const ArrayExpression = require("./array-expression");
const ArrayPattern = require("./array-pattern");
const ObjectPattern = require("./object-pattern");
const ObjectExpression = require("./object-expression");
const BlockStatement = require("./block-statement");
const Literal = require("./literal");
const ReturnStatement = require("./return-statement");
const TryStatement = require("./try-statement");
const ForInStatement = require("./for-in-statement");
const ArrowFunctionExpression = require("./arrow-function-expression");
const NewExpression = require("./new-expression");
const NoopNode = require("./noop-node");

class ASTNodeMap {
  static dictionary = {
    ExpressionStatement,
    AwaitExpression,
    VariableDeclaration,
    AssignmentExpression,
    VariableDeclarator,
    CallExpression,
    MemberExpression,
    Identifier,
    Property,
    IfStatement,
    ConditionalExpression,
    ArrayExpression,
    ArrayPattern,
    ObjectPattern,
    ObjectExpression,
    BlockStatement,
    Literal,
    ReturnStatement,
    TryStatement,
    ForInStatement,
    ArrowFunctionExpression,
    NewExpression,
  };

  static get(nodeType) {
    return this.dictionary[nodeType] || NoopNode;
  }
}

module.exports = ASTNodeMap;

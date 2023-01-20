"use strict";
const { findNeedlesslySynchronisedAwaitExpressions } = require('../helpers/dependency-algorithm');

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: "A rule to detect needlessly synchronized async function calls",
      category: "Optimization",
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [],
  },
  create(context) {
    return {
      BlockStatement(node) {
        const problematicNodes = findNeedlesslySynchronisedAwaitExpressions(node);
        problematicNodes.forEach(node => {
          context.report({ node, message: 'Unneeded synchronisation, please use Promise.all()' });
        });
      }
    };
  }
};

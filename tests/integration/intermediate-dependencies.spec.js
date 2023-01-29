"use strict";

describe("needless-await", () => {
  const rule = require("../../lib/rules/needless-await"),
    RuleTester = require("eslint").RuleTester;

  RuleTester.setDefaultConfig({
    parserOptions: {
      ecmaVersion: 8,
      sourceType: "module",
    },
  });
  const ruleTester = new RuleTester();

  describe("handles an intermediate dependency", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const { data } = await fa();
          const x = data.a
          const c = await fb(x);
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async () => {
            const a = 0
            const { data } = await fa(a);
            const x = data.a; 
            const c = await fb(a);
          }
          `,
          errors: [
            { message: "Unneeded synchronisation, please use Promise.all()" },
            { message: "Unneeded synchronisation, please use Promise.all()" },
          ],
        },
      ],
    });
  });
});
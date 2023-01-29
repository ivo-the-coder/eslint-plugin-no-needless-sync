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

  describe("handles functions already in a Promise.all()", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const a = { data: 0 };
          const b = await Promise.all([fa(a.data.c), fb(a)]);
          const c = await fb(b);
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async () => {
            const a = { data: 0 };
            const b = await Promise.all([fa(a.data.c), fb(a)]);
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
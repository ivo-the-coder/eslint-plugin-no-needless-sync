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

  describe("handles variable properties of great depth", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const a = { data: 0 };
          const b = await fa(a.data.c);
          await fb(b.data.d);
        }
        `,
      ],
      invalid: [
        {
          code: `
            const f = async () => {
              const a = {data: 0};
              const b = await fa(a.data.c.g.h);
              await fb(a.data.hello.there.world);
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

  describe("handles destructuring", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const { data } = { data: 0 };
          const [{ data: dataA }, { data: dataB }] = await Promise.all([fa(a.data.c), fb(a)]);
          const c = await fb(dataB);
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async () => {
            const a = { data: 0 };
            const [{ data: dataA }, { data: dataB }] = await Promise.all([fa(a.data.c), fb(a)]);
            const c = await fb(a.data);
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
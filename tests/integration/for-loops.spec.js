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

  describe("handles a for-in statement", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const { data } = await fa();
          for (const link in data.links) {
            await fc(link);
          }
        }
        `,
        `
        const f = async () => {
          const { data } = await fa();
          for (const link in data.links) {
            await fc();
          }
        }
        `,
        `
        const f = async () => {
          const { data } = await fa();
          for (const x in xs) {
            await fc(data);
          }
        }
        `,  
        `
        const f = async () => {
          let data;
          for (const x in xs) {
            data[x] = await fc(x);
          }
          return await f(data);
        }
        `,  
      ],
      invalid: [
        {
          code: `
          const f = async () => {
            const { data } = await fa();
            for (const x in xs) {
              await fc(x);
            }
          }
          `,
          errors: [
            { message: "Unneeded synchronisation, please use Promise.all()" },
            { message: "Unneeded synchronisation, please use Promise.all()" },
          ],
        },
        {
          code: `
          const f = async () => {
            let data;
            for (const x in xs) {
              data[x] = await fc(x);
            }
            return await fa();
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

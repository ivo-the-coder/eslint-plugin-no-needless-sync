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

  describe("handles awaits in try-catch blocks", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const { data } = await fa();
          try {
            const b = await fb(data)
          } catch (e) {}
        }
        `,
        `
        const f = async () => {
          const { data } = await fa();
          try {
            const b = fb(data)
          } catch (e) {
            await fc(data);
          }
        }
        `,
        `
        const f = async () => {
          const { data } = await fa();
          try {
            const b = fb(data)
          } catch (e) {
            const b = fc(data);
          } finally {
            await fd(data)
          }
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async () => {
            const { data } = await fa();
            try {
              const b = await fb()
            } catch (e) {}
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
            const { data } = await fa();
            try {
              const b = fb();
            } catch (e) {
              const c = await fc();
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
            const { data } = await fa();
            try {
              const b = fb();
            } catch (e) {
              const c = fc();
            } finally {
              await fd();
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
            try {
              const a = fa();
            } catch (e) {
              const c = await fc();
              const b = await fb();
            }
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

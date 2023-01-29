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

  describe("handles an if-statement", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const { data } = await fa();
          if (data.a) {
            const c = await fb(x);
          }
        }
        `,
        `
        const f = async () => {
          const { data } = await fa();
          if (data.a) {
            if (data.b) {
              const c = await fb(x);
            }
          }
        }
        `,
        `
        const f = async () => {
          const { data } = await fa();
          if (b) {
            const c = fb(x);
          }
        }
        `,
        `
        const f = async () => {
          const { data } = await fa();
          if (b) {
            fb(x);
          }
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async (b) => {
            const { data } = await fa();
            if (b) {
              const c = await fb(x);
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
          const f = async (b) => {
            const { data } = await fa();
            if (b) {
              if (b.c) {
                const c = await fb(x);
              }
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
          const f = async (b) => {
            const { data } = await fa();
            if (await fb(x)) {
              return null;
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
          const f = async (a, b, data) => {
            if (a) {
              await fa(data);
            }
            if (b) {
              await fb(data);
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

  describe("handles ternaries", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const { data } = await fa();
          const c = data.a ? await fb(x) : null;
        }
        `,
        `
        const f = async () => {
          const { data } = await fa();
          const c = data.a ? data.b ? await fb(x): null : null
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async (b) => {
            const { data } = await fa();
            const c = b ? await fb(x) : null;
          }
          `,
          errors: [
            { message: "Unneeded synchronisation, please use Promise.all()" },
            { message: "Unneeded synchronisation, please use Promise.all()" },
          ],
        },
        {
          code: `
          const f = async (b) => {
            const { data } = await fa();
            const c = a ? b ? await fb(x): null : null;
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
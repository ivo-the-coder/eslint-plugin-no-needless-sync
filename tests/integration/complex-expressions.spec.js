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

  describe("handles await in array expressions", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const { data } = await fa();
          const b = [await fb(data)];
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async () => {
            const { data } = await fa();
            const b = [await fb()];
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

  describe("handles await in callee of call expressions", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const { data } = await fa();
          const b = (await fb(data))();
        }
        `,
        `
        const f = async () => {
          const { data } = await fa();
          const b = fb(await fc(data))();
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async () => {
            const { data } = await fa();
            const b = (await fb())();
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
            const b = fb(await fc())();
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

  describe("handles assignment expressions", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          let a = await fa();
          a = await fb(a);
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async () => {
            let a = await fa();
            a = await fb();
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
  describe("handles awaits in member expressions", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const a = await fa();
          c[await fb(a)] = b;
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async () => {
            const a = await fa();
            c[await fb()] = b;
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
            const a = await fa();
            (await fc())['d']= b;
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

  describe("handles await in object expressions", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const a = await fa();
          c = { c: await fb(a) };
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async () => {
            const a = await fa();
            c = { c: await fb() };
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
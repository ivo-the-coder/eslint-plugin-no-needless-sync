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

  describe("handles a simple case", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        async function f() {
          const a = await fa();
          await fb(a);
        }
        `,
      ],
      invalid: [
        {
          code: `
          async function f() {
            await fa();
            await fb();
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
  describe("handles an arrow function simple", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const a = await fa();
          await fb(a);
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async () => {
            await fa();
            await fb();
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
  describe("handles a simple same argument case", () => {
    ruleTester.run("needless-await", rule, {
      valid: [],
      invalid: [
        {
          code: `
          const f = async () => {
            const a = 0;
            await fa(a);
            await fb(a);
            await fc(a);
          }
          `,
          errors: [
            { message: "Unneeded synchronisation, please use Promise.all()" },
            { message: "Unneeded synchronisation, please use Promise.all()" },
            { message: "Unneeded synchronisation, please use Promise.all()" },
          ],
        },
      ],
    });
  });

  describe("handles variables being unused by other awaits", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const a = 0;
          const b = await fa(a);
          await fb(b);
        }
        `,
      ],
      invalid: [
        {
          code: `
            const f = async () => {
              const a = 0;
              const b = await fa(a);
              await fb(a);
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

  describe("handles many variables being unused by other awaits", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const a = 0;
          const b = await fa(a);
          const c = await fb(b);
          const d = await fc(c);
        }
        `,
      ],
      invalid: [
        {
          code: `
            const f = async () => {
              const a = 0;
              const b = await fa(a);
              await fb(b, a);
              const c = await fc(b);
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
              const a = 0;
              const b = await fa(a);
              const c = await fb(b, a);
              const d = await fc(a, b);
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

  describe("handles return statements with await", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const { data } = await fa();
          return await fb(data);
        }
        `,
        `
        const f = async () => {
          const { data } = await fa();
          return;
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async () => {
            const { data } = await fa();
            return await fb();
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
            await fb();
            return;
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

  describe("handles instantiating objects from class", () => {
    ruleTester.run("needless-await", rule, {
      valid: [
        `
        const f = async () => {
          const { data } = await fa();
          const dataParser = new DataParser(data);
          await fb(dataParser.parse());
        }
        `,
        `
        const f = async () => {
          const dataParser = new DataParser(await fa());
          await fb(dataParser.parse());
        }
        `,
      ],
      invalid: [
        {
          code: `
          const f = async () => {
            const { data } = await fa();
            const dataPoster = new DataPoster();
            await dataPoster.post();
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
            const dataPoster = new DataPoster(await fc());
            await dataPoster.post(data);
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

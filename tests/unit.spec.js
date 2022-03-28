"use strict";

describe('needless-await-synchronisation', () => {
  const rule = require("../lib/rules/needless-await-synchronisation"),
  RuleTester = require("eslint").RuleTester;

  RuleTester.setDefaultConfig({
    parserOptions: {
      ecmaVersion: 8,
      sourceType: "module"
    }
  });
  const ruleTester = new RuleTester();

  describe('handles a simple case', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
      valid: [
        `
        async function f() {
          const a = await fa();
          await fb(a);
        }
        `
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        }
      ],
    });
  })
  describe('handles an arrow function simple', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
      valid: [
        `
        const f = async () => {
          const a = await fa();
          await fb(a);
        }
        `
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        }
      ],
    });
  })
  describe('handles a simple same argument case', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        },
      ],
    });
  })

  describe('handles variables being unused by other awaits', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
      valid: [
        `
        const f = async () => {
          const a = 0;
          const b = await fa(a);
          await fb(b);
        }
        `
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        },
        
      ]
    });
  });

  describe('handles many variables being unused by other awaits', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
      valid: [
        `
        const f = async () => {
          const a = 0;
          const b = await fa(a);
          const c = await fb(b);
          const d = await fc(c);
        }
        `
      ],
      invalid: [
        {
          code:`
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
          code:`
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
        }
      ]
    });
  });
  describe('handles variable properties of great depth', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
      valid: [
         `
        const f = async () => {
          const a = { data: 0 };
          const b = await fa(a.data.c);
          await fb(b.data.d);
        }
        `
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        },
      ]
    });
  });
  describe('handles functions already in a Promise.all()', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
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
          code:`
          const f = async () => {
            const a = { data: 0 };
            const b = await Promise.all([fa(a.data.c), fb(a)]);
            const c = await fb(a);
          }
          `,
          errors: [
            { message: "Unneeded synchronisation, please use Promise.all()" },
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        },
      ]
    });
  });
  describe('handles destructuring', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
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
          code:`
          const f = async () => {
            const a = { data: 0 };
            const [{ data: dataA }, { data: dataB }] = await Promise.all([fa(a.data.c), fb(a)]);
            const c = await fb(a.data);
          }
          `,
          errors: [
            { message: "Unneeded synchronisation, please use Promise.all()" },
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        },
      ]
    });
  });
})
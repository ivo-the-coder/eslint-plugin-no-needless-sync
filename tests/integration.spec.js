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
          code: `
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
          code: `
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

  describe('handles an intermediate dependency', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        },
      ]
    });
  });

  describe('handles an if-statement', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        },
      ]
    });
  });

  describe('handles return statements with await', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
      valid: [
        `
        const f = async () => {
          const { data } = await fa();
          return await fb(data);
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        },
      ]
    });
  });

  describe('handles await in array expressions', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        },
      ]
    });
  });

  describe('handles await in callee of call expressions', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        },
      ]
    });
  });

  describe('handles awaits in try-catch blocks', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        },
      ]
    });
  });

  describe('handles assignment expressions', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        },
      ]
    });
  });
  describe('handles awaits in member expressions', () => {
    ruleTester.run("needless-await-synchronisation", rule, {
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
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
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        },
      ]
    });
  });
});
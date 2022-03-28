"use strict";
const fs = require('fs');

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

  describe('eligibility endpoint', () => {
    const eligibilityEndpointCode = fs.readFileSync('./tests/fixtures/eligibility-endpoint.txt', 'utf-8');
    ruleTester.run("needless-await-synchronisation", rule, {
      valid: [

      ],
      invalid: [
        {
          code: eligibilityEndpointCode,
          errors: [
            { message: "Unneeded synchronisation, please use Promise.all()" },
            { message: "Unneeded synchronisation, please use Promise.all()" },
            { message: "Unneeded synchronisation, please use Promise.all()" }
          ],
        }
      ]
    });
  });
});
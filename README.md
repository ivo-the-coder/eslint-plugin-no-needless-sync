# eslint-plugin-needless-await-synchronisation

A plugin to detect needlessly synchronised async function calls.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-needless-await-synchronisation`:

```sh
npm install eslint-plugin-needless-await-synchronisation --save-dev
```

## Usage

Add `needless-await-synchronisation` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["needless-await-synchronisation"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "needless-await-synchronisation/rule-name": 2
  }
}
```

## Supported Rules

- Fill in provided rules here

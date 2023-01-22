# eslint-plugin-no-needless-sync

A plugin to detect needlessly synchronised async function calls.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-no-needless-sync`:

```sh
npm install eslint-plugin-no-needless-sync --save-dev
```

## Usage

Add `no-needless-sync` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["no-needless-sync"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "no-needless-sync/needless-await": 2
  }
}
```

## Examples

### Bad
```javascript
const a = await getSomething();
const b = await getOther();
```

### Good
```javascript
const [a, b] = await Promise.all([getSomething(), getOther()]);
```
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

```javascript
// Note here b depends on the output of getSomething, so that's fine
const a = await getSomething();
const b = await getOther(a);
```

### Bad
```javascript
// Even though getSomething and getOther are parallelised,
// getFinal can also be included in the Promise.all call
const [a, b] = await Promise.all([getSomething(), getOther()]);
const c = await getFinal();
```

### Good
```javascript
const [a, b, c] = await Promise.all([getSomething(), getOther(), getFinal()]);
```

## Support for more complex code
The rule can handle cases such as array and object assignments, dependencies inherited through the test clause of an if-statement, try-catch blocks. You can see explicitly supported cases in the [integration spec](https://github.com/ivo-the-coder/eslint-plugin-no-needless-sync/blob/master/tests/integration.spec.js).
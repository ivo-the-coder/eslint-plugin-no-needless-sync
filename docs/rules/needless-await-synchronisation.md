# A rule to detect needlessly synchronized async functions (needless-await-synchronisation)

Please describe the origin of the rule here.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

Here calls to the functions are not dependent, so awaiting each can have an
impact on the latency of the code.

```js
const a = await fa();
const b = await fb();
```

Examples of **correct** code for this rule:

Here the second function depends on the first one so the synchronisation
cannot be avoided.

```js
const a = await fa();
const b = await fb(a);
```

Here the functions don't depend on each other and they are called within a
`Promise.all` call.

```js
const [a, b] = await Promise.all([fa(), fb()]);
```

## When Not To Use It

If you have implicit dependency between asynchronous function calls, you
should ignore this rule. For example taking out a distributed lock.

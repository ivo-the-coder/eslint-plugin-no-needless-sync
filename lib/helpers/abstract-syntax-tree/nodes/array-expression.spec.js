const ArrayExpression = require("./array-expression");

describe("ArrayExpression", () => {
  describe("isSynchronised", () => {
    test("return true if the predicate isSynchronised true for any of the elements", () => {
      const node = { elements: [1, 2, 3] };
      const predicate = jest.fn((x) => x % 2 == 0);
      expect(ArrayExpression.isSynchronised(node, predicate)).toBe(true);
    });
    test("return false if the predicate isSynchronised true for none of the elements", () => {
      const node = { elements: [1, 3, 5] };
      const predicate = jest.fn((x) => x % 2 == 0);
      expect(ArrayExpression.isSynchronised(node, predicate)).toBe(false);
    });
  });

  describe("aggregateInputs", () => {
    test("returns the aggregator applied to all elements", () => {
      const node = { elements: ["a", "b", "c"] };
      const aggregator = jest.fn((el) => el);

      const result = ArrayExpression.aggregateInputs(node, aggregator);
      expect(aggregator).toHaveBeenCalledTimes(3);
      expect(result).toEqual(["a", "b", "c"]);
    });
  });

  describe("aggregateOutputs", () => {
    test("returns empty list", () => {
      const result = ArrayExpression.aggregateOutputs();
      expect(result).toEqual([]);
    });
  });
});

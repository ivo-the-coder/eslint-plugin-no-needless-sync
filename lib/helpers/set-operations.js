const intersection = (setA, setB) => {
  const result = new Set();
  for (let element of setB) {
    if (setA.has(element)) {
      result.add(element);
    }
  }
  return result;
};

function union(setA, setB) {
  let result = new Set(setA);
  for (let elem of setB) {
    result.add(elem);
  }
  return result;
}

function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

function isEqual(setA, setB) {
  return isSuperset(setA, setB) && isSuperset(setB, setA);
}

module.exports = {
  intersection,
  union,
  isEqual,
};

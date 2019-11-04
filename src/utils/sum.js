const numbers = [1, 4, 5, 1, 2, 10, 12, 15, 11, 13, 11, 5];

const oddSum = arr => {
  return arr.filter(x => x % 2 != 0).reduce((s, x) => s + x, 0);
};

/** 
 * I'm confuse here so i made 2 way for 'Sum of all unique odd number in array'
 */
const oddUniqSum = arr => {
  return oddSum([...new Set(arr)]);
};

const sumUniqOdd2 = arr => {
  return oddSum(arr.filter((x, i) => !arr.find((y, j) => x == y && i != j)));
};

console.log(oddSum(numbers));
console.log(oddUniqSum(numbers));
console.log(sumUniqOdd2(numbers));

// add whatever parameters you deem necessary
function sameFrequency(num1, num2) {
  // turn numbers into string
  let num1Str = String(num1);
  let num2Str = String(num2);
  // error if length not equal
  if (num1Str.length !== num2Str.length) return false;
  // create a new map for num 1
  const num1Map = new Map();
  //   store all num 1 digit into map
  for (let i of num1Str) {
    let amt = num1Map.get(i) || 0;
    num1Map.set(i, amt + 1);
  }
  //   loop to check if have same freq in num 2
  for (let i of num2Str) {
    let numAmt = num1Map.get(i);
    if (numAmt - 1 < 0 || numAmt === undefined) return false;
    num1Map.set(i, numAmt - 1);
  }
  return true;
}

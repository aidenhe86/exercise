// add whatever parameters you deem necessary
function countPairs(arr, num) {
  // create a new map and count
  const numMap = new Map();
  let count = 0;

  //   loop array
  for (let i of arr) {
    // count++ if map already stored the paird number
    if (numMap.has(num - i)) count++;
    // else store the current number into the map
    else numMap.set(i, i);
  }
  return count;
}

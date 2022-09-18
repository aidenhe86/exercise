// add whatever parameters you deem necessary
function longestFall(arr) {
  // special case that is empty array or contain 1 number
  if (arr.length === 0) return 0;
  if (arr.length === 1) return 1;

  let count = 1;
  let longest = 1;
  for (let i = 1; i <= arr.length - 1; i++) {
    // if decreasing, count ++
    if (arr[i - 1] > arr[i]) count++;
    // if increasing reset count
    else if (arr[i - 1] <= arr[i]) count = 1;
    // renew the longest number
    // longest = Math.max(longest, count);
    longest = longest > count ? longest : count;
  }
  return longest;
}

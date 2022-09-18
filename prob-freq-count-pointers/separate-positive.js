// add whatever parameters you deem necessary
function separatePositive(arr) {
  // define start point ,end point and temp num holder
  let start = 0;
  let end = arr.length - 1;
  let num;
  while (start < end) {
    // if can switch, switch position
    if (arr[start] < 0 && arr[end] > 0) {
      num = arr[start];
      arr[start] = arr[end];
      arr[end] = num;
    }
    // if can't switch, move start point or end point
    else if (arr[start] > 0) start++;
    else end--;
  }
  return arr;
}

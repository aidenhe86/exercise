function sortedFrequency(arr, val) {
  let first = findFirst(arr, val);
  //   if not found return -1
  if (first === -1) return first;
  let last = findLast(arr, val);
  return last - first + 1;
}

function findFirst(arr, val, left = 0, right = arr.length - 1) {
  if (left <= right) {
    let mid = Math.floor((left + right) / 2);
    // found the first value
    if ((mid === 0 || arr[mid - 1] < val) && arr[mid] === val) {
      return mid;
    }
    // middle value is lesser, reset left edge
    else if (arr[mid] < val) {
      return findFirst(arr, val, mid + 1, right);
    }
    // middle value greater than the given number, reset right edge
    return findFirst(arr, val, left, mid - 1);
  }
  return -1;
}

function findLast(arr, val, left = 0, right = arr.length - 1) {
  if (left <= right) {
    let mid = Math.floor((left + right) / 2);
    // found the last value
    if ((mid === arr.length - 1 || val < arr[mid + 1]) && arr[mid] === val) {
      return mid;
    }
    // check if mid value exceed the number, if yes then move back.
    else if (arr[mid] > val) {
      return findLast(arr, val, left, mid - 1);
    }
    return findLast(arr, val, mid + 1, right);
  }
  return -1;
}

module.exports = sortedFrequency;

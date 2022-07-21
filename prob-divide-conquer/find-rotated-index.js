function findRotatedIndex(arr, num) {
  let pivot = findPivot(arr);

  //   if number is in left side of pivot point
  if (pivot > 0 && arr[0] <= num && arr[pivot - 1] >= num) {
    return binarySearch(arr, num, 0, pivot - 1);
  }
  //   if number is in the right side of pivot point
  else {
    return binarySearch(arr, num, pivot, arr.length - 1);
  }
}

// find the point where array start to rotate
function findPivot(arr) {
  let start = 0;
  let end = arr.length - 1;
  // if array only have 1 number or rotation start at beginning, return 0
  if (arr.length === 1 || arr[start] < arr[end - 1]) return 0;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    // return pivot point
    if (arr[mid] < arr[mid - 1]) return mid;
    else if (arr[mid] > arr[mid + 1]) return mid + 1;
    // if start < mid, pivot point is on the right side of mid, reset left edge
    else if (arr[start] <= arr[mid]) {
      start = mid + 1;
    } else {
      // reset right edge
      end = mid - 1;
    }
  }
}

function binarySearch(arr, num, left, right) {
  if (left <= right) {
    let mid = Math.floor((left + right) / 2);
    // return found value index
    if (arr[mid] === num) return mid;
    else if (arr[mid] < num) {
      return binarySearch(arr, num, mid + 1, right);
    } else {
      return binarySearch(arr, num, left, mid - 1);
    }
  }
  //   if not found return -1
  return -1;
}

module.exports = findRotatedIndex;

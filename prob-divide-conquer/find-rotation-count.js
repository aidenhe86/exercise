// similar to find index of pivot point
function findRotationCount(arr, start = 0, end = arr.length - 1) {
  // if array only have 1 number or rotation start at beginning, return 0
  if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;

  if (start <= end) {
    let mid = Math.floor((start + end) / 2);
    // return found pivot point
    if (arr[mid] < arr[mid - 1]) return mid;
    else if (arr[mid] > arr[mid + 1]) return mid + 1;
    // reset boundary
    else if (arr[start] <= arr[mid]) {
      return findRotationCount(arr, mid + 1, end);
    } else {
      return findRotationCount(arr, start, mid - 1);
    }
  }
}

module.exports = findRotationCount;

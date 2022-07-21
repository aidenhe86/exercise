function findFloor(arr, num, start = 0, end = arr.length - 1) {
  if (start <= end) {
    let mid = Math.floor((start + end) / 2);
    // return found floor
    if ((mid === arr.length - 1 || num < arr[mid + 1]) && arr[mid] <= num) {
      return arr[mid];
    }
    // reset boundary
    else if (arr[mid] > num) {
      return findFloor(arr, num, start, mid - 1);
    } else {
      return findFloor(arr, num, mid + 1, end);
    }
  }
  // if not found, return -1
  return -1;
}

module.exports = findFloor;

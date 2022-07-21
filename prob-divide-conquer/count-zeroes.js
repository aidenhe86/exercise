// function countZeroes(arr) {
//   let leftIdx = 0;
//   let rightIdx = arr.length - 1;
//   while (leftIdx <= rightIdx) {
//     let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
//     let middleVal = arr[middleIdx];
//     let middleLeftVal = arr[middleIdx - 1];
//     let middleRightVal = arr[middleIdx + 1];

//     // condition to keep searching the edge of 1 and 0
//     if (middleVal === 0 && middleLeftVal !== 1) {
//       rightIdx = middleIdx - 1;
//     } else if (middleVal === 1 && middleRightVal !== 0) {
//       leftIdx = middleIdx + 1;
//     }

//     // case where middle value is 1 and right value is 0, delete 1
//     if (middleVal === 1 && middleRightVal === 0) {
//       return arr.length - middleIdx - 1;
//     }
//     // case where middle value is 0 and right value is 1 or array does not have 1, not delete 1
//     else if (
//       (middleVal === 0 && middleLeftVal === 1) ||
//       middleLeftVal === undefined
//     ) {
//       return arr.length - middleIdx;
//     }
//   }
//   //   array does not contain 0, return 0
//   return 0;
// }

function countZeroes(arr) {
  let firstZero = findFirstZero(arr);
  //   if zero not found, return 0
  if (firstZero === -1) return 0;
  return arr.length - firstZero;
}

function findFirstZero(arr, left = 0, right = arr.length - 1) {
  if (left <= right) {
    let mid = Math.floor((left + right) / 2);
    // found the first zero
    if ((mid === 0 || arr[mid - 1] === 1) && arr[mid] === 0) {
      return mid;
    }
    // middle value is 1, reset left edge
    else if (arr[mid] === 1) {
      return findFirstZero(arr, mid + 1, right);
    }
    // middle value is 0 but not first zero
    return findFirstZero(arr, left, mid - 1);
  }

  //   if no zero found, return -1
  return -1;
}

module.exports = countZeroes;

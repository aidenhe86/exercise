// add whatever parameters you deem necessary
function pivotIndex(arr) {
  let rightSum = arr.reduce((a, b) => a + b, 0);
  let leftSum = 0;
  //   loop
  for (let i = 0; i < arr.length; i++) {
    leftSum += arr[i];
    if (leftSum === rightSum) {
      return i;
    }
    rightSum -= arr[i];
  }
  return -1;
}

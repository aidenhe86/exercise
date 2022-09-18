// add whatever parameters you deem necessary
function isSubsequence(str1, str2) {
  if (str1.length > str2.length) return false;
  //   create start point for string 1
  let point = 0;
  //   for loop for string 2
  for (let i = 0; i < str2.length; i++) {
    // if character found, add 1 to point
    if (str1[point] === str2[i]) {
      point++;
    }
    // check if found all character in string 1, if yes return true
    if (point === str1.length) return true;
  }
  //   if cannot find the sequence, return false
  return false;
}

console.log(isSubsequence("hello", "hello world"));

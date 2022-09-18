// add whatever parameters you deem necessary
function constructNote(msg, letters) {
  // message must be equal or less than letters length
  if (msg.length > letters.length) return false;
  //   create new map for letters
  const lettersMap = new Map();
  //   save letters into maps
  for (let char of letters) {
    let key = lettersMap.get(char) || 0;
    lettersMap.set(char, key + 1);
  }
  //   check if message char is in letters
  for (let char of msg) {
    let charAmt = lettersMap.get(char);
    if (charAmt - 1 < 0 || charAmt === undefined) return false;
    lettersMap.set(char, charAmt - 1);
  }
  return true;
}

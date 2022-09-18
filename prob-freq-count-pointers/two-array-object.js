// add whatever parameters you deem necessary
function twoArrayObject(key, val) {
  const obj = {};
  for (let i = 0; i < key.length; i++) {
    obj[key[i]] = val[i] || null;
  }
  return obj;
}

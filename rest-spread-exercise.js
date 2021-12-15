//filterOutOdds
const filterOutOdds = (...nums) => nums.filter( num => num % 2 === 0);

//findMin
const findMin = (...nums) => nums.reduce((pre,cur) => pre > cur ? cur : pre)

//mergeObjects
const mergeObjects = (obj1, obj2) => ({...obj1,...obj2});

//doubleAndReturnArgs
const doubleAndReturnArgs = (arr,...nums) => [...arr, ...nums.map(num => num * 2)]


//Slice and Dice

/** remove a random element in the items array
and return a new array without that item. */
const removeRandom = (items) =>{
    let ranDelete = Math.floor(Math.random() * items.length);
    return [...items.slice(0,ranDelete),...items.slice(ranDelete + 1)]
}


/** Return a new array with every item in array1 and array2. */
const extend = (array1, array2) => [...array1,...array2];

/** Return a new object with all the keys and values
from obj and a new key/value pair */
const addKeyVal = (obj, key, val) => {
    const newObj = {...obj};
    newObj[key] = val;
    return newObj;
}

/** Return a new object with a key removed. */
const removeKey = (obj, key) => {
    const newObj = {...obj};
    delete newObj[key];
    return newObj;
}

/** Combine two objects and return a new object. */
const combine = (obj1, obj2) => ({...obj1 , ...obj2})


/** Return a new object with a modified key and value. */
function update(obj, key, val) {
    const newObj = {...obj};
    newObj[key] = val;
    return newObj;
}
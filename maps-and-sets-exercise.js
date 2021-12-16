/*
//Question 1
// Return  {1,2,3,4}

//Question 2
//Return "ref"

//Question 3
//m will look like 
    0: {Array(3) => true}
    1: {Array(3) => false}
*/

//hasDuplicate
const hasDuplicate = (arr) => new Set(arr).size !== arr.length;

//vowelCount
function vowelCount(str){
    const vowelMap = new Map();
    const vowel = `aeiou`;
    for(let char of str.toLowerCase()){
        if(vowel.includes(char)){
            if(vowelMap.has(char)){
                vowelMap.set(char, vowelMap.get(char) + 1)
            }
            else{
                vowelMap.set(char, 1)
            }
        }
    }
    return vowelMap;
}
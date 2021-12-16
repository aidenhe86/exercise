//Object Destructuring 1
let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
let {numPlanets, yearNeptuneDiscovered} = facts;

console.log(numPlanets); // return 8
console.log(yearNeptuneDiscovered); //  return 1846

//Object Destructuring 2
let planetFacts = {
    numPlanets: 8,
    yearNeptuneDiscovered: 1846,
    yearMarsDiscovered: 1659
  };
  
  let {numPlanets, ...discoveryYears} = planetFacts;
  
  console.log(discoveryYears); // return an object {yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659}

//Object Destructuring 3
  function getUserData({firstName, favoriteColor="green"}){
    return `Your name is ${firstName} and you like ${favoriteColor}`;
  }
  
  getUserData({firstName: "Alejandro", favoriteColor: "purple"}) // return `Your name is Alejandro and you like purple`
  getUserData({firstName: "Melissa"}) // return `Your name is Melissa and you like green`
  getUserData({}) // return `Your name is undefined and you like green`

//Array Destructuring 1
let [first, second, third] = ["Maya", "Marisa", "Chi"];

console.log(first); // return Maya
console.log(second); // return Marisa
console.log(third); // return Chi

//Array Destructuring 2
let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
    "Raindrops on roses",
    "whiskers on kittens",
    "Bright copper kettles",
    "warm woolen mittens",
    "Brown paper packages tied up with strings"
  ]
  
  console.log(raindrops); // return Raindrops on roses
  console.log(whiskers); // return whiskers on kittens
  console.log(aFewOfMyFavoriteThings); // return an array ["Bright copper kettles","warm woolen mittens","Brown paper packages tied up with strings"]

//Array Destructuring 3
let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]]

console.log(numbers) // return [10,30,20]

//ES2015 Object Destructuring
const obj = {
    numbers:{
        a : 1,
        b : 2
    }
}
const {a , b} = obj[`numbers`];

//ES2015 One-Line Array Swap with Destructuring
const arr = [1,2];
[arr[0],[1]] = [arr[1],arr[0]];

//raceResults()
const raceResults = ([first,second,third, ...rest]) => ({first,second,third,rest})


//createInstructor
const createInstructor = (firstName, lastName) => {
      firstName,
      lastName
}

//Computed
let favoriteNumber = 42;

const instructor = {
    firstName: "Colt",
    [favoriteNumber] : "That is my favorite!",
}

//Object Methods
const instructor = {
    firstName: "Colt",
    sayHi(){
      return "Hi!";
    },
    sayBye(){
      return this.firstName + " says bye!";
    }
}

//createAnimal function
const createAnimal = (species, verb, noise) => ({
    species,
    [verb](){
        return noise
    }
})
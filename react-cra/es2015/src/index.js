import { choice, remove } from "./helpers";
import foods from "./foods";

let ranSelect = choice(foods);
console.log(`I'd like one ${ranSelect}, please.`);
console.log(`Here you go: ${ranSelect}.`);
console.log(`Delicious! May I have another?.`);
remove(foods, ranSelect);
console.log(`I'm sorry, we're all out. We have ${foods.length} left`);

/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = new Map;
    for(let i = 0; i < this.words.length; i++){
      // locate the current word and exist word
      let word = this.words[i];
      let next = this.words[i+1] || null;

      // input new word if has word, else create it in chains.
      if(chains.has(word)){
        chains.get(word).push(next);
      }else{
        chains.set(word,[next]);
      }
      this.chains = chains;
    }
  }

  /** return random text from chains */
  static choice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  makeText(numWords = 100) {
    // select a random word in chains
    // user array.from to store keys as array
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // output new words until reach ends
    while(out.length < numWords && key !== null){
      out.push(key);
      // randomly select next word base on current word
      key = MarkovMachine.choice(this.chains.get(key));
    }

    // output the words
    return out.join(" ")
  }
}

// make class to exportable
module.exports = {
  MarkovMachine,
};

// let mm = new MarkovMachine("I would not eat green eggs and ham.");

// console.log(mm.makeText());

// console.log(mm.makeText(numWords=50));


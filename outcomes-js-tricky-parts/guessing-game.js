function guessingGame() {
  const CorrectNum = Math.floor(Math.random() * 100);
  let end = false;
  let guesses = 0;

  return function game(guess) {
    if (end) return "The game is over, you already won!";
    guesses++;
    if (guess < CorrectNum) return `${guess} is too low!`;
    else if (guess > CorrectNum) return `${guess} is too high!`;
    else {
      end = true;
      return `You win! You found ${guess} in ${guesses} guesses.`;
    }
  };
}

module.exports = { guessingGame };

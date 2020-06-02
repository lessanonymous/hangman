const hangMan = {
  wordList: [
    "vis",
    "toeter",
    "developer",
    "telefoon",
    "moeder",
    "snoer",
    "geeuw",
  ],
  maxAmount: 5,
  word: [],
  guesses: [],
  gameOver: false,
  tries: 0,
  test: false,
  pickRandomWordFromWordList() {
    const randomIndex = Math.floor(Math.random() * this.wordList.length);
    return this.wordList[randomIndex];
  },
  wordHasBeenGuessed() {
    const remainingLetters = this.word.filter(
      (letter) => !this.guesses.includes(letter)
    );
    return !remainingLetters.length;
  },
  setInputFieldToEmptyString() {
    document.querySelector("input").value = "";
  },
  displayWinningMessage() {
    if (!this.test) document.querySelector(".win").style.display = "block";
    this.gameOver = true;
  },
  displayLosingMessage() {
    if (!this.test) document.querySelector(".lose").style.display = "block";
    this.gameOver = true;
  },
  addWordtoLoseMessage() {
    document.querySelector(".lose p span").innerHTML = `${this.word.join("")}`;
  },
  updateTries() {
    document.querySelector(".lives span").innerHTML = 5 - this.tries;
  },
  updateWrongGuesses() {
    const wrongGuesses = this.guesses.filter(
      (letter) => !this.word.includes(letter)
    );
    if (!this.test)
      document.querySelector(".guessed_letters").innerHTML = wrongGuesses.join(
        " "
      );
    return wrongGuesses;
  },
  updateTheWord() {
    const display = this.word.map((letter) =>
      this.guesses.includes(letter) ? letter : "_"
    );
    if (!this.test)
      document.querySelector(".the_word").innerHTML = display.join(" ");
    return display;
  },
  guessLetter() {
    if (this.gameOver) return false;
    if (!this.test) this.guess = document.querySelector("input").value;
    if (!this.test) this.setInputFieldToEmptyString();
    if (this.guesses.includes(this.guess) || this.guess === "") return false;
    this.guesses.push(this.guess);
    if (!this.word.includes(this.guess)) {
      this.tries++;
      if (!this.test)
        document.querySelector(".lives span").innerHTML = 5 - this.tries;
      this.updateWrongGuesses();
    } else {
      this.updateTheWord();
    }
    if (this.wordHasBeenGuessed()) {
      this.displayWinningMessage();
    } else if (this.tries === 5) {
      this.displayLosingMessage();
    }
    return true;
  },
  start() {
    this.gameOver = false;
    if (!this.test) document.querySelector(".win").style.display = "none";
    if (!this.test) document.querySelector(".lose").style.display = "none";
    if (!this.test) document.querySelector("input").value = "";
    this.word = this.pickRandomWordFromWordList().split("");
    if (!this.test) this.addWordtoLoseMessage();
    this.tries = 0;
    if (!this.test) this.updateTries();
    this.guesses = [];
    this.updateTheWord();
    this.updateWrongGuesses();
  },
};
module.exports = hangMan;

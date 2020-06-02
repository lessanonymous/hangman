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
  winTheGame() {
    document.querySelector(".win").style.display = "block";
    this.gameOver = true;
  },
  loseTheGame() {
    // when losing 3 times, this has to happen
    document.querySelector(".lose").style.display = "block";
    this.gameOver = true;
  },
  displayWord() {
    document.querySelector(".lose p span").innerHTML = `${this.word.join("")}`;
  },
  displayTries() {
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
      inputLetterWords.includes(letter) ? letter : "_"
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
      this.winTheGame();
    } else if (this.tries === 5) {
      this.loseTheGame();
    }
    return true;
  },
  start() {
    this.gameOver = false;
    document.querySelector(".win").style.display = "none";
    document.querySelector(".lose").style.display = "none";
    document.querySelector("input").value = "";

    this.word = this.pickRandomWordFromWordList().split("");
    document.querySelector(".lose p span").innerHTML = `${this.word.join("")}`;

    this.tries = 0;
    document.querySelector(".lives span").innerHTML = 5;

    this.guesses = [];
    this.updateTheWord();
    this.updateWrongGuesses();
  },
};
module.exports = hangMan;

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
  word: "",
  inputs: [],
  gameOver: false,
  tries: 0,
  wordpicker(list) {
    this.word = "sinaasappel";
    let index = Math.floor(Math.random() * list.length);
    const x = list;
    console.log("wat ben ik?", this.word);
    return x[index];
  },
  wordGuessed(word, inputs) {
    // remove all letters from word that are already guessed
    // We can do this with a for loop to.
    let remaining = word.filter(function (letter) {
      // If the letter is guessed return true (we want to remove that right away)
      return !inputs.includes(letter);
    });
    // If we have letters left, right?
    return remaining.length === 0;
  },
  clean() {
    document.querySelector("input").value = "";
  },
  winTheGame() {
    document.querySelector(".win").style.display = "block";
    this.gameOver = true;
  },
  lose4() {
    // when losing 3 times, this has to happen
    document.querySelector(".lose").style.display = "block";
    this.gameOver = true;
  },
  spanTheWord1(word) {
    document.querySelector(".lose p span").innerHTML = `"${word.join("")}"`;
  },
  updateTriesDisplay(tries) {
    document.querySelector(".lives span").innerHTML = 5 - tries;
  },
  letters(word, inputs) {
    let wrongLetters = inputs.filter(function (letter) {
      // If the letter is in the word return.... false/true (we want to remove that then)
      return !word.includes(letter);
    });
    document.querySelector(".guessed_letters").innerHTML = wrongLetters.join(
      " "
    );
  },
  theWord(word, inputLetterWords) {
    let display = word.map(function (letter) {
      if (inputLetterWords.includes(letter)) {
        return letter;
      } else {
        return "_";
      }
    });
    document.querySelector(".the_word").innerHTML = display.join(" ");
  },
  guessLetter() {
    if (this.gameOver) {
      return;
    }
    const input1 = document.querySelector("input").value;
    document.querySelector("input").value = "";

    console.log(this);
    if (this.inputs.includes(input1) || input1 === "") {
      return;
    }

    if (!this.word.includes(input1)) {
      this.tries++;
      document.querySelector(".lives span").innerHTML = 5 - this.tries;
    }

    this.inputs.push(input1);
    this.theWord(this.word, this.inputs);
    this.letters(this.word, this.inputs);

    if (this.wordGuessed(this.word, this.inputs)) {
      this.winTheGame();
    } else if (this.tries >= 5) {
      this.lose4();
    }
  },
  getThePlayer(player) {
    let play = document.getElementById("player1");
    play = play + "We are about to start the game";
    return play;
  },
  beginTheGameWithPlayer(player1) {
    this.getThePlayer(player1);
    this.gameOver = false;
    document.querySelector(".win").style.display = "none";
    document.querySelector(".lose").style.display = "none";
    document.querySelector("input").value = "";

    this.word = this.wordpicker(this.wordList).split("");
    document.querySelector(".lose p span").innerHTML = `"${this.word.join(
      ""
    )}"`;

    this.tries = 0;
    document.querySelector(".lives span").innerHTML = 5;

    this.inputs = [];
    this.theWord(this.word, this.inputs);
    this.letters(this.word, this.inputs);
  },
};

export default hangMan;

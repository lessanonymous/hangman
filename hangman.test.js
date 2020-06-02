const hangMan = require("./hangman.js");

test("should return a random word from the list", () => {
  const word1 = hangMan.pickRandomWordFromWordList();
  const word2 = hangMan.pickRandomWordFromWordList();
  const word3 = hangMan.pickRandomWordFromWordList();
  const word4 = "NotFromTheList";
  expect(hangMan.wordList.includes(word1)).toBe(true);
  expect(hangMan.wordList.includes(word2)).toBe(true);
  expect(hangMan.wordList.includes(word3)).toBe(true);
  expect(hangMan.wordList.includes(word4)).toBe(false);
  expect(word1 !== word2 || word1 !== word3 || word2 !== word3).toBe(true);
});

test("Should return a boolean if word has been guessed or not", () => {
  hangMan.word = "developer".split("");
  expect(hangMan.wordHasBeenGuessed()).toBe(false);
  hangMan.guesses = ["a", "e", "o"];
  expect(hangMan.wordHasBeenGuessed()).toBe(false);
  hangMan.guesses = ["a", "e", "o", "b", "d", "l", "p", "r", "v"];
  expect(hangMan.wordHasBeenGuessed()).toBe(true);
});

describe("guessLetter", () => {
  hangMan.test = true;
  test("should return false when the game is over", () => {
    hangMan.gameOver = true;
    expect(hangMan.guessLetter()).toBe(false);
  });
  test("should return false when guess is empty or already guessed", () => {
    hangMan.gameOver = false;
    hangMan.guess = "";
    expect(hangMan.guessLetter()).toBe(false);
    hangMan.guess = "d";
    hangMan.guesses = ["d", "e", "v"];
    expect(hangMan.guessLetter()).toBe(false);
  });
  test("tries should increase by 1 if the guess doesn't match", () => {
    hangMan.guess = "a";
    hangMan.guesses = [];
    const tries = hangMan.tries;
    hangMan.guessLetter();
    expect(hangMan.tries).toBe(tries + 1);
  });
});

test("should update the wrong guesses", () => {
  hangMan.guesses = ["d", "e", "v", "m", "a"];
  expect(hangMan.updateWrongGuesses()).toEqual(["m", "a"]);
});

// describe("start", () => {
//   test("All properties should be back to the default value", () => {
//     hangMan.start();
//     expect(hangMan.gameOver).toBe(false);
//   });
// });

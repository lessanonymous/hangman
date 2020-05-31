import hangMan from "./hangman.js";

const handleGuessButtonClickEvent = () => hangMan.guessLetter();
const handleRestartButtonClickEvent = () => hangMan.beginTheGameWithPlayer();

document
  .querySelector(".guess")
  .addEventListener("click", handleGuessButtonClickEvent);
document
  .querySelector(".restart")
  .addEventListener("click", handleRestartButtonClickEvent);
hangMan.beginTheGameWithPlayer();

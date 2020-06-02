const handleGuessButtonClickEvent = () => hangMan.guessLetter();
const handleRestartButtonClickEvent = () => hangMan.start();

document
  .querySelector(".guess")
  .addEventListener("click", handleGuessButtonClickEvent);
document
  .querySelector(".restart")
  .addEventListener("click", handleRestartButtonClickEvent);
hangMan.start();

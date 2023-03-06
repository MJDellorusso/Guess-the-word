const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// Display the letters of the word as the placeholder symbol
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

//Event listener for when a letter is submitted.
guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  // Empty the message paragraph
  message.innerText = "";
  // Grab what was entered in the input
  const guess = letterInput.value;
  // Check guess for single letter then holds that letter as its value. ex const goodGuess = A.
  const goodGuess = inputValidator(guess);
  // if the inputValidator determines the guess is good, run the makeGuess(guess) function.
  // makeGuess checks if the guess has been made before by seeing if it is already present in the array.
  console.log(goodGuess);
  if (goodGuess) {
    makeGuess(guess);
  }
  // clears the field so it is ready for the next guess.
  letterInput.value = "";
});
// The input parameter is holding the place of the guess variable.
const inputValidator = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  // checking for an input
  if (input.length === 0) {
    message.innerText = "You must input a letter.";
    // Is the input longer than one letter
  } else if (input.length > 1) {
    message.innerText = "You must input a single letter.";
    // di you type something other than a letter?
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "You must input a letter.";
  } else {
    // a single letter was given
    return input;
  }
};
// After the guess is validated, this function makes the guess, and determines if the guess was already made or not.
const makeGuess = function (guess) {
  // converts all inputs or "guesses to uppercase"
  guess = guess.toUpperCase();
  // if the guessedLetters array does not already contain the guess it is pushed to the array.
  if (!guessedLetters.includes(guess)) {
    guessedLetters.push(guess);
  } else {
    message.innerText = "You already guessed that letter!";
  }
  console.log(guessedLetters);
};

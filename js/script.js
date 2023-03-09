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
  // converts all inputs or "guesses" to uppercase
  guess = guess.toUpperCase();
  // if the guessedLetters array does not already contain the guess it is pushed to the array.
  if (!guessedLetters.includes(guess)) {
    guessedLetters.push(guess);
    // Iterates through the guessed letters and creates a li to display to the plyr their guesses.
    showGuessedLetters(guess);
    // Iterates through the wordArray which is the answer word changed to an array which each letter is an element,
    // checks the guessedLetters array for matching letters and pushes matching letters or placeholders to the revealWord array.
    updateWordInProgress(guessedLetters);
  } else {
    message.innerText = "You already guessed that letter!";
  }
  console.log(guessedLetters);
};

const showGuessedLetters = function () {
  // Clears the ul of letters for each new game
  guessedLettersElement.innerHTML = "";
  // iterates through each letter to make a list item
  for (const letter of guessedLetters) {
    // creates the list item, asigns it text, and adds it to the list.
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};
// Replaces "●" with correctly guessed letters.
const updateWordInProgress = function (guessedLetters) {
  // changing the value of the word variable to upper case.
  const wordUpper = word.toUpperCase();
  // Takes the uppercase version of the word variable and seperates each letter as an individual value and places it into the wordArray.
  const wordArray = wordUpper.split("");
  // Array to hold correctly guessed lettes and "●" symbols.
  const revealWord = [];
  // iterates through each letter of the word array which holds the value of the word variable but as individual elements not as a string.
  for (const letter of wordArray) {
    // If guessedLetters includes a letter from the word array, aka the array holding the answer.
    if (guessedLetters.includes(letter)) {
      // Put the letter into the revealWord variable and make the letter uppercase.
      revealWord.push(letter.toUpperCase());
    } else {
      // If guessedLetters does not include a letter in the wordArray push a placeholder for that letter.
      revealWord.push("●");
    }
  }
  // Change the text of the word in progress <p> to the string version of the value of the revealWord array.
  wordInProgress.innerText = revealWord.join("");
  // call the checkWin function.
  checkWin();
};

const checkWin = function () {
  // If the word variable in all caps matches the value/text of the wordInProgress paragraph also in all caps
  if (word.toUpperCase() === wordInProgress.innerText) {
    // add the "win" class to the message variable which has the value of the <p=".message">  class
    message.classList.add("win");
    // change the innerhtml of the message <p> to the <p> with the highlight class.
    message.innerHTML = `<p class="highlight">You guessed the correct the word! Congrats!</p>`;
  }
};

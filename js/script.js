const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
// the word variables changed to let to allow it's value to change with each fetch of the api
let word = "magnolia";
// an empty array to hold the guessed letters to be compared to new guesses.
const guessedLetters = [];
// variable to hold the changing value of guesses available to the player
let remainingGuesses = 8;

// Defines a asynchronous function
const getWord = async function () {
  // fetching the data from the url await tells the code to wait for the response before continuing execution
  const wordRequest = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  // wordData varible is extracting the text from the response using the .text() method await is waiting for the text to be extracted before continuing execution
  const wordData = await wordRequest.text();
  console.log(wordData);
  // Splits the list of words into an array using the .split() method with the newline character ("\n") as the delimiter
  const wordArray = wordData.split("\n");
  console.log(wordArray);
  // generated a random index number based on the length of the wordArray
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  // changes the value of the let word varaible to the randomly generated word. the trim() method is used to eliminate white space. so there are no empty characters in the words.
  word = wordArray[randomIndex].trim();
  // placeholder function is now called here to reflect the randomly generated word.
  placeholder(word);
};
// kicks off the game
getWord();

// Display the letters of the word as the placeholder symbol
const placeholder = function (word) {
  // Array to hold the symbols for each letter of the word
  const placeholderLetters = [];
  // for each letter of the word push a symbol to the placeHolder array
  for (const letter of word) {
    placeholderLetters.push("???");
  }
  // Change the text fo the word in progress <p> to the string version of the placeHolder array.
  wordInProgress.innerText = placeholderLetters.join("");
};

//Event listener for when a letter is submitted.
guessLetterButton.addEventListener("click", function (e) {
  // prevents page from reloading every time button is pressed
  e.preventDefault();
  // Empty the message paragraph
  message.innerText = "";
  // Grab what was entered in the input
  const guess = letterInput.value;
  // Check guess for single letter, then holds that letter as its value. ex const goodGuess = A.
  const goodGuess = inputValidator(guess);
  // if the inputValidator determines the guess is good, run the makeGuess(guess) function.

  if (goodGuess) {
    // makeGuess checks if the guess has been made before by seeing if it is already present in guessedLetters array.
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
    // did you type something other than a letter?
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
    showGuessedLetters();
    // Incorrect guesses deduct from the total amount of guesses allowed to the player. Checks if the letter guessed is present in the word if it is not it deducts a guess and displays a message.
    guessCounter(guess);
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
// Replaces "???" with correctly guessed letters.
const updateWordInProgress = function (guessedLetters) {
  // changing the value of the word variable to upper case.
  const wordUpper = word.toUpperCase();
  // Takes the uppercase version of the word variable and seperates each letter as an individual value and places it into the wordArray.
  const wordArray = wordUpper.split("");
  // Array to hold correctly guessed lettes and "???" symbols.
  const revealWord = [];
  // iterates through each letter of the word array which holds the value of the word variable but as individual elements not as a string.
  for (const letter of wordArray) {
    // If guessedLetters includes a letter from the word array, aka the array holding the answer.
    if (guessedLetters.includes(letter)) {
      // Put the letter into the revealWord variable and make the letter uppercase.
      revealWord.push(letter.toUpperCase());
    } else {
      // If guessedLetters does not include a letter in the wordArray push a placeholder for that letter.
      revealWord.push("???");
    }
  }
  // Change the text of the word in progress <p> to the string version of the value of the revealWord array.
  wordInProgress.innerText = revealWord.join("");
  // call the checkWin function.
  checkWin();
};

// A function to check how many guesses a player has left
const guessCounter = function (guess) {
  // change the word variable to uppercase because the varibles guesses value is the input and it is changed to uppercase. JS is case sensitive so we want it to be able to match.
  const wordUpperCase = word.toUpperCase();
  // iterating through each letter of the guess variable which will be the players input
  // if the uppercase word includes the uppercase letter from the guess variable..
  for (const letter of guess)
    if (wordUpperCase.includes(letter)) {
      // the message reflects the match
      message.innerText = "You guessed a correct letter";
      // if the word does not include the guessed letter..
    } else if (!wordUpperCase.includes(letter)) {
      // the message reflects the inccorect guess and we subtract 1 from the value of the remaining guesses variable
      message.innerText = "Sorry incorrect letter";
      remainingGuesses -= 1;
    }
  // if remaining guesses has the value of 0
  if (remainingGuesses === 0) {
    // we change the message <p> text
    message.innerHTML = `Sorry game over! The word you were looking for is <span class="highlight">${word.toUpperCase()}</span>.`;
    // we change the remaingGuessesSpan element text to reflect the number of guesses that remains
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `1 guess`;
  } else if (remainingGuesses > 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses}`;
  }
};

const checkWin = function () {
  // If the word variable in all caps matches the value/text of the wordInProgress paragraph also in all caps
  if (word.toUpperCase() === wordInProgress.innerText) {
    // add the "win" class to the message variable which has the value of the <p=".message">  class
    message.classList.add("win");
    // change the innerhtml of the message <p> to the <p> with the highlight class.
    message.innerHTML = `<p class="highlight">You guessed the correct the word! Congrats!</p>`;
    startOver();
  }
};

const startOver = function () {
  guessLetterButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  // reset all original values - grab a new word
  message.classList.remove("win");
  remainingGuesses = 8;
  guessedLetters = [];
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  message.innerText = "";
  guessedLettersElement.innerHTML = "";

  // new word
  getWord();
  // show the right UI elements
  guessLetterButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
});

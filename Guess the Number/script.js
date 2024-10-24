let randomNumber = parseInt(Math.random() * 101);
let previousGuesses = [];
let numGuesses = 1;
let playGame = true;
let maxNumber = 100;
let maxAttempts = 10;
let previousDifference = null;

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHigh");
const startOver = document.querySelector(".resultParas");
const backgroundMusic = document.querySelector("#backgroundMusic");
const correctGuessSound = document.querySelector("#correctGuessSound");
const wrongGuessSound = document.querySelector("#wrongGuessSound");
const muteButton = document.querySelector("#muteButton");

function startMusic() {
  backgroundMusic.volume = 0.3;
  backgroundMusic.play();
}

submit.addEventListener("click", function (e) {
  e.preventDefault();
  const guess = parseInt(userInput.value);
  if (playGame) {
    validedGuess(guess);
  }
});

function validedGuess(guess) {
  if (isNaN(guess)) {
    alert("Enter a valid number");
  } else if (guess < 1) {
    alert("Enter a number greater than 1");
  } else if (guess > maxNumber) {
    alert("Enter a number less than " + maxNumber);
  } else {
    previousGuesses.push(guess);
    if (numGuesses === maxAttempts + 1) {
      displayMessage(`Game over! The correct number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  const currentDifference = Math.abs(randomNumber - guess);
  if (guess === randomNumber) {
    correctGuessSound.play();
    displayMessage("You guessed right! 🎉");
    lowOrHi.classList.add("winner");
    endGame();
  } else {
    wrongGuessSound.play();
    userInput.classList.add("shake");
    setTimeout(() => {
      userInput.classList.remove("shake");
    }, 500);

    if (guess > randomNumber) {
      displayMessage("Your guess is too high");
    } else {
      displayMessage("Your guess is too low");
    }

    if (numGuesses % 3 === 0 && previousDifference !== null) {
      if (currentDifference < previousDifference) {
        displayMessage("You are getting hotter!");
      } else {
        displayMessage("You are getting colder!");
      }
    }
    previousDifference = currentDifference;
  }
}

function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess}, `;
  numGuesses++;
  remaining.innerHTML = `${maxAttempts + 1 - numGuesses}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
  lowOrHi.classList.add("fade");
  setTimeout(() => {
    lowOrHi.classList.remove("fade");
  }, 1000);
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  lowOrHi.classList.remove("winner");
  stopMusic();
}

function resetGame() {
  randomNumber = parseInt(Math.random() * maxNumber + 1);
  previousGuesses = [];
  numGuesses = 1;
  guessSlot.innerHTML = "";
  remaining.innerHTML = maxAttempts;
  userInput.removeAttribute("disabled");
  startMusic();
}

function stopMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

muteButton.addEventListener("click", function () {
  const isMuted = backgroundMusic.muted;
  backgroundMusic.muted = !isMuted;
});

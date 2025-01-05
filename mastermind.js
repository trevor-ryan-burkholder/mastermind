// Mastermind game

// The readline module provides an interface for reading a line at a time from an
// input stream. In this case, we use it to read from stdin and write to stdout.
const readline = require("readline");

/**
 * The Mastermind game where the player tries to guess a secret 4-digit code.
 * The digits are between 1 and 6, and the player receives feedback on their guesses.
 */
async function mastermind() {
    const secretArray = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    const maxAttempts = 10;

    console.log("Welcome to Mastermind!");
    console.log("The secret code has 4 digits, each between 1 and 6.");
    console.log("Enter your guess and receive hints:");
    console.log("+ = Correct digit in the correct position");
    console.log("- = Correct digit in the wrong position");
    console.log(`You have ${maxAttempts} attempts to guess the code. Good luck!`);

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        // Prompt the player for their guess
        const guess = await askQuestion(
            `\nAttempt ${attempt}/${maxAttempts}\nEnter your guess (4 digits between 1 and 6): `
        );

        // Validate the guess input
        if (!/^[1-6]{4}$/.test(guess)) {
            console.log("\nInvalid input. Please enter 4 digits between 1 and 6.");
            attempt--;
            continue;
        }

        const guessArray = guess.split('').map(Number);

        // Check if the guess is correct
        if (arrayEqual(guessArray, secretArray)) {
            console.log(`Congratulations! You've guessed the code!`);
            return;
        }

        // Generate feedback for the guess
        const feedback = generateFeedback(guessArray, secretArray);
        console.log(`Hint: ${feedback}`);
    }

    // Inform the player that the game is over
    console.log("\nGame over! You've used all your attempts.");
    console.log(`The secret code was: ${secretArray.join("")}`);
}

/**
 * Generates feedback for a guess in the Mastermind game.
 * 
 * @param {number[]} guessArray - An array of numbers representing the player's guess.
 * @param {number[]} secretArray - An array of numbers representing the secret code.
 * @returns {string} A string with '+' indicating correct number and position,
 *                   and '-' indicating correct number but incorrect position.
 */
function generateFeedback(guessArray, secretArray) {
    // Create arrays to keep track of matched positions in the guess and secret arrays
    const guessMatched = Array(4).fill(false);
    const secretMatched = Array(4).fill(false);
    let plusCount = 0;  // Count of correct numbers in correct positions
    let minusCount = 0; // Count of correct numbers in incorrect positions

    // Check for correct numbers in correct positions
    for (let i = 0; i < 4; i++) {
        if (guessArray[i] === secretArray[i]) {
            guessMatched[i] = true;
            secretMatched[i] = true;
            plusCount++;
        }
    }

    // Check for correct numbers in incorrect positions
    for (i = 0; i < 4; i++) {
        if (guessMatched[i]) continue;

        for (j = 0; j < 4; j++) {
            if (!secretMatched[j] && guessArray[i] === secretArray[j]) {
                secretMatched[j] = true;
                minusCount++;
            }
        }
    }

    // Return the feedback string
    return '+'.repeat(plusCount) + '-'.repeat(minusCount);
}

/**
 * Returns true if two arrays are equal, false otherwise.
 * Two arrays are equal if they have the same elements in the same order.
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {boolean}
 */
function arrayEqual(arr1, arr2) {

    // If the arrays have different lengths, they can't be equal.
    if (arr1.length !== arr2.length) return false;

    // Iterate over the arrays and compare each element.
    // If any element is different, return false.
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }

    // If we reach this point, the arrays are equal.
    return true;
}

/**
 * Asks the user a question and returns their response as a promise.
 * @param {string} query - The question to ask the user.
 * @returns {Promise<string>} A promise that resolves with the user's answer.
 */
function askQuestion(query) {
    // Create a readline interface to read from stdin and write to stdout.
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // Return a promise that resolves when the user answers the question.
    return new Promise((resolve) => rl.question(query, (answer) => {
        // Close the readline interface once the user has answered.
        rl.close();
        // Resolve the promise with the user's answer.
        resolve(answer);
    }));
}

//Start game
mastermind();
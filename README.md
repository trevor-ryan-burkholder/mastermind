# Mastermind Game

Mastermind is a code-breaking game where the player tries to guess a secret 4-digit code. Each digit is between 1 and 6, and the player receives feedback on their guesses. This game is implemented in JavaScript using the `readline` module to read from stdin and write to stdout.

## How to Play

1. The game will generate a secret 4-digit code with each digit between 1 and 6.
2. You have 10 attempts to guess the secret code.
3. Enter your guess as a 4-digit number (e.g., 1234).
4. You will receive hints after each guess:
   - `+` indicates a correct digit in the correct position.
   - `-` indicates a correct digit in the wrong position.

## Rules

- Each digit in the guess must be between 1 and 6.
- You have a maximum of 10 attempts to guess the correct code.

## Example Gameplay

```text
Welcome to Mastermind!
The secret code has 4 digits, each between 1 and 6.
Enter your guess and receive hints:
+ = Correct digit in the correct position
- = Correct digit in the wrong position
You have 10 attempts to guess the code. Good luck!

Attempt 1/10
Enter your guess (4 digits between 1 and 6): 1234
Hint: +--

Attempt 2/10
Enter your guess (4 digits between 1 and 6): 1356
Hint: ++-
...

Game over! You've used all your attempts.
The secret code was: 2413
```

## Implementation Details

The game uses the readline module to interact with the player. The main game logic is implemented in the mastermind function, which generates the secret code, reads the player's guesses, and provides feedback. The feedback generation is handled by the generateFeedback function, and the input validation is done using regular expressions.

### Functions

`mastermind()`: The main function that runs the Mastermind game.

`generateFeedback(guessArray, secretArray)`: Generates feedback for a guess in the Mastermind game.

- `guessArray`: An array of numbers representing the player's guess.

- `secretArray`: An array of numbers representing the secret code.

- Returns a string with + indicating a correct number and position, and - indicating a correct number but incorrect position.

`arrayEqual(arr1, arr2)`: Returns true if two arrays are equal, otherwise false.

`askQuestion(query)`: Asks the user a question and returns their response as a promise.

## How to Run the Game

1. Make sure you have Node.js installed on your system.

2. Save the game code to a file, e.g., mastermind.js.

3. Open a terminal and navigate to the directory containing mastermind.js.

4. Run the game with the command:
   ```
   node mastermind.js
   ```

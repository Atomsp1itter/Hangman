import React, { Component } from 'react';
import { randomWord } from './Words.js';

// I'm going to use the images provided, so importing them here:

import img1 from "../images/state1.GIF"
import img2 from "../images/state2.GIF"
import img3 from "../images/state3.GIF"
import img4 from "../images/state4.GIF"
import img5 from "../images/state5.GIF"
import img6 from "../images/state6.GIF"
import img7 from "../images/state7.GIF"
import img8 from "../images/state8.GIF"
import img9 from "../images/state9.GIF"
import img10 from "../images/state10.GIF"
import img11 from "../images/state11.GIF"

class Hangman extends Component {

    // Here is our constructor where we set some initial states:

    constructor() {
        super();
        this.state = {
            incorrect: 0,
            guessed: new Set(),
            answer: randomWord(),
            images: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11]
        }
    }

    // I think this is the first time I've properly used the ternary operator, having seen it a few times
    // but starting to understand it now, I've used it in my handleGuess method and the guessedWord method,
    // as well as in the return when we have different renders based on whether we have reached 10 guesses.

    // This method handles clicking on a letter button. We add the letter to the 'guessed' set.
    // If the answer doesn't include the letter, we increment the 'incorrect' variable.

    handleGuess = e => {
        let letter = e.target.value;

        this.setState({guessed: this.state.guessed.add(letter)});
        this.setState({incorrect: this.state.incorrect + (this.state.answer.includes(letter) ? 0 : 1)});
    }

    // guessedWord is the word in its interim state whilst it is being guessed.
    // We use the map method to return the letter if guessed, or the underscore if not guessed:

    guessedWord() {
        let answerArray = this.state.answer.split("");
        let mapped = answerArray.map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
        return mapped;
    }

    // Using the map method again to return an html button for each letter in the array.
    // I have chosen to lay out the buttons in qwerty keyboard formation. 

    qwerty() {
        const letters = "qwertyuiopasdfghjklzxcvbnm".split("");

        // I've used slice to create three groups, one for each line of the keyboard.

        const groups = [
          letters.slice(0, 10),
          letters.slice(10, 19),
          letters.slice(19)
        ];
        return groups.map((group, index) => (

        // A <div> is created for each group, using the index as a key, then inside each group...

        <div key={index}>
            {group.map(letter => (

            // ...a button is created for each letter, using the letter as a key (as they are unique).
            
            <button
                className="letterButton"
                key={letter}
                value={letter}
                onClick={this.handleGuess}

                // The .has method is built in to the JavaScript Set object. Guessed buttons are disabled.

                disabled={this.state.guessed.has(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        ));
    }

    // The reset button returns our states back to how they were at the start:
    
    resetButton = () => {
        this.setState({
            incorrect: 0,
            guessed: new Set([]),
            answer: randomWord()
        });
    }

    render() {

        // If the joined array from guessedWord equals the answer state we have champion=true.

        const champion = this.guessedWord().join("") === this.state.answer;
        let switchClass = 'guessesRemaining'

        // We create the keyboard in the 'status' variable, because when we announce a win or a loss,
        // we no longer need the keyboard to display - so it is replaced by the win/loss announcement.

        let status = this.qwerty();

        if(champion) {
            status = "You won!!"
            switchClass = 'won'
        }
        else if(this.state.incorrect >= 10) {
            status = "Sorry, you lost :("
            switchClass = 'lost'
        }

        return (
            <div className="container">
                <div>
                    {/* If this.state.incorrect reaches 10 then we return the answer */}
                    <p className="guessing">{this.state.incorrect < 10 ? this.guessedWord() : this.state.answer}</p>
                    {/* Status returns either the keyboard (if we are still guessing) or win/loss message */}
                    <p className={switchClass}>{status}</p>
                </div>

                {/* Current image is selected using [this.state.incorrect] which returns the number we're on */}
                <div className="images">
                    <img src={this.state.images[this.state.incorrect]} alt="Hangman progress" />
                </div>
                <div className={switchClass}>Guesses remaining: {10 - this.state.incorrect}</div>
                <br/>
                <button className="reset" onClick={this.resetButton}>Reset</button>
                <br /><br />
            </div>
        )
    }
}

export default Hangman;
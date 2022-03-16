import React, { Component } from 'react';
import "./Hangman.css";
import { pickWord } from "./Words.js";

import grave from "./images/grave.png"
import base from "./images/Hangman Base.png"
import head from "./images/Head.png"
import body from "./images/Body.png"
import armL from "./images/Left Arm.png"
import armR from "./images/Right Arm.png"
import legL from "./images/Left Leg.png"
import legR from "./images/Right Leg.png"


class Hangman extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lives: 6, // 6 lives for 6 body parts (two legs, two arms, head, and body)
      guess: "",
      images: [legR, legL, armR, armL, body, head, base], // The body parts
      word: pickWord(), // Word chosen from list of 10,000 words
      graveyardSet: new Set()  // Sets can't have two of the same items so it's good for storing guesses
    };
    this.userGuess = this.userGuess.bind(this)  // creates a copy of functions with new context so it works as expected
    this.userGuess = this.userGuess.bind(this)
  }


  refreshePage() {
    window.location.reload(false);  // resets the page
  }

  lifeCount() {
    this.setState({ lives: this.state.lives - 1});  // counts down from 6
    if (this.state.lives === 1) {
      alert("You lost!")
    }
  }

  revealAnswer() {  // If you get the word wrong this will show you the answer
    if (this.state.lives === 0) {
      return this.state.word;
    }
  }

  userGuess = (e) => {
    let userInput = e.target.value;
    let letter = userInput.toUpperCase();
    let graveyardSet = this.state.graveyardSet;
    let word = this.state.word;

    if (this.state.lives === 0) {  // Prevent further guesses after the game is lost
      return;
    }

    // Checks to see if input is a letter and shows error message if it's not
    if (!/^[a-zA-Z]+$/.test(letter)) {
      alert("That's not a letter!");
    }
    else if (graveyardSet.has(letter)) { // Checks to see if the word is already in the graveyard
      alert("You've already used that letter");
    }
    else {
      this.setState({graveyardSet: graveyardSet.add(letter)});

      if (!word.split("").includes(letter)) { // Lose a life if the letter isn't in the answer
        this.lifeCount();
      }
    }
  }

  letters() {
    // Shows the dashes for each letter. I used somebody else's code for this part since it wouldn't work for me
    return this.state.word.split("").map(letter=> (this.state.graveyardSet.has(letter) ? letter : " _ "));
  }

  render() {
    // The HTML set up is below here with all the values
    return (
      <body>

        <div id="info">
          <button onClick={this.refreshePage}>Reset</button>
          <div id="lives">Lives left: {this.state.lives}</div>
        </div>
        
        <div id="mainContent">

          <div id="userGuess">

            Enter a letter: <input value={this.state.guess} onChange={this.userGuess}/>

          </div>

          <div id="board">
            <img src={this.state.images[this.state.lives]} alt="Base"/>
            <div id="word">
              {this.letters()}
          </div>
          </div>

          <div id="graveyard">
            <img id="grave" src={grave}></img>

            <div id="used">{this.state.graveyardSet}</div>
          </div>

          <div id="answer">
            {this.revealAnswer()}
          </div>

        </div>
      </body>
    );
  }
}

export default Hangman;
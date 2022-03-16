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


let textInput = React.createRef();

class Hangman extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //graveyardList: [],
      users: [{Bob: 45}, {Joe: 38}],
      lives: 6,
      guess: "",
      images: [legR, legL, armR, armL, body, head, base],
      //randomWord: pickWord(),
      word: pickWord(),
      graveyardSet: new Set()  // Sets can't have two of the same items so it's good for storing guesses
    };
    this.userGuess = this.userGuess.bind(this)  // creates a copy of functions with new context so it works as expected
    this.userGuess = this.userGuess.bind(this)
  }


  refreshePage() {
    window.location.reload(false);
  }

  lifeCount() {
    this.setState({ lives: this.state.lives - 1});
    if (this.state.lives === 1) {
      alert("You lost!")
    }
  }

  revealAnswer() {
    if (this.state.lives === 0) {
      return this.state.word;
    }
  }

  userGuess = (e) => {
    //let userInput = textInput.current.value;
    let userInput = e.target.value;
    let letter = userInput.toUpperCase();
    //let graveyardList = this.state.graveyardList;
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
      //this.setState({ graveyardList: graveyardList.concat(letter)});
      this.setState({graveyardSet: graveyardSet.add(letter)});             // !!!!!!!$)*(@!&$@!*)^!@$)^

      if (!word.toUpperCase().split("").includes(letter)) {
        this.lifeCount();
      }
    }
  }

  letters() {
    return this.state.word.split("").map(letter=> (this.state.graveyardSet.has(letter) ? letter : " _ "));

  }

  render() {
    return (
      <body>

        <div id="info">
          <button onClick={this.refreshePage}>Reset</button>
          <div id="lives">Lives left: {this.state.lives}</div>
        </div>
        
        <div id="mainContent">

          <div id="userGuess">
{/* 
            Enter a letter: <input ref={textInput} type="text" />
*/}
            Enter a letter: <input value={this.state.guess} onChange={this.userGuess}/>
{/*
            <button onClick={this.userGuess}>Click Here</button>        
*/}
          </div>

          <div id="board">
            <img src={this.state.images[this.state.lives]} alt="Base"/>
            <div id="word">
              {this.letters()}
          </div>
          </div>

{/* 
          <div id="word">
            <h1>
              {this.letters()}
            </h1>
          </div>
*/}
          <div id="graveyard">
            <img id="grave" src={grave}></img>
{/*
            <div id="used">{this.state.graveyardList}</div>
*/}
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
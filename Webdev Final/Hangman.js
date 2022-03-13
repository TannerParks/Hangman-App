var graveyardList = [] // Global variable
var inAnswer = [] // Words in the final answer
var users = [
    {name: "Bob", wins: 22},
    {name: "Joe", wins: 60},
    {name: "Kat", wins: 49}
];  // List of users and their number of wins
var lives = 6
const answer = "hangman"    // The answer for the game

//window.onload = lifeCount(lives)
window.onload = function () {
    lifeCount(lives);

    emptyWord = document.getElementById("word");
    letterList = document.createElement("ul");

    for (var i = 0; i < answer.length; i++) {
        letterList.setAttribute("id", "word");
        letter = document.createElement("li");
        letter.setAttribute("class", "letter");

        if (answer[i] === "-") {
            letter.innerHTML = "-";
            space = 1;                           // Is this necessary?
        }
        else {
            letter.innerHTML = "_";
        }

        emptyWord.appendChild(letterList);
        letterList.appendChild(letter);

    }
}

function newGame() {
    // Resets the game
    //graveyardList = []
    //inAnswer = []
    //document.getElementById("graveyard").innerHTML = graveyardList;
    //document.getElementById("lettersInAnswer").innerHTML = inAnswer;
    //document.getElementById("winLose").innerHTML = "";
    //document.getElementById("answer").innerHTML = "";
    window.location.reload();
}

function lifeCount(count) {
    if (lives >= 1) {
        document.getElementById("lives").innerHTML = "Lives Left: " + lives;
    }
    else {
        document.getElementById("lives").innerHTML = "You lose";
        document.getElementById("userGuess").innerHTML = "Click new game to try again!"
        document.getElementById("winLose").innerHTML = "You lose";
        document.getElementById("answer").innerHTML = "The word was: " + answer;
        //newGame()

    }
}

// Function save score
// username and password
// if wrong repeat until typed right
// repitition and object 

function userGuess() {
    var guess = document.getElementById("letter").value.toLowerCase();
    var len = guess.length;
    var contains = graveyardList.includes(guess);
    var answerContains = answer.split("").includes(guess);
    var err = "This isn't a letter";
    var err2 = "You've already guessed this letter"
    // Object: username, score, first name, last name

    if (len != 1) { // Gives an error if the guess is multiple letters
        alert(err);
    }
    else {
        
        if (!contains) {    // Gives an error if the letter was already guessed

            graveyardList.push(guess); // Puts guess in the array
            document.getElementById("graveyard").innerHTML = graveyardList;

            // If guess is in the answer: no lives lost
            // Else: life lost

            if (answerContains) {
                inAnswer.push(guess);
                document.getElementById("word").innerHTML = inAnswer;
            }
            else {
                lives = lives - 1; // Counts down the user's lives
                updateBoard(lives);
                lifeCount(lives);
            }

            if (answer.split("").every(ai => graveyardList.includes(ai))) {
                document.getElementById("winLose").innerHTML = "YOU WIN"
                document.getElementById("answer").innerHTML = "The word was: " + answer;
                saveScore()
                displayTop()
                //newGame()               
            }       
        }
        else{
            alert(err2)
        }
    }
}

function updateBoard(lifeCount) {
    var image = document.getElementById("Base");
    //if (image.src.match("Hangman%20Base.png")) {
    //    image.src = "Head.png";
    //}
    //else if (image.src.match("Head.png")) {
    //    image.src = "Left%20Leg.png";
    //}
    //else {
    //    //image.src = "Head.png";
    //    console.log("Else")
    //}

    console.log(image.src)


    //Import regex or just use the life count
    switch(lifeCount) {
        case 5:
            document.getElementById("Base").src = "Head.png";
            break;
        case 4:
            document.getElementById("Base").src = "Body.png";
            break;
        case 3:
            document.getElementById("Base").src = "Left Arm.png";
            break;
        case 2:
            document.getElementById("Base").src = "Right Arm.png";
            break;
        case 1:
            document.getElementById("Base").src = "Left Leg.png";
            break;
        case 0:
            document.getElementById("Base").src = "Right Leg.png";
            break;
    }

    console.log("hello")


}

function saveScore() { 
    var promptName = window.prompt("You won! Enter you're name for the high score list");
    var account = users.find(acc => acc.name === promptName);
    
    if (account) {
        account.wins = account.wins + 1;
        console.log(account.wins);
    }
    else {
        users.push({name: promptName, wins: 1});
        console.log(users);
    }
}

function displayTop() {
    temp = 0
    topName = ""
    for (const user of users) {
        //console.log(user.wins)
        if (temp < user.wins) {
            temp = user.wins;
            topName = user.name;
        }
    }
    document.getElementById("winLose").innerHTML = "Top player is: " + topName + " with " + temp + " wins!" 
}
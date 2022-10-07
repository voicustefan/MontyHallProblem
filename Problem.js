//** Monty Hall Problem**//

//** Author : Stefan Voicu **/

//** Global Variables**//
var numberOfGames;
var doorWithCar;
var remainingDoor = [1, 2, 3];
let determineIfSwitched = 0;
let determineIfWon = 0;
let totalGames = 0;
var percentageGamesWonSameDoor;
var percentageGamesWonSwitchedDoor;
var gamesWithSameDoorWon = 0;
var gamesWithSameDoorLost = 0;
var gamesWithDoorChangeWon = 0;
var gamesWithDoorChangeLost = 0;

class Statistics {
    //Calculate statistics for percentage of games won without switching doors
    //and percentage of games won when switching doors
    stats() {
        if (determineIfWon) {
            if (determineIfSwitched) {
                gamesWithDoorChangeWon++;
            } else {
                gamesWithSameDoorWon++;
            }
        } else {
            if (determineIfSwitched) {
                gamesWithDoorChangeLost++;
            } else {
                gamesWithSameDoorLost++;
            }
        }
        percentageGamesWonSameDoor = ((gamesWithSameDoorWon / totalGames) * 100).toFixed(2);
        percentageGamesWonSwitchedDoor = ((gamesWithDoorChangeWon / totalGames) * 100).toFixed(2);
        console.log(percentageGamesWonSameDoor + "% of games were won when not switching door.");
        console.log(percentageGamesWonSwitchedDoor + "% of games were won when switching door.");
    }
}

class Game {
    constructor() {
        this.doors;
        this.doorPicked;
        this.openedGoatDoor;
        this.finalPick;
        this.won;
        this.numberOfGames = numberOfGames;
    }
    // Add any method needed
    //Determine how many games must be played
    howManyGames() {
        for (var i = 0; i < this.numberOfGames; i++) {
            this.generateGoodDoor();
        }
    }

    //Randomly choose winning door
    generateGoodDoor() {
        doorWithCar = Math.floor((Math.random() * 3) + 1);
        console.log("The door with the car is: " + doorWithCar);
        this.createDoors();
    }

    //Create 3 doors per game 
    createDoors() {
        for (var j = 1; j < 4; j++) {
            if (j == doorWithCar) {
                this.doors = new Door(j, true);
            } else {
                this.doors = new Door(j, false);
            }
        }
        this.chooseDoor();
    }
    
    //The user picks one of the three doors randomly 
    chooseDoor() {
        this.doorPicked = Math.floor((Math.random() * 3) + 1);
        console.log("The chosen door was: ");
        console.log(this.doorPicked);
        this.openDoorWithGoat();
    }
    
    //Open a door that is not the user's choice and not the door
    //with the car
    openDoorWithGoat() {
        this.doors = 1;
        for (var l = 1; l < 4; l++) {
            if (this.doors != this.doorPicked && this.doors != doorWithCar) {
                this.openedGoatDoor = this.doors;
            }
            this.doors = this.doors + 1;
        }
        console.log("The opened door with goat was: ");
        console.log(this.openedGoatDoor);
        this.switchOrNot();
    }
    
    //Decide if user switches doors or not
    switchOrNot() {
        this.finalPick = Math.floor((Math.random() * 2) + 1);
        if (this.finalPick == 1) {
            this.finalPick = this.doorPicked;
            console.log("This player did not switch.");
        } else {
            for (var k = 1; k < 4; k++) {
                if (k == this.openedGoatDoor) {
                    remainingDoor.splice(remainingDoor.indexOf(k), 1);

                } else if (k == this.doorPicked) {
                    remainingDoor.splice(remainingDoor.indexOf(k), 1);
                }
            }
            this.finalPick = remainingDoor;
            console.log("This player switched.");
            determineIfSwitched = 1;
        }
        this.revealResults();
    }
    
    //Show if user won or not
    revealResults() {
        if (this.finalPick == doorWithCar) {
            console.log("You won!");
            determineIfWon = 1;
        } else {
            console.log("You lost!");
        }
        console.log("The final pick was: ");
        console.log(this.finalPick);
        totalGames++;                                 //increment number of games
        let newStats = new Statistics();              
        newStats.stats();                             //call statistics class
        remainingDoor = [1, 2, 3];                    //reinitialize remaining doors for switch
        determineIfSwitched = 0;                      //reinitialize to zero stats variable 
        determineIfWon = 0;                           //reinitialize to zero stats variable  
        console.log("---------------------------");
    }
}

class Door {
    constructor(number, isCar) {
        this.number = number;        //int
        this.isCar = isCar;          //boolean  
        this.opened = false;         //boolean
    }
}



//** Initial Message at the Start of the Game**/
hello();

function hello() {
    var msg = "Welcome to the Monty Hall Game! :)";
    console.log(msg);
    // import readline module
    const readline = require("readline");
    // create interface for input and output
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    // create empty user input
    let userInput = "";
    // question user to enter name
    rl.question("How many games do you want to play?\n", function (string) {
        userInput = string;
        // close input stream
        rl.close();
        fire(userInput);
        numberOfGames = userInput;
        let newGame = new Game();
        newGame.howManyGames();                       //call first function in class Game
    });
}
//Confirms how many games user wants to play
function fire(userInput) {
    console.log("You want to play this many games: " + userInput);
}

// global variables
let circlePath = "circleImage.jpg"
let crossPath = "crossImage.jpg"
let blankPath = "file:///C:/Users/kate_/Coding/practice/javascript/noughtsAndCrosses/blankSquare.jpg"
let middleSquare = 4
let startButton = document.getElementById("start-button")
let currentlyPlaying = false;
let firstTurn = true;
let circleArray = [];
let crossArray = [];
let gameSquares = document.querySelectorAll(".game-square")


const winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]] 

//check if square is free
const squareFree = (square) => {
    if (square.src === blankPath) {
        return true
    } 
}

// //function to make square turn into circle
const makeCircle = (square) => {
    square.src = circlePath
    circleArray.push(parseInt((square.id.substr(6))))
}
const makeCross = (square) => {
    square.src = crossPath
    crossArray.push(parseInt((square.id.substr(6))))
}


const crossTurn = () => {
    if (gameDraw()) {
        gameOver("draw")
    }
    if (currentlyPlaying) {
        if (firstTurn) {
            console.log("first turn")
            if (circleArray[0] === 4) {
                makeCross(document.getElementById(freeCornerSquare()))
            } else {
                makeCross(document.getElementById("square4"))
            }
            firstTurn = false
        }
    
        else if (twoOutOfThree(crossArray) !== null) {
            console.log("two out of three cross")
            makeCross(document.getElementById(twoOutOfThree(crossArray)))
        }
    
        //both happen in one go!
        else if (twoOutOfThree(circleArray) !== null) {
            console.log("two out of three circle")
            makeCross(document.getElementById(twoOutOfThree(circleArray)))
        }
    
        else { 
            console.log("free corner square")
            makeCross(document.getElementById(freeCornerSquare()))
        } 
        console.log("Moving onto circle turn")
        if (gameWon()) {
            gameOver() 
        }
        circleTurn() 
    }
 }

    
    //add a notification saying your turn..


const gameWon = () => {   
    const isInArray = (value) => crossArray.includes(value) 
    for (let i=0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].every(isInArray)) {
            return true
        }   
    }
    return false
}

const gameDraw = () => {
    let blankSquares = [];
    gameSquares.forEach(gameSquare => {if (gameSquare.src === blankPath) {blankSquares.push(gameSquare)}})
    if (blankSquares.length < 1) {
        return true
    }
}


//check if need to put a cross in third of winning row. returns third square if so
const twoOutOfThree =  (array) => {  
    console.log("going through array")
    const isInArray = (value) => array.includes(value) 
    let count = 0
    for (let i=0; i < winningCombinations.length; i++){
        for (let j=0; j < winningCombinations[i].length; j++){
            if (isInArray(winningCombinations[i][j])) {
                count++
            }
        }
        if (count === 2) {
            let thirdSquare = winningCombinations[i].filter(val => !array.includes(val));
            let thirdSquareId = "square" + thirdSquare.toString() 
            if  (document.getElementById(thirdSquareId).src === blankPath) {
                return thirdSquareId               
            } else {
                count = 0
            }
            
        } else {
            count = 0
        }
    }
    return null  
        
}


const freeCornerSquare = () => {
    let cornerSquares = [0, 2, 6, 8]
    for (let i=0; i < cornerSquares.length;i++) {
        let squareId = "square" + cornerSquares[i].toString() 
        if (squareFree(document.getElementById(squareId))) {
            return squareId;
        }
    }
    return null;
}


let onCircleClick = ({target}) => {
    makeCircle(target)
    setTimeout(crossTurn, 1000) 
    gameSquares.forEach(gameSquare => {gameSquare.removeEventListener("click", onCircleClick)})
}

//apply onclick functionality to all squares. Log if square has been made a circle and assign box number to array
const circleTurn = () => {
    gameSquares.forEach(gameSquare => {
        if (squareFree(gameSquare) && currentlyPlaying) {
            gameSquare.addEventListener("click", onCircleClick)
        }
    } 
    )
}


const startRound = () => {
    //make all srcs blank squares
    gameSquares.forEach(gameSquare => gameSquare.src = blankPath)
    circleArray = [];
    crossArray = [];
    currentlyPlaying = true
    circleTurn() 
  }

const gameOver = (status) => {
    if (status === "draw") {
      startButton.innerHTML = 'It\'s a draw! Play again?';
    } else {
      startButton.innerHTML = "Game over! Play again?"
    }
    currentlyPlaying = false
  }


startButton.onclick = () => {
    if (currentlyPlaying) {
        startButton.innerHTML = "Oops, this game isn't over yet!"
    } else {
        startRound()
        startButton.innerHTML = "Good luck!" 
    }
  }


//maybe add a give up button?

//chekc with Jake: 1 - is it bad that cross has same moves each time? Eg. picks same corner. 2- hould last move be declared before announcing draw 3- should always go for middle if possible?

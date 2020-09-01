const CIRCLE_PATH = "circleImage.jpg" 
const CROSS_PATH = "crossImage.jpg" 
const BLANK_PATH = "file:///C:/Users/kate_/Coding/practice/javascript/noughtsAndCrosses/blankSquare.jpg"
let computerPath  = CROSS_PATH
let playerPath = CIRCLE_PATH
const startButton = document.getElementById("start-button")
const crossButton = document.getElementById("cross")
const circleButton = document.getElementById("circle")
const grid = document.getElementById("game-table")
const gameArea = document.querySelector(".game-area")
const whosTurn = document.querySelector(".whos-turn")
const drawMessage = document.createElement("P"); 
const lostMessage = document.createElement("P"); 
const crossGo = document.querySelector("#cross-go")
const circleGo = document.querySelector("#circle-go")
const computerGo = crossGo;
const playerGo = circleGo;
let currentlyPlaying = false;
let firstTurn = true;
let playerArray = [];
let computerArray = [];
const middleSquare = {x: 1, y: 1}
const gameSquares = [...document.querySelectorAll(".game-square")]


//establish if circle or cross is one away from winning
const twoOutOfThree = (compOrPlayerArray) => {  
    const findThirdSquare = (arr) => { 
        //to establish if diagonal
        let countSameXYCoord = 0;
        let sameXYCoordArray = [];
        let countCoordsSumTwo = 0;
        let coordsSumTwoArray = [];
        //to establish if vertical/horizontal line
        let XValuesArray = [];
        let YValuesArray = [];
        let duplicateX = null;
        let duplicateY = null;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].x === arr[i].y) {
                countSameXYCoord += 1
                sameXYCoordArray.push(arr[i])
            }
            if (arr[i].x + arr[i].y === 2) {
                countCoordsSumTwo += 1
                coordsSumTwoArray.push(arr[i])
            }
            if (countSameXYCoord === 2) {
                let thirdBox = {
                    x: 3 - (sameXYCoordArray[0].x + sameXYCoordArray[1].x),
                    y: 3 - (sameXYCoordArray[0].y + sameXYCoordArray[1].y)
                }
                if (squareFree(thirdBox)) {
                    return thirdBox;
                } 
            }          
            if  (countCoordsSumTwo === 2) {
                let thirdBox = {
                    x: 3 - (coordsSumTwoArray[0].x + coordsSumTwoArray[1].x),
                    y: 3 - (coordsSumTwoArray[0].y + coordsSumTwoArray[1].y)
                }
                if (squareFree(thirdBox)) {
                    return thirdBox;
                } 
            }
            if (XValuesArray.includes(arr[i].x)) {
                duplicateX = arr[i].x
            }
            
            if (YValuesArray.includes(arr[i].y)) {
                duplicateY = arr[i].y
            }

            XValuesArray.push(arr[i].x)
            YValuesArray.push(arr[i].y)

            if (duplicateX !== null) {
                let duplicates = arr.filter(obj => obj.x === duplicateX)
                let thirdBox = {
                    x: duplicateX,
                    y: 3 - (duplicates[0].y + duplicates[1].y)
                }
                if (squareFree(thirdBox)) {
                    return thirdBox;
                } 
            }

            if (duplicateY !== null) {
                let duplicates = arr.filter(obj => obj.y === duplicateY)
                let thirdBox = {
                    y: duplicateY,
                    x: 3 - (duplicates[0].x + duplicates[1].x)
                }
                if (squareFree(thirdBox)) {
                    return thirdBox;
                } 
            }
    
        }
        
        return null
        
    }


    return findThirdSquare(compOrPlayerArray)
   
    } 

 

//check if circle has an opportunity to fork
const forkDilemma = (currentPlayerArray) => { 
    // check if x and y coordinates are both different to establish if potential fork
    let forkArray = getUniqueXYValues(currentPlayerArray) 

    const getIntersectionCorner = (potentialForkArray) => {      
        const intersectionOptions = [{x: potentialForkArray[0].x , y: potentialForkArray[1].y}, {x: potentialForkArray[1].x , y: potentialForkArray[0].y}]
        const [intersectionCorner] = intersectionOptions.filter(squareCoord => isCorner(squareCoord))
        return intersectionCorner;
    }


    if (forkArray !== null) {
       const intersectionCorner = getIntersectionCorner(forkArray)
       const lSquares = squareCoordinates.filter(obj => (obj.x === intersectionCorner.x || obj.y === intersectionCorner.y)
       && (!isMatch(obj, forkArray[0])) && (!isMatch(obj, forkArray[1])))

       if (lSquares.every(squareFree)) {
           if (getOpposingCorners(forkArray)) {
                let lSquaresWithoutCorner = lSquares.filter(obj => !isMatch(obj, intersectionCorner))
                let randomLSquare = shuffleArray(lSquaresWithoutCorner)
                return randomLSquare[0]
           } else {
             return intersectionCorner;
           }
          
       }       
       else {
           return null
       }
    }

    return null   
} 



const makePlayerMove = (square) => {
    square.src = playerPath
    playerArray.push(getCoordsFromHtml(square))
}

const makeComputerMove = (squareCoordinates) => {
    //convert back to ID -always sends through an object eg//{x: 1, y: 1}
    let squareId = getIdFromCoordinates(squareCoordinates)
    squareId.src = computerPath
    computerArray.push(squareCoordinates)
}


const computerTurn = () => {
    if (isGameDraw()) {
        gameOver("draw") 
    }
    if (currentlyPlaying) {
        showImage(computerGo)
        if (firstTurn) {
            if (squareFree(middleSquare)) {
                makeComputerMove(middleSquare)
            } else {
                makeComputerMove(freeCornerSquare())
            }
            firstTurn = false
        }
     
        else if (twoOutOfThree(computerArray) !== null) {
            makeComputerMove(twoOutOfThree(computerArray))
            gameOver()
        }

        else if (twoOutOfThree(playerArray) !== null) {
            makeComputerMove(twoOutOfThree(playerArray))
        }

        
        else if (forkDilemma(playerArray) !== null) {
            makeComputerMove(forkDilemma(playerArray))
        }

        else {
            makeComputerMove(freeCornerSquare())
        }
        
        hideImage(computerGo)
        showImage(playerGo)
        playerTurn() 
    
    }
}


    
//add x notification saying your turn..

const isGameDraw = () => { 
    let blankSquares = [];
    gameSquares.forEach(gameSquare => {if (squareFree(gameSquare)) {blankSquares.push(gameSquare)}})
    if (blankSquares.length < 1) {
        return true;
    }
    return false;
}



const freeCornerSquare = () => {
    let cornerSquares = squareCoordinates.filter(squareCoord => isCorner(squareCoord))
    let randomCornerSquares = shuffleArray(cornerSquares)
    for (let i=0; i < randomCornerSquares.length; i++) {
        if (squareFree(randomCornerSquares[i])){
            return randomCornerSquares[i];
        }
    }
    return null;
}


let onPlayerClick = ({target}) => {
    makePlayerMove(target)
    setTimeout(computerTurn, 1000) 
    gameSquares.forEach(gameSquare => {gameSquare.removeEventListener("click", onPlayerClick)})
}

//apply onclick functionality to all squares. Log if square has been made x circle and assign box number to array
const playerTurn = () => {
    gameSquares.forEach(gameSquare => {
        if (squareFree(gameSquare) && currentlyPlaying) {
            gameSquare.addEventListener("click", onPlayerClick)
        }
    } 
    )
}


const startRound = () => {
    //make all srcs blank squares
    grid.classList.remove("inactive")
    gameSquares.forEach(gameSquare => gameSquare.src = BLANK_PATH)
    playerArray = [];
    computerArray = [];
    currentlyPlaying = true
    firstTurn = true;
    whosTurn.style.visibility = "visible"
    startButton.remove();
    drawMessage.remove()
    lostMessage.remove()
    playerTurn() 
  }

const gameOver = (status) => {
    if (status === "draw") {                     
      drawMessage.innerHTML = "It\'s a draw!"; 
      changeMessageStyle(drawMessage)               
      gameArea.appendChild(drawMessage); 
    } else {                
      lostMessage.innerHTML = "Game over!";  
      changeMessageStyle(lostMessage)            
      gameArea.appendChild(lostMessage); 
    }
    gameArea.appendChild(startButton)
    startButton.innerHTML = "Play again"
    currentlyPlaying = false
    grid.classList.add("inactive")
  }


startButton.onclick = () => {
    startRound()
}


crossButton.onclick = () => {
    if (!currentlyPlaying) {
        computerPath = CIRCLE_PATH;
        playerPath = CROSS_PATH;
        computerGo = circleGo;
        playerGo = crossGo;
        crossButton.classList.add("active");
        circleButton.classList.remove("active")
    }
    
}

circleButton.onclick = () => {
    if (!currentlyPlaying) {
        computerPath = CROSS_PATH;
        playerPath = CIRCLE_PATH;
        computerGo = crossGo;
        playerGo = circleGo;
        crossButton.classList.remove("active");
        circleButton.classList.add("active")
    }  
}

//maybe add x give up button?
// global variables
// - You need to create another js file called "utils.js" (short for utilities). In that file you should put
// - all the functions I mark as "util"
// - this basically keeps them out the way
// - don't forget to reference the other js file in your html first


// - any const with a primitive value that is declared at file level should use const casing eg. BLANK_PATH
// - this just makes it clear that the value is kind of arbitrary and configurable
// - So the path to the images for instance can be configured to change the image used --CONFUSED

const circlePath = "circleImage.jpg" 
const crossPath = "crossImage.jpg" 
const blankPath = "file:///C:/Users/kate_/Coding/practice/javascript/noughtsAndCrosses/blankSquare.jpg"
const startButton = document.getElementById("start-button")
let currentlyPlaying = false;
let firstTurn = true;
let circleArray = [];
let crossArray = [];
const middleSquare = {x: 1, y: 1}
const gameSquares = [...document.querySelectorAll(".game-square")]


//establish if circle or cross is one away from winning
const twoOutOfThree = (crossOrCircleArray) => {  //is this name ok?
    const findThirdSquare = (arr) => { //does this name also need to be descriptive?
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


    return findThirdSquare(crossOrCircleArray)
   
    } 

 

//check if circle has an opportunity to fork
const forkDilemma = (currentCircleArray) => { //is this name ok?
    // check if x and y coordinates are both different to establish if potential fork
    let forkArray = getUniqueXYValues(currentCircleArray) 

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



const makeCircle = (square) => {
    square.src = circlePath
    circleArray.push(getCoordsFromHtml(square))
}

const makeCross = (squareCoordinates) => {
    //convert back to ID -always sends through an object eg//{x: 1, y: 1}
    let squareId = getIdFromCoordinates(squareCoordinates)
    squareId.src = crossPath
    crossArray.push(squareCoordinates)
}


const crossTurn = () => {
    if (isGameDraw()) {
        gameOver("draw") 
    }
    if (currentlyPlaying) {
        if (firstTurn) {
            if (squareFree(middleSquare)) {
                makeCross(middleSquare)
            } else {
                makeCross(freeCornerSquare())
            }
            firstTurn = false
        }
     
        else if (twoOutOfThree(crossArray) !== null) {
            makeCross(twoOutOfThree(crossArray))
            gameOver()
        }

        else if (twoOutOfThree(circleArray) !== null) {
            makeCross(twoOutOfThree(circleArray))
        }

        
        else if (forkDilemma(circleArray) !== null) {
            makeCross(forkDilemma(circleArray))
        }

        else {
            makeCross(freeCornerSquare())
        }
        
        circleTurn() 
    
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


let onCircleClick = ({target}) => {
    makeCircle(target)
    setTimeout(crossTurn, 1000) 
    gameSquares.forEach(gameSquare => {gameSquare.removeEventListener("click", onCircleClick)})
}

//apply onclick functionality to all squares. Log if square has been made x circle and assign box number to array
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
    firstTurn = true;
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


//maybe add x give up button?
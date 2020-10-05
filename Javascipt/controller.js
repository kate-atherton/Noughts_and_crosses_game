const CIRCLE_PATH = "img/circleImage.jpg";
const CROSS_PATH = "img/crossImage.jpg";
const BLANK_PATH = "img/blankSquare.jpg";
let computerPath = CROSS_PATH;
let playerPath = CIRCLE_PATH;
const startButton = document.getElementById("start-button");
const crossButton = document.getElementById("cross");
const circleButton = document.getElementById("circle");
const grid = document.getElementById("game-table");
const gameArea = document.querySelector(".game__board");
const whosTurn = document.querySelector(".game__turn");
const drawMessage = document.createElement("P");
const lostMessage = document.createElement("P");
const crossGo = document.querySelector("#cross-go");
const circleGo = document.querySelector("#circle-go");
const computerGo = crossGo;
const playerGo = circleGo;
let firstTurn = true;
const middleSquare = { x: 1, y: 1 };
const gameSquares = [...document.querySelectorAll(".game__square")];

const squareCoordinates = gameSquares.map((gameSquare) => {
  return getCoordsFromHtml(gameSquare);
});

const makePlayerMove = (coords) => {
  //need to check if square is free
  if (model.whosTurn() === "player" && squareFree(coords)) {
    model.makePlayerMove(coords);
  }
};

const onTurnUpdate = () => {
  let gridInfoPlayer = model.readPlayerArray();
  let gridInfoComp = model.readComputerArray();
  renderGrid(gridInfoPlayer, gridInfoComp);
  if (model.whosTurn() === "computer") {
    setTimeout(computerTurn, 1000);
  }
};

const playerTurn = () => {
  gameSquares.forEach((gameSquare) => {
    if (model.checkCurrentlyPlaying()) {
      gameSquare.addEventListener("click", onPlayerClick);
    }
  });
};

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
        countSameXYCoord += 1;
        sameXYCoordArray.push(arr[i]);
      }
      if (arr[i].x + arr[i].y === 2) {
        countCoordsSumTwo += 1;
        coordsSumTwoArray.push(arr[i]);
      }
      if (countSameXYCoord === 2) {
        let thirdBox = {
          x: 3 - (sameXYCoordArray[0].x + sameXYCoordArray[1].x),
          y: 3 - (sameXYCoordArray[0].y + sameXYCoordArray[1].y),
        };
        if (squareFree(thirdBox)) {
          return thirdBox;
        }
      }
      if (countCoordsSumTwo === 2) {
        let thirdBox = {
          x: 3 - (coordsSumTwoArray[0].x + coordsSumTwoArray[1].x),
          y: 3 - (coordsSumTwoArray[0].y + coordsSumTwoArray[1].y),
        };
        if (squareFree(thirdBox)) {
          return thirdBox;
        }
      }
      if (XValuesArray.includes(arr[i].x)) {
        duplicateX = arr[i].x;
      }

      if (YValuesArray.includes(arr[i].y)) {
        duplicateY = arr[i].y;
      }

      XValuesArray.push(arr[i].x);
      YValuesArray.push(arr[i].y);

      if (duplicateX !== null) {
        let duplicates = arr.filter((obj) => obj.x === duplicateX);
        let thirdBox = {
          x: duplicateX,
          y: 3 - (duplicates[0].y + duplicates[1].y),
        };
        if (squareFree(thirdBox)) {
          return thirdBox;
        }
      }

      if (duplicateY !== null) {
        let duplicates = arr.filter((obj) => obj.y === duplicateY);

        let thirdBox = {
          y: duplicateY,
          x: 3 - (duplicates[0].x + duplicates[1].x),
        };
        if (squareFree(thirdBox)) {
          return thirdBox;
        }
      }
    }

    return null;
  };

  return findThirdSquare(compOrPlayerArray);
};

//check if circle has an opportunity to fork
const forkDilemma = (currentPlayerArray) => {
  // check if x and y coordinates are both different to establish if potential fork
  let forkArray = getUniqueXYValues(currentPlayerArray);

  const getIntersectionCorner = (potentialForkArray) => {
    const intersectionOptions = [
      { x: potentialForkArray[0].x, y: potentialForkArray[1].y },
      { x: potentialForkArray[1].x, y: potentialForkArray[0].y },
    ];
    const [intersectionCorner] = intersectionOptions.filter((squareCoord) =>
      isCorner(squareCoord)
    );
    return intersectionCorner;
  };

  if (forkArray !== null) {
    const intersectionCorner = getIntersectionCorner(forkArray);
    const lSquares = squareCoordinates.filter(
      (obj) =>
        (obj.x === intersectionCorner.x || obj.y === intersectionCorner.y) &&
        !isMatch(obj, forkArray[0]) &&
        !isMatch(obj, forkArray[1])
    );

    if (lSquares.every(squareFree)) {
      if (getOpposingCorners(forkArray)) {
        let lSquaresWithoutCorner = lSquares.filter(
          (obj) => !isMatch(obj, intersectionCorner)
        );
        let randomLSquare = shuffleArray(lSquaresWithoutCorner);
        return randomLSquare[0];
      } else {
        return intersectionCorner;
      }
    } else {
      return null;
    }
  }

  return null;
};

const computerTurn = () => {
  if (isGameDraw()) {
    gameOver("draw");
  }
  if (model.checkCurrentlyPlaying()) {
    // showImage(computerGo);
    if (firstTurn) {
      if (squareFree(middleSquare)) {
        model.makeComputerMove(middleSquare);
      } else {
        model.makeComputerMove(freeCornerSquare());
      }
      firstTurn = false;
    } else if (twoOutOfThree(model.readComputerArray()) !== null) {
      model.makeComputerMove(twoOutOfThree(model.readComputerArray()));
      gameOver();
    } else if (twoOutOfThree(model.readPlayerArray()) !== null) {
      model.makeComputerMove(twoOutOfThree(model.readPlayerArray()));
    } else if (forkDilemma(model.readPlayerArray()) !== null) {
      model.makeComputerMove(forkDilemma(model.readPlayerArray()));
    } else {
      model.makeComputerMove(freeCornerSquare());
    }

    // hideImage(computerGo);
    // showImage(playerGo);
  }
};

//add x notification saying your turn..

const isGameDraw = () => {
  let blankSquares = [];
  gameSquares.forEach((gameSquare) => {
    if (squareFree(gameSquare)) {
      blankSquares.push(gameSquare);
    }
  });
  if (blankSquares.length < 1) {
    return true;
  }
  return false;
};

const freeCornerSquare = () => {
  let cornerSquares = squareCoordinates.filter((squareCoord) =>
    isCorner(squareCoord)
  );
  let randomCornerSquares = shuffleArray(cornerSquares);
  for (let i = 0; i < randomCornerSquares.length; i++) {
    if (squareFree(randomCornerSquares[i])) {
      return randomCornerSquares[i];
    }
  }
  return null;
};

const startRound = () => {
  model.resetTurn();
  grid.classList.remove("inactive");
  model.resetPlayerArrays();
  model.updateCurrentlyPlaying(true);
  let gridInfoPlayer = model.readPlayerArray();
  let gridInfoComp = model.readComputerArray();
  renderGrid(gridInfoPlayer, gridInfoComp);
  firstTurn = true;
  whosTurn.style.visibility = "visible";
  gameArea.style.backgroundColor = "none";
  startButton.remove();
  drawMessage.remove();
  lostMessage.remove();
  playerTurn();
};

const gameOver = (status) => {
  if (status === "draw") {
    drawMessage.innerHTML = "It's a draw!";
    changeMessageStyle(drawMessage);
    gameArea.appendChild(drawMessage);
  } else {
    lostMessage.innerHTML = "Game over!";
    changeMessageStyle(lostMessage);
    gameArea.appendChild(lostMessage);
  }
  gameArea.appendChild(startButton);
  startButton.innerHTML = "Play again";
  model.updateCurrentlyPlaying(false);
  grid.classList.add("inactive");
};

startButton.onclick = () => {
  startRound();
};

crossButton.onclick = () => {
  if (model.checkCurrentlyPlaying()) {
    computerPath = CIRCLE_PATH;
    playerPath = CROSS_PATH;
    computerGo = circleGo;
    playerGo = crossGo;
    crossButton.classList.add("game__active");
    circleButton.classList.remove("game__active");
  }
};

circleButton.onclick = () => {
  if (model.checkCurrentlyPlaying()) {
    computerPath = CROSS_PATH;
    playerPath = CIRCLE_PATH;
    computerGo = crossGo;
    playerGo = circleGo;
    crossButton.classList.remove("game__active");
    circleButton.classList.add("game__active");
  }
};

const model = initialiseModel(onTurnUpdate);
//maybe add x give up button?

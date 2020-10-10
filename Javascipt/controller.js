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

const currentlyPlaying = () => {
  if (model.checkCurrentlyPlaying()) {
    return true;
  }
};

const makePlayerMove = (coords) => {
  if (
    model.whosTurn() === "player" &&
    squareFree(coords, model.readPlayerArray(), model.readComputerArray())
  ) {
    model.makePlayerMove(coords);
  }
};

const makeComputerMove = (coords) => {
  model.makeComputerMove(coords);
};

const onTurnUpdate = () => {
  let gridInfoPlayer = model.readPlayerArray();
  let gridInfoComp = model.readComputerArray();
  renderGrid(gridInfoPlayer, gridInfoComp);
  if (model.whosTurn() === "computer") {
    setTimeout(() => {
      computerTurn(model.readPlayerArray(), model.readComputerArray());
    }, 1000);
  }
};

const playerTurn = () => {
  gameSquares.forEach((gameSquare) => {
    if (model.checkCurrentlyPlaying()) {
      gameSquare.addEventListener("click", onPlayerClick);
    }
  });
};

//add x notification saying your turn..

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

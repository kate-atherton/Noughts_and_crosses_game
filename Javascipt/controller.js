const CIRCLE_PATH = "img/circleImage.jpg";
const CROSS_PATH = "img/crossImage.jpg";
const BLANK_PATH = "img/blankSquare.jpg";
let computerPath = CROSS_PATH;
let playerPath = CIRCLE_PATH;
const CIRCLE_PATH_TURN = "img/circleImageTurn.jpg";
const CROSS_PATH_TURN = "img/crossImageTurn.jpg";
let computerPathGrey = CROSS_PATH_TURN;
let playerPathGrey = CIRCLE_PATH_TURN;

const middleSquare = { x: 1, y: 1 };

const squareCoordinates = gameSquares.map((gameSquare) => {
  return getCoordsFromHtml(gameSquare);
});

const currentlyPlaying = () => {
  if (model.checkCurrentlyPlaying()) {
    return true;
  }
};

const firstTurn = () => {
  if (model.checkFirstTurn()) {
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
  renderTurn(model.whosTurn());
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

const startRound = () => {
  grid.classList.remove("inactive");
  model.resetTurn();
  model.resetPlayerArrays();
  model.updateCurrentlyPlaying(true);
  let gridInfoPlayer = model.readPlayerArray();
  let gridInfoComp = model.readComputerArray();
  let turn = model.whosTurn();
  renderGrid(gridInfoPlayer, gridInfoComp);
  renderTurn(turn);
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
  whosTurn.style.visibility = "hidden";
};

const model = initialiseModel(onTurnUpdate);

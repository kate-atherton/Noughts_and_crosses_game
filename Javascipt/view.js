const startButton = document.getElementById("start-button");
const crossButton = document.getElementById("cross");
const circleButton = document.getElementById("circle");
const grid = document.getElementById("game-table");
const gameArea = document.querySelector(".game__board");
const whosTurn = document.querySelector(".game__turn");
const drawMessage = document.createElement("P");
const lostMessage = document.createElement("P");
const whosTurnImage = document.querySelector(".game__turn-image");
const gameSquares = [...document.querySelectorAll(".game__square")];

startButton.onclick = () => {
  startRound();
};

let onPlayerClick = ({ target }) => {
  if (model.whosTurn() === "player") {
    const coords = getCoordsFromHtml(target);
    makePlayerMove(coords);
  }
};

const renderGrid = (gridInfoPlayer, gridInfoComp) => {
  squareCoordinates.forEach((coords) => {
    let squareId = getIdFromCoordinates(coords);
    squareId.src = BLANK_PATH;
  });

  gridInfoPlayer.forEach((coords) => {
    let squareId = getIdFromCoordinates(coords);
    squareId.src = playerPath;
  });
  gridInfoComp.forEach((coords) => {
    let squareId = getIdFromCoordinates(coords);
    squareId.src = computerPath;
  });
};

const renderTurn = (turn) => {
  console.log(turn);
  console.log(whosTurnImage);
  if (turn === "player") {
    whosTurnImage.src = playerPathGrey;
  } else {
    whosTurnImage.src = computerPathGrey;
  }
};

crossButton.onclick = () => {
  if (!currentlyPlaying()) {
    computerPathGrey = CIRCLE_PATH_GREY;
    playerPathGrey = CROSS_PATH_GREY;
    computerPath = CIRCLE_PATH;
    playerPath = CROSS_PATH;
    crossButton.classList.add("game__active");
    circleButton.classList.remove("game__active");
  }
};

circleButton.onclick = () => {
  if (!currentlyPlaying()) {
    computerPathGrey = CROSS_PATH_GREY;
    playerPathGrey = CIRCLE_PATH_GREY;
    computerPath = CROSS_PATH;
    playerPath = CIRCLE_PATH;
    crossButton.classList.remove("game__active");
    circleButton.classList.add("game__active");
  }
};

// const startButton = document.getElementById("start-button");
const crossButton = document.getElementById("cross");
const circleButton = document.getElementById("circle");
const gameArea = document.querySelector(".game__board");
const gameTable = document.querySelector(".game__table");
const whosTurn = document.querySelector(".game__turn");
const whosTurnImage = document.querySelector(".game__turn-image");
const gameSquares = [...document.querySelectorAll(".game__square")];
let startButton;
let drawMessage;
let loseMessage;

const initialRender = () => {
  startButton = document.createElement("p");
  startButton.innerHTML = "Start Game";
  gameArea.appendChild(startButton);
  startButton.classList.add("game__button");
  startButton.onclick = () => {
    startRound();
  };
};

//need to adapt so doesn't interact with controller
let onPlayerClick = ({ target }) => {
  if (model.whosTurn() === "player") {
    const coords = getCoordsFromHtml(target);
    makePlayerMove(coords);
  }
};

//need to adapt so doesn't interact with controller
crossButton.onclick = () => {
  if (!model.checkCurrentlyPlaying()) {
    computerPathTurn = CIRCLE_PATH_TURN;
    playerPathTurn = CROSS_PATH_TURN;
    computerPath = CIRCLE_PATH;
    playerPath = CROSS_PATH;
    crossButton.classList.add("game__turn-selector--active");
    circleButton.classList.remove("game__turn-selector--active");
  }
};

//need to adapt so doesn't interact with controller
circleButton.onclick = () => {
  if (!model.checkCurrentlyPlaying()) {
    computerPathTurn = CROSS_PATH_TURN;
    playerPathTurn = CIRCLE_PATH_TURN;
    computerPath = CROSS_PATH;
    playerPath = CIRCLE_PATH;
    crossButton.classList.remove("game__turn-selector--active");
    circleButton.classList.add("game__turn-selector--active");
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
  if (turn === "player") {
    whosTurnImage.src = playerPathTurn;
  } else {
    whosTurnImage.src = computerPathTurn;
  }
};

const renderStart = () => {
  whosTurn.style.visibility = "visible";
  startButton.remove();
  if (document.contains(drawMessage)) {
    drawMessage.remove();
  } else if (document.contains(loseMessage)) {
    loseMessage.remove();
  }
  gameTable.classList.remove("game__table--inactive");
};

const renderResult = (status) => {
  gameTable.classList.add("game__table--inactive");
  if (status === "draw") {
    drawMessage = document.createElement("p");
    drawMessage.innerHTML = "It's a draw!";
    gameArea.appendChild(drawMessage);
    drawMessage.classList.add("game__message");
  } else {
    loseMessage = document.createElement("p");
    loseMessage.innerHTML = "Cross wins!";
    gameArea.appendChild(loseMessage);
    const addLoseMessage = () => {
      loseMessage.classList.add("game__message");
    };
    setTimeout(addLoseMessage);
  }
  initialRender();
  startButton.innerHTML = "Play again";
};

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
const gameSquares = [...document.querySelectorAll(".game__square")];

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

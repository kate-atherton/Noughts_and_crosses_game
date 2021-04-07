const gameSquares = document.querySelectorAll(".game__square");
const shapeSelectorWrapper = document.querySelector(".game__choose");
const shapeSelectors = document.querySelectorAll(".game__selector");
const startButton = document.querySelector(".game__button");
const gameWrapper = document.querySelector(".game__wrapper");
const gameBoard = document.querySelector(".game__board");
const gameTurn = document.querySelector(".game__turn");
const gameTurnImage = document.querySelector(".game__turn-image");
const NOUGHT_PATH_TURN = "img/noughtImageTurn.jpg";
const CROSS_PATH_TURN = "img/crossImageTurn.jpg";
const flipButton = document.querySelector(".sidebar__nav-btn");
const flipCardInner = document.querySelector(".flipcard-inner");
let resultMessage;

const view = {
  createBoard: (state) => {
    state.gameBoard.forEach((pos, index) => {
      if (pos === 1) {
        gameSquares[index].src = state.computerPath;
      } else if (pos === -1) {
        gameSquares[index].src = state.playerPath;
      } else {
        gameSquares[index].src = state.blankPath;
      }
    });

    if (state.turn === "player") {
      gameTurnImage.src = state.playerPathTurn;
    } else {
      gameTurnImage.src = state.computerPathTurn;
    }
  },

  addHandlerPlayerClick: (handler) => {
    gameSquares.forEach((square) => {
      square.addEventListener("click", () => {
        return handler(square);
      });
    });
  },

  addHandlerSelectorClick: (handler) => {
    shapeSelectors.forEach((selector) => {
      selector.addEventListener("click", () => {
        return handler(selector);
      });
    });
  },

  switchSelectors: () => {
    shapeSelectors.forEach((selector) => {
      selector.classList.toggle("game__selector--active");
    });
  },

  addHandlerStartClick: (handler) => {
    startButton.addEventListener("click", () => {
      return handler();
    });
  },

  renderResult: (result) => {
    gameBoard.classList.add("game__board--inactive");
    gameTurn.classList.remove("game__turn--active");
    shapeSelectorWrapper.classList.add("game__choose--active");
    startButton.classList.add("game__button-active");
    startButton.innerHTML = "Play again";

    resultMessage = document.createElement("p");
    gameWrapper.appendChild(resultMessage);
    resultMessage.classList.add("game__message");
    resultMessage.innerHTML = `${
      result === 0 ? "It's a draw" : "Computer wins"
    }`;
  },

  resetView: () => {
    gameBoard.classList.remove("game__board--inactive");
    startButton.innerHTML = "Reset Game";
    shapeSelectorWrapper.classList.remove("game__choose--active");
    gameTurn.classList.add("game__turn--active");

    if (document.contains(resultMessage)) {
      resultMessage.remove();
    }
    gameBoard.classList.remove("game__board--inactive");
  },

  addHandlerFlip: () => {
    flipButton.addEventListener("click", () => {
      flipCardInner.classList.toggle("flipcard-inner--flip");
    });
  },
};

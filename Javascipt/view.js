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

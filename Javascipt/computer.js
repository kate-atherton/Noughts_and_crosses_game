// const computerTurn = (playerArray, computerArray) => {
//   if (isGameDraw(playerArray, computerArray)) {
//     gameOver("draw");
//   }
//   if (currentlyPlaying()) {
//     // showImage(computerGo);
//     if (firstTurn()) {
//       if (squareFree(middleSquare, playerArray, computerArray)) {
//         makeComputerMove(middleSquare);
//       } else {
//         makeComputerMove(freeCornerSquare(playerArray, computerArray));
//       }
//     } else if (
//       twoOutOfThree(computerArray, playerArray, computerArray) !== null
//     ) {
//       makeComputerMove(
//         twoOutOfThree(computerArray, playerArray, computerArray)
//       );
//       gameOver();
//     } else if (
//       twoOutOfThree(playerArray, playerArray, computerArray) !== null
//     ) {
//       makeComputerMove(twoOutOfThree(playerArray, playerArray, computerArray));
//     } else if (forkDilemma(playerArray, computerArray) !== null) {
//       makeComputerMove(forkDilemma(playerArray, computerArray));
//     } else {
//       makeComputerMove(freeCornerSquare(playerArray, computerArray));
//     }

//     // hideImage(computerGo);
//     // showImage(playerGo);
//   }
// };

// const isGameDraw = (playerArray, computerArray) => {
//   let blankSquares = [];
//   squareCoordinates.forEach((coord) => {
//     if (squareFree(coord, playerArray, computerArray)) {
//       blankSquares.push(coord);
//     }
//   });
//   if (blankSquares.length < 1) {
//     return true;
//   }
//   return false;
// };

// const freeCornerSquare = (playerArray, computerArray) => {
//   let cornerSquares = squareCoordinates.filter((squareCoord) =>
//     isCorner(squareCoord)
//   );
//   let randomCornerSquares = shuffleArray(cornerSquares);
//   for (let i = 0; i < randomCornerSquares.length; i++) {
//     if (squareFree(randomCornerSquares[i], playerArray, computerArray)) {
//       return randomCornerSquares[i];
//     }
//   }
//   return null;
// };

// //check if circle has an opportunity to fork
// const forkDilemma = (playerArray, computerArray) => {
//   // check if x and y coordinates are both different to establish if potential fork
//   let forkArray = getUniqueXYValues(playerArray);

//   const getIntersectionCorner = (potentialForkArray) => {
//     const intersectionOptions = [
//       { x: potentialForkArray[0].x, y: potentialForkArray[1].y },
//       { x: potentialForkArray[1].x, y: potentialForkArray[0].y },
//     ];
//     const [intersectionCorner] = intersectionOptions.filter((squareCoord) =>
//       isCorner(squareCoord)
//     );
//     return intersectionCorner;
//   };

//   if (forkArray !== null) {
//     const intersectionCorner = getIntersectionCorner(forkArray);
//     const lSquares = squareCoordinates.filter(
//       (obj) =>
//         (obj.x === intersectionCorner.x || obj.y === intersectionCorner.y) &&
//         !isMatch(obj, forkArray[0]) &&
//         !isMatch(obj, forkArray[1])
//     );

//     if (
//       lSquares.every((square) => squareFree(square, playerArray, computerArray))
//     ) {
//       if (getOpposingCorners(forkArray)) {
//         let lSquaresWithoutCorner = lSquares.filter(
//           (obj) => !isMatch(obj, intersectionCorner)
//         );
//         let randomLSquare = shuffleArray(lSquaresWithoutCorner);
//         return randomLSquare[0];
//       } else {
//         return intersectionCorner;
//       }
//     } else {
//       return null;
//     }
//   }

//   return null;
// };

// //establish if circle or cross is one away from winning
// const twoOutOfThree = (compOrPlayerArray, playerArray, computerArray) => {
//   const findThirdSquare = (arr, playerArray, computerArray) => {
//     //to establish if diagonal
//     let countSameXYCoord = 0;
//     let sameXYCoordArray = [];
//     let countCoordsSumTwo = 0;
//     let coordsSumTwoArray = [];
//     //to establish if vertical/horizontal line
//     let XValuesArray = [];
//     let YValuesArray = [];
//     let duplicateX = null;
//     let duplicateY = null;

//     for (let i = 0; i < arr.length; i++) {
//       if (arr[i].x === arr[i].y) {
//         countSameXYCoord += 1;
//         sameXYCoordArray.push(arr[i]);
//       }
//       if (arr[i].x + arr[i].y === 2) {
//         countCoordsSumTwo += 1;
//         coordsSumTwoArray.push(arr[i]);
//       }
//       if (countSameXYCoord === 2) {
//         let thirdBox = {
//           x: 3 - (sameXYCoordArray[0].x + sameXYCoordArray[1].x),
//           y: 3 - (sameXYCoordArray[0].y + sameXYCoordArray[1].y),
//         };
//         if (squareFree(thirdBox, playerArray, computerArray)) {
//           return thirdBox;
//         }
//       }
//       if (countCoordsSumTwo === 2) {
//         let thirdBox = {
//           x: 3 - (coordsSumTwoArray[0].x + coordsSumTwoArray[1].x),
//           y: 3 - (coordsSumTwoArray[0].y + coordsSumTwoArray[1].y),
//         };
//         if (squareFree(thirdBox, playerArray, computerArray)) {
//           return thirdBox;
//         }
//       }
//       if (XValuesArray.includes(arr[i].x)) {
//         duplicateX = arr[i].x;
//       }

//       if (YValuesArray.includes(arr[i].y)) {
//         duplicateY = arr[i].y;
//       }

//       XValuesArray.push(arr[i].x);
//       YValuesArray.push(arr[i].y);

//       if (duplicateX !== null) {
//         let duplicates = arr.filter((obj) => obj.x === duplicateX);
//         let thirdBox = {
//           x: duplicateX,
//           y: 3 - (duplicates[0].y + duplicates[1].y),
//         };
//         if (squareFree(thirdBox, playerArray, computerArray)) {
//           return thirdBox;
//         }
//       }

//       if (duplicateY !== null) {
//         let duplicates = arr.filter((obj) => obj.y === duplicateY);

//         let thirdBox = {
//           x: 3 - (duplicates[0].x + duplicates[1].x),
//           y: duplicateY,
//         };

//         if (squareFree(thirdBox, playerArray, computerArray)) {
//           return thirdBox;
//         }
//       }
//     }

//     return null;
//   };

//   return findThirdSquare(compOrPlayerArray, playerArray, computerArray);
// };

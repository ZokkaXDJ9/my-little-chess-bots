const isPathClear = (currentX, currentY, newX, newY, squares) => {
  if (!squares || squares.length !== 64) {
    console.error("Invalid squares array");
    return false;
  }

  const deltaX = Math.sign(newX - currentX);
  const deltaY = Math.sign(newY - currentY);
  let x = currentX + deltaX;
  let y = currentY + deltaY;

  while (x !== newX || y !== newY) {
    if (x < 0 || x >= 8 || y < 0 || y >= 8) {
      return false;
    }
    if (squares[y * 8 + x]) {
      return false;
    }
    x += deltaX;
    y += deltaY;
  }
  return true;
};

const getPieceColor = (pieceType) => {
  if (!pieceType) return null;
  return pieceType.startsWith("white") ? "white" : "black";
};

export const isValidRookMove = (currentX, currentY, newX, newY, squares) => {
  return (
    (newX === currentX || newY === currentY) &&
    isPathClear(currentX, currentY, newX, newY, squares)
  );
};

export const isValidKnightMove = (currentX, currentY, newX, newY) => {
  return (
    (Math.abs(newX - currentX) === 2 && Math.abs(newY - currentY) === 1) ||
    (Math.abs(newX - currentX) === 1 && Math.abs(newY - currentY) === 2)
  );
};

export const isValidBishopMove = (currentX, currentY, newX, newY, squares) => {
  return (
    Math.abs(newX - currentX) === Math.abs(newY - currentY) &&
    isPathClear(currentX, currentY, newX, newY, squares)
  );
};

export const isValidQueenMove = (currentX, currentY, newX, newY, squares) => {
  return (
    (newX === currentX ||
      newY === currentY ||
      Math.abs(newX - currentX) === Math.abs(newY - currentY)) &&
    isPathClear(currentX, currentY, newX, newY, squares)
  );
};

export const isValidKingMove = (currentX, currentY, newX, newY) => {
  return Math.abs(newX - currentX) <= 1 && Math.abs(newY - currentY) <= 1;
};

export const isValidPawnMove = (
  pieceType,
  currentX,
  currentY,
  newX,
  newY,
  squares
) => {
  const direction = pieceType.startsWith("white") ? -1 : 1;
  const startingRow = pieceType.startsWith("white") ? 6 : 1;

  // Move forward
  if (newX === currentX && !squares[newY * 8 + newX]) {
    if (newY - currentY === direction) {
      return true;
    }
    if (currentY === startingRow && newY - currentY === 2 * direction) {
      return !squares[(currentY + direction) * 8 + newX];
    }
  }

  // Capture
  if (Math.abs(newX - currentX) === 1 && newY - currentY === direction) {
    return (
      getPieceColor(squares[newY * 8 + newX]) ===
      (pieceType.startsWith("white") ? "black" : "white")
    );
  }

  return false;
};

export const isValidMove = (
  pieceType,
  currentPosition,
  targetPosition,
  squares
) => {
  const [currentX, currentY] = getPosition(currentPosition);
  const [newX, newY] = getPosition(targetPosition);
  const movingPieceColor = getPieceColor(pieceType);

  const targetPieceType = squares[newY * 8 + newX];
  const targetPieceColor = getPieceColor(targetPieceType);

  if (targetPieceColor === movingPieceColor) {
    return false;
  }

  switch (pieceType.split("-")[1]) {
    case "rook":
      return isValidRookMove(currentX, currentY, newX, newY, squares);
    case "knight":
      return isValidKnightMove(currentX, currentY, newX, newY);
    case "bishop":
      return isValidBishopMove(currentX, currentY, newX, newY, squares);
    case "queen":
      return isValidQueenMove(currentX, currentY, newX, newY, squares);
    case "king":
      return isValidKingMove(currentX, currentY, newX, newY);
    case "pawn":
      return isValidPawnMove(
        pieceType,
        currentX,
        currentY,
        newX,
        newY,
        squares
      );
    default:
      return false;
  }
};

export const getPosition = (position) => {
  const x = position % 8;
  const y = Math.floor(position / 8);
  return [x, y];
};

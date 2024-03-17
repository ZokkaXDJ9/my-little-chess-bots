// Piece.jsx
import React from "react";
import BlackRook from "./Pieces/BlackRook";
import BlackPawn from "./Pieces/BlackPawn";
import BlackKnight from "./Pieces/BlackKnight";
import BlackBishop from "./Pieces/BlackBishop";
import BlackQueen from "./Pieces/BlackQueen";
import BlackKing from "./Pieces/BlackKing";
import WhiteRook from "./Pieces/WhiteRook";
import WhitePawn from "./Pieces/WhitePawn";
import WhiteKnight from "./Pieces/WhiteKnight";
import WhiteBishop from "./Pieces/WhiteBishop";
import WhiteQueen from "./Pieces/WhiteQueen";
import WhiteKing from "./Pieces/WhiteKing";

const pieces = {
  "black-rook": BlackRook,
  "black-pawn": BlackPawn,
  "black-knight": BlackKnight,
  "black-bishop": BlackBishop,
  "black-queen": BlackQueen,
  "black-king": BlackKing,
  "white-rook": WhiteRook,
  "white-pawn": WhitePawn,
  "white-knight": WhiteKnight,
  "white-bishop": WhiteBishop,
  "white-queen": WhiteQueen,
  "white-king": WhiteKing,
};

function Piece({ type }) {
  const PieceComponent = pieces[type];

  // Ensure PieceComponent is defined before attempting to destructure
  if (!PieceComponent) {
    return null;
  }

  // Pass the position as props to PieceComponent
  return <PieceComponent />;
}

export default Piece;

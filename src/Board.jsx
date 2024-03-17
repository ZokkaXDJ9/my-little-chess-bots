import React from "react";
import Square from "./Square";
import Piece from "./components/Piece";
import "./css/Board.css";
import chessboardSvg from "./images/Chessboard.svg";
import initialBoardState from "./initialBoardState";
import * as movementPatterns from "./movementPatterns";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: initialBoardState,
      selectedSquare: -1,
      validMoves: [],
      currentTurn: "white",
      inCheck: false,
      inCheckmate: false,
    };
  }

  handleClick(i) {
    const { squares, selectedSquare, validMoves, currentTurn } = this.state;

    if (selectedSquare === -1) {
      if (squares[i] && squares[i].startsWith(currentTurn)) {
        const moves = this.calculateValidMoves(squares[i], i, squares);
        this.setState({ selectedSquare: i, validMoves: moves });
      }
    } else {
      if (validMoves.includes(i)) {
        const newSquares = squares.slice();
        newSquares[i] = newSquares[selectedSquare];
        newSquares[selectedSquare] = null;

        this.setState({
          squares: newSquares,
          selectedSquare: -1,
          validMoves: [],
          currentTurn: currentTurn === "white" ? "black" : "white",
        });
      } else {
        this.setState({ selectedSquare: -1, validMoves: [] });
      }
    }
  }

  calculateValidMoves(piece, position, squares) {
    const moves = [];
    if (!piece || position === undefined || !squares) {
      console.error("Invalid input to calculateValidMoves:", {
        piece,
        position,
        squares,
      });
      return moves;
    }

    const isValidMoveFunction = (
      pieceType,
      currentPosition,
      targetPosition,
      squares
    ) => {
      return movementPatterns.isValidMove(
        pieceType,
        currentPosition,
        targetPosition,
        squares
      );
    };

    for (let i = 0; i < 64; i++) {
      if (isValidMoveFunction(piece, position, i, squares)) {
        moves.push(i);
      }
    }
    return moves;
  }

  renderSquare(pieceType, position) {
    const isValidMove = this.state.validMoves.includes(position);
    const squareClassName = `${isValidMove ? "square valid-move" : "square"}`;

    return (
      <Square
        key={position}
        className={squareClassName}
        onClick={() => this.handleClick(position)}
      >
        {this.renderPiece(pieceType, position)}
      </Square>
    );
  }

  renderPiece(pieceType, position) {
    return (
      <Piece
        type={pieceType}
        position={position}
        onClick={() => this.handleClick(position)}
      />
    );
  }

  createBoard() {
    let board = [];
    for (let row = 0; row < 8; row++) {
      let boardRow = [];
      for (let col = 0; col < 8; col++) {
        const position = col * 8 + row;
        boardRow.push(
          this.renderSquare(this.state.squares[position], position)
        );
      }
      board.push(
        <div key={row} className="board-row">
          {boardRow}
        </div>
      );
    }
    return board;
  }

  render() {
    return (
      <div
        className="board"
        style={{ backgroundImage: `url(${chessboardSvg})` }}
      >
        {this.createBoard()}
        {this.state.inCheckmate && <div className="checkmate">CHECKMATE</div>}
      </div>
    );
  }
}

export default Board;

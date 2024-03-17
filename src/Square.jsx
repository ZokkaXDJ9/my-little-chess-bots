// Square.jsx
import React from "react";

function Square({ children, onClick, isValidMove, className }) {
  return (
    <div className={`square ${className}`} onClick={onClick}>
      {isValidMove && <div className="blue-dot"></div>}
      {children}
    </div>
  );
}

export default Square;

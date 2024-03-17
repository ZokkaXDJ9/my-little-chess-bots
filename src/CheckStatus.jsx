import React, { useState, useEffect } from "react";
import { isKingInCheck } from "./CheckmateLogic";

const CheckStatus = ({ squares, currentTurn }) => {
  const [inCheck, setInCheck] = useState(false);

  useEffect(() => {
    setInCheck(isKingInCheck(squares, currentTurn));
  }, [squares, currentTurn]);

  return (
    <div>
      <h2>Check Status</h2>
      <p>The king is: {inCheck ? "In Check" : "Not In Check"}</p>
    </div>
  );
};

export default CheckStatus;

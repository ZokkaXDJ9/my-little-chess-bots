document.addEventListener("DOMContentLoaded", () => {
  const chessboard = document.getElementById("chessboard");

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      if ((row + col) % 2 === 0) {
        square.className = "white";
      } else {
        square.className = "black";
      }
      chessboard.appendChild(square);
    }
  }
});

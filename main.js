const gameBoard = document.getElementById("game-board");
const mineMap = {};
//
handleClick = function (event) {
    console.log(event.target.className);
}
//
function drawBoard() {
    for (y = 0; y < 8; y++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (x = 0; x < 8; x++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("id", (x + 1));
            row.appendChild(cell);
            cell.addEventListener("click", handleClick);
        }
        gameBoard.appendChild(row);
    }
};
//
drawBoard();
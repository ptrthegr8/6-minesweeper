const gameBoard = document.getElementById("game-board");
const typeOfCell = ["cell", "empty", "bomb"];
const bombArray = [];
const boardArray = [];
//
//
function makeBoard(width, height, minesQty) {
    this.width = width;
    this.height = height;
    this.minesQty = minesQty;
    this.totalCells = this.width * this.height;
    document.getElementById("mines-left").innerHTML = this.minesQty;
    let tileNumber = 0;

    for (i = 0; i < minesQty; i++) {
        var randomNum = Math.floor(Math.random() * (this.totalCells + 1));
        if (!bombArray.includes(randomNum) && randomNum !== 0) {
            bombArray.push(randomNum);
        } else {
            i--
        }
    }
    console.log(bombArray);

    this.drawBoard = function () {
        for (let y = 0; y < height; y++) {
            let row = document.createElement("div");
            boardArray.push([]);
            row.classList.add("row");
            for (let x = 0; x < width; x++) {
                let tile = document.createElement("div");
                tile.classList.add("cell");
                tileNumber = tileNumber + 1
                tile.dataset.tileNum = tileNumber;
                row.appendChild(tile);
                boardArray[y].push(tileNumber);
                tile.addEventListener("click", function eventHandler(event) {
                    let cell = event.target;
                    if (bombArray.includes(Number(cell.dataset.tileNum))) {
                        tile.classList.add("mine")
                    }

                });
            }
            gameBoard.appendChild(row);
        }

    };

}
//
function timer() {
    var start = new Date().getTime();
    var elapsed = '0.0';
    window.setInterval(function () {
        var time = new Date().getTime() - start;
        elapsed = Math.floor(time / 100) / 10;
        if (Math.round(elapsed) == elapsed) {
            elapsed += '.0';
        }
        document.getElementById("time-left").innerHTML = elapsed;
    }, 100);
};

//
var board = new makeBoard(8, 8, 10);
board.drawBoard();
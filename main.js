const gameBoard = document.getElementById("game-board");
const bombArray = [];
const boardArray = [];
// let fwidth;
// let fheight;
// let fmines;
// function getInfo() {
//     fwidth = document.forms.myForm.fwidth.value;
//     fheight = document.forms.myForm.fheight.value;
//     fmines = document.forms.myForm.fmines.value;
//     return fwidth, fheight, fmines;
// }
// getInfo();

// constructor function for board
function Board(width, height, mines) {
    let click = 0;
    this.width = width;
    this.height = height;
    this.minesQty = mines;
    this.totalCells = this.width * this.height;
    document.getElementById("mines-left").innerHTML = this.minesQty;
    let tileNumber = 0;
    // creates an array of random locations for bombs, pushes to bombArray for reference
    for (i = 0; i < this.minesQty; i++) {
        var randomNum = Math.round(Math.random() * (this.totalCells + 1));
        if (!bombArray.includes(randomNum) && randomNum !== 0) {
            bombArray.push(randomNum);
        } else {
            i--
        }
    };
    //
    console.log(bombArray);
    // Draws the board
    this.drawBoard = function () {
        for (let y = 0; y < height; y++) {
            let row = document.createElement("div");
            boardArray.push([]);
            row.classList.add("row");
            for (let x = 0; x < width; x++) {
                let tile = document.createElement("div");
                tile.classList.add("cell");
                tileNumber = tileNumber + 1;
                tile.dataset.tileNumber = tileNumber;
                tile.dataset.row = y;
                tile.dataset.col = x;
                row.appendChild(tile);
                boardArray[y].push(tileNumber);
                // adds event listeners
                tile.addEventListener("click", this.handleClickLeft);
                tile.addEventListener("contextmenu", this.handleClickRight, false);
            }
            gameBoard.appendChild(row);
        }

    };
    // Left Click
    this.handleClickLeft = function () {
        let cell = event.target;
        let typeOfCell = cell.className;
        console.log(event.target.dataset);
        console.log(typeOfCell);
        //adds mine css class if in bombArray
        if (bombArray.includes(Number(cell.dataset.tileNumber))) {
            cell.classList.add("mine");
            //alerts you if you hit a mine
            if (cell.className === "cell mine") {
                setTimeout(function () {
                    alert("I'm afraid your luck has run out.");
                }, 500);
                // location.reload();
            }
        };
        //adds empty class if not in bombArray
        if (!bombArray.includes(Number(cell.dataset.tileNumber))) {
            cell.classList.add("empty");
            click++;
            board.timer();
            console.log(click);
        }
    };
    // Right Click
    this.handleClickRight = function (event) {
        event.preventDefault();
        if (event.target.className === "cell") {
            if (board.minesQty > 0) {
            event.target.classList.add("flag");
            document.getElementById("mines-left").innerHTML = board.minesQty -= 1
        }
        } else if (event.target.className === "cell flag") {
            event.target.classList.remove("flag");
            document.getElementById("mines-left").innerHTML = board.minesQty += 1
        }
        return false;
    };
    // this.checkNeighbors = function () {
    //     var queue = [];
    //     rowNum = Number(event.target.dataset.row);
    //     colNum = Number(event.target.dataset.col);
    //     queue.push([rowNum, colNum]);
    //     console.log(queue);
    //     while (queue.length) {
    //         queue.shift();
    //     };
    // };
    // timer function
    this.timer = function () {
        if (click === 1) {
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
        }
    }
};

// 
var board = new Board(8, 8, 10);
board.drawBoard();
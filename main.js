const gameBoard = document.getElementById("game-board");
const bombArray = [];
const boardArray = [];
// let fwidth = document.forms["myForm"]["width"].value;
// let fheight = document.forms["myForm"]["height"].value;
// let fmines = document.forms["myForm"]["mines"].value;
//
// constructor function for board
//
function makeBoard(width, height, mines) {
    let firstClick = false;
    this.width = width;
    this.height = height;
    this.minesQty = mines;
    this.totalCells = this.width * this.height;
    document.getElementById("mines-left").innerHTML = this.minesQty;
    let tileNumber = 0;
    // creates an array of random locations for bombs, pushes to bombArray for reference
    for (i = 0; i < this.minesQty; i++) {
        var randomNum = Math.floor(Math.random() * (this.totalCells + 1));
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
                tileNumber = tileNumber + 1
                tile.dataset.tileNumber = tileNumber;
                tile.dataset.row = y;
                tile.dataset.col = x;
                row.appendChild(tile);
                boardArray[y].push(tileNumber);
                //Event Handler
                tile.addEventListener("click", this.handleClickLeft);
            }
            gameBoard.appendChild(row);
        }
        
    };
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
            cell.classList.add("empty")
            firstClick = true;
        }
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
    this.timer = function () {
        if (firstClick === true) {
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

// function that creates timer and adds to HTML

// call the functions here
var board = new makeBoard(8, 8, 10);
board.drawBoard();
board.timer();
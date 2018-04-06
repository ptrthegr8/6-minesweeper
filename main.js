const gameBoard = document.getElementById("game-board");
const foo = document.querySelectorAll("div.cell");
//
let fwidth = document.getElementById("fwidth");
let fheight = document.getElementById("fheight");
let fmines = document.getElementById("fmines");
var board = new Board(fwidth.value, fheight.value, fmines.value);
fwidth.addEventListener("change", board.changeWidth)
fheight.addEventListener("change", board.changeHeight)
fmines.addEventListener("change", board.changeMines)
// board.drawBoard();

// constructor function for board
function Board(width, height, mines) {
    this.bombArray = [];
    let click = 0;
    this.width = width;
    this.height = height;
    this.minesQty = mines;
    this.totalCells = this.width * this.height;
    document.getElementById("mines-left").innerHTML = this.minesQty;
    let tileNumber = 0;
    // creates an array of random locations for bombs, pushes to this.bombArray for reference
    //
    
    // Draws the board
    this.placeMines = () => {
        this.bombArray = [];
        for (i = 0; i <= this.minesQty; i++) {
            var randomNum = Math.round(Math.random() * (this.totalCells + 1));
            if (!this.bombArray.includes(randomNum) && randomNum !== 0) {
                this.bombArray.push(randomNum);
            } else {
                i--
            }
        };
        
    }
    this.drawBoard = () => {
        this.placeMines();
        if (gameBoard.firstChild) {
            while (gameBoard.firstChild) {
                gameBoard.removeChild(gameBoard.firstChild);
            }
        };
        for (let y = 0; y < this.height; y++) {
            let row = document.createElement("div");

            row.classList.add("row");
            for (let x = 0; x < this.width; x++) {
                let tile = document.createElement("div");
                tile.classList.add("cell");
                tileNumber = tileNumber + 1;
                tile.dataset.tileNumber = tileNumber;
                if (this.bombArray.includes(Number(tile.dataset.tileNumber))) {
                    tile.dataset.minestatus = "mine"
                };
                tile.dataset.row = y;
                tile.dataset.col = x;
                row.appendChild(tile);

                // adds event listeners
                tile.addEventListener("click", this.handleClickLeft);
                tile.addEventListener("contextmenu", this.handleClickRight, false);
            }
            gameBoard.appendChild(row);
        }
    };
    // Left Click
    this.handleClickLeft = () => {
        let cell = event.target;
        let typeOfCell = cell.className;
        console.log(event.target.dataset);
        console.log(typeOfCell);
        //adds mine css class if in this.bombArray
        if (this.bombArray.includes(Number(cell.dataset.tileNumber))) {
            cell.classList.add("mine");
            //alerts you if you hit a mine
            if (cell.className === "cell mine") {
                setTimeout(function () {
                    alert("I'm afraid your luck has run out.");
                }, 500);
                // location.reload();
                board.loser();
            }
        };
        //adds empty class if not in this.bombArray
        if (!this.bombArray.includes(Number(cell.dataset.tileNumber))) {
            cell.classList.add("empty");
            click++;
            board.timer();
        };
    };
    // Right Click
    this.handleClickRight = (event) => {
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
    this.changeWidth = (event) => {
        this.width = event.target.value;
    };
    this.changeHeight = (event) => {
        this.height = event.target.value;
    }
    this.changeMines = (event) => {
        this.minesQty = event.target.value;
    }
    // loss function 
    this.loser = function () {
        for (let i = 0; i < foo.length; i++) {

        }
    };

    // timer function
    this.timer = () => {
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
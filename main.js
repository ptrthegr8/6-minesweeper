const gameBoard = document.getElementById("game-board");
//
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
};
//
function makeBoard(width, height, minesQty) {
    for (let y = 0; y < height; y++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let x = 0; x < width; x++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("id", (x + 1));
            row.appendChild(cell);
            cell.addEventListener("click", function (event) {
                console.log(event.target.id);
            });
        }
        gameBoard.appendChild(row);
    }
};
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
var board = new makeBoard(8, 8, 0);
timer();
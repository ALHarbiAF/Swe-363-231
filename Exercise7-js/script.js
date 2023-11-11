
let turn = "X";
let gameEnded = false;
let cellValues = Array(9).fill(null);

// Utility functions
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]            
    ];

    for (let combo of winningCombinations) {
        if (cellValues[combo[0]] && cellValues[combo[0]] === cellValues[combo[1]] && cellValues[combo[0]] === cellValues[combo[2]]) {
            document.getElementById("turn").innerText = "Player " + turn + " wins!";
            combo.forEach(index => document.getElementsByClassName("cell")[index].classList.add("winner"));
            gameEnded = true;
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return cellValues.every(value => value !== null);
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.getElementsByClassName("cell");
    const board = document.querySelector(".board");
    const turnDisplay = document.getElementById("currentTurn");
    const resetButton = document.getElementById("reset");

    board.addEventListener("click", function (event) {
        if (gameEnded) return;

        let cell = event.target;
        let index = Array.from(cells).indexOf(cell);

        if (cellValues[index] !== null) return;  

        cell.innerText = turn;
        cellValues[index] = turn;
        cell.style.backgroundColor = turn === "X" ? "#ADD8E6" : "#90EE90";  
        if (!checkWinner()) {
            if (checkDraw()) {
                document.getElementById("turn").innerText = "Draw!";
                gameEnded = true;
            } else {
                turn = turn === "X" ? "O" : "X";
                turnDisplay.innerText = turn;
            }
        }
    });

    resetButton.addEventListener("click", function () {
        cellValues.fill(null);
        gameEnded = false;
        turn = "X";
        turnDisplay.innerText = turn;
        document.getElementById("turn").innerText = "Now it's " + turn + "'s turn";

        Array.from(cells).forEach(cell => {
            cell.innerText = '';
            cell.style.backgroundColor = "beige";
            cell.classList.remove("winner");
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('signature-pad');
    var clearButton = document.getElementById('clear-pad');
    var signatureInput = document.getElementById('signature-data');
    var ctx = canvas.getContext('2d');
    var drawing = false;
    var lastX = 0;
    var lastY = 0;

    function startDrawing(e) {
        drawing = true;
        lastX = e.clientX - canvas.offsetLeft;
        lastY = e.clientY - canvas.offsetTop;
    }

    function stopDrawing() {
        drawing = false;
       
        signatureInput.value = canvas.toDataURL();
    }

    function draw(e) {
        if (!drawing) return;

        var x = e.clientX - canvas.offsetLeft;
        var y = e.clientY - canvas.offsetTop;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastX = x;
        lastY = y;
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    clearButton.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        signatureInput.value = '';
    });

   
    canvas.addEventListener('touchstart', function(e) {
        var touch = e.touches[0];
        startDrawing(touch);
    });

    canvas.addEventListener('touchmove', function(e) {
        var touch = e.touches[0];
        draw(touch);
    });

    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);
});


let turn = "X";
let gameEnded = false;
let cellValues = Array(9).fill(null);
let currentSelectedIndex = 0;

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

function updateCurrentSelectedCell(oldIndex, newIndex) {
    cells[oldIndex].classList.remove('selected');
    cells[newIndex].classList.add('selected');
}

function checkDraw() {
    return cellValues.every(value => value !== null);
}


function updateCurrentSelectedCell(newIndex) {
    
    cells.forEach(cell => cell.classList.remove('selected'));
   
    cells[newIndex].classList.add('selected');
}

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

document.addEventListener('keydown', function(event) {
    if (gameEnded) return;

    let handled = false;

    switch (event.key) {
        case 'ArrowLeft':
            if (currentSelectedIndex % 3 > 0) {
                currentSelectedIndex--;
                handled = true;
            }
            break;
        case 'ArrowRight':
      
            if (currentSelectedIndex % 3 < 2) {
                currentSelectedIndex++;
                handled = true;
            }
            break;
        case 'ArrowUp':
         
            if (currentSelectedIndex > 2) {
                currentSelectedIndex -= 3;
                handled = true;
            }
            break;
        case 'ArrowDown':
           
            if (currentSelectedIndex < 6) {
                currentSelectedIndex += 3;
                handled = true;
            }
            break;
        case 'Enter':
           
            if (cellValues[currentSelectedIndex] === null && !cells[currentSelectedIndex].classList.contains('winner')) {
                cells[currentSelectedIndex].click();
            }
            handled = true;
            break;
    }

    if (handled) {
        updateCurrentSelectedCell();
        event.preventDefault(); 
    }
});


function updateCurrentSelectedCell() {

    Array.from(cells).forEach(cell => cell.classList.remove('selected'));
    
    cells[currentSelectedIndex].classList.add('selected');
}
});


function resetGame() {
    cellValues = Array(9).fill(null); 
    gameEnded = false; 
    turn = "X"; 
    currentSelectedIndex = 0; 
    document.getElementById("turn").innerText = "Now it's X's turn"; 
    
    Array.from(cells).forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = ''; 
        cell.classList.remove("winner", "selected"); 
    });
    
  
    updateCurrentSelectedCell();
}


document.getElementById("reset").addEventListener("click", resetGame);
const cells = document.getElementsByClassName("cell");
updateCurrentSelectedCell(0);


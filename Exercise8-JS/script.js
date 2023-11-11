document.addEventListener('DOMContentLoaded', function() {
    const cardData = [
        {
            imgSrc: "images/consult.webp",
            title: "We offer some of the best consulting in the middle east",
            date: "Jan 1, 2023"
        },
        {
            imgSrc: "images/management-consulting-vs-investment-banking.jpg",
            title: "We fight for our clients!",
            date: "Jan 1, 2023"
        },
        {
            imgSrc: "images/Consulting_Strategy_1920x1080_BW.webp",
            title: "We expedite your business expenditures",
            date: "Jan 25, 2023"
        }
       
    ];

    function createCard(cardInfo) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${cardInfo.imgSrc}" class="card-img-top" alt="${cardInfo.title}">
            <div class="card-body">
                <h5 class="card-title">${cardInfo.title}</h5>
                <p class="card-date">${cardInfo.date}</p>
            </div>
        `;
        return card;
    }
 

   
    const cardContainer = document.getElementById('card-container');

   
    cardData.forEach(cardInfo => {
        const cardElement = createCard(cardInfo);
        cardContainer.appendChild(cardElement);
    });
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



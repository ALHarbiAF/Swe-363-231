document.addEventListener('DOMContentLoaded', function() {
    var camera, scene, renderer, geometry, material, cube;
    var screensaverTimeout;

    function init() {
        // Set up the scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Set up the renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.display = 'none'; // Start with the renderer hidden
        document.body.appendChild(renderer.domElement);

        // Add a cube to the scene
        geometry = new THREE.BoxGeometry();
        material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Set up screensaver activation
        resetScreensaverTimer();
    }

    function animate() {
        requestAnimationFrame(animate); // Request the next frame

        // Rotate the cube if the screensaver is active
        if (renderer.domElement.style.display === 'block') {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        }

        renderer.render(scene, camera); // Render the scene
    }

    function showScreensaver() {
        renderer.domElement.style.display = 'block'; // Show the canvas
    }

    function hideScreensaver() {
        renderer.domElement.style.display = 'none'; // Hide the canvas
    }

    function resetScreensaverTimer() {
        clearTimeout(screensaverTimeout);
        hideScreensaver();
        screensaverTimeout = setTimeout(showScreensaver, 60000); // Set timeout for 1 minute
    }

    // Listen for any movement or key presses
    ['mousemove', 'keydown', 'mousedown', 'touchstart'].forEach(function(event) {
        document.addEventListener(event, resetScreensaverTimer);
    });

    // Handle window resizing
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Initialize and animate scene
    init();
    animate();

    
    
    
    
    
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

    function fetchWeatherData(riyadh) {
        const apiKey = 'c9c1ab17fc247c1148e48b3974987163'; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${riyadh}&appid=${'c9c1ab17fc247c1148e48b3974987163'}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => console.error('Failed to fetch weather data:', error));
    }

    
    function displayWeatherData(data) {
        const weatherContainer = document.getElementById('weather-container');
        const weatherHTML = `
            <div class="weather-card card">
                <div class="card-body">
                    <h5 class="card-title">${data.name} Weather</h5>
                    <p class="card-text">Temperature: ${data.main.temp} °C</p>
                    <p class="card-text">Humidity: ${data.main.humidity}%</p>
                    <p class="card-text">Sky: ${data.weather[0].description}</p>
                </div>
            </div>
        `;
        weatherContainer.innerHTML = weatherHTML;
    }

   
    fetchWeatherData('Riyadh');

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


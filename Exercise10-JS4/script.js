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

    const createCard = cardInfo => {
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
    };
    
    
    const cardElements = cardData.map(createCard);
    
    
    const cardContainer = document.getElementById('card-container');
    
    cardElements.forEach(cardElement => cardContainer.appendChild(cardElement));
   
    
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


   
    
    class Article {
        constructor(title, content, author, publishedDate) {
            this.title = title;
            this.content = content;
            this.author = author;
            this.publishedDate = publishedDate;
        }
    
        render() {
            const articleElement = document.createElement('div');
            articleElement.className = 'article';
            articleElement.innerHTML = `
                <h2>${this.title}</h2>
                <p>${this.content}</p>
                <p>Author: ${this.author}</p>
                <p>Published on: ${this.publishedDate}</p>
            `;
            return articleElement;
        }
    }
    
    
    const articles = [
        new Article('Challenges in Business Consulting', 'The consulting industry is not without its challenges. It requires staying up to date with the latest trends and technologies, dealing with complex and sensitive business issues, and managing client expectations. Moreover, consultants often face the challenge of proving the ROI of their services. for article 1', 'F,Mohsin', 'Jan 1, 2023'),
   
        
    ];
    
    
    function renderArticles(articles) {
        const container = document.getElementById('card-container');
        articles.forEach(article => {
            container.appendChild(article.render());
        });
    }
    
    
    document.addEventListener('DOMContentLoaded', function() {
        renderArticles(articles);
    });
 document.addEventListener('DOMContentLoaded', (() => {
        const renderArticle = (() => {
            const articleData = {
                title: 'The Importance of Business Consulting',
                content: 'Consultants are experts in their field who offer professional advice and guidance. They work across a wide range of sectors, including management, strategy, IT, finance, marketing, HR, and supply chain management. Their primary role is to provide expert opinions, analysis, and solutions to an organization that it cannot provide internally.',
                author: 'John Doe',
                publishedDate: 'April 1, 2023'
            };
    
            const createArticleElement = ({ title, content, author, publishedDate }) => {
                const articleElement = document.createElement('div');
                articleElement.className = 'article';
                articleElement.innerHTML = `
                    <h2>${title}</h2>
                    <p>${content}</p>
                    <p>Author: ${author}</p>
                    <p>Published on: ${publishedDate}</p>
                `;
                return articleElement;
            };
    
            const articleContainer = document.getElementById('card-container');
            articleContainer.appendChild(createArticleElement(articleData));
        })();
  
    }))();
    
    
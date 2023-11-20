
let character = document.getElementById('character');
let gameContainer = document.getElementById('game-container');
let scoreDisplay = document.getElementById('score');
let gameOverMessage = document.getElementById('game-over-message');
let playAgainButton = document.getElementById('play-again');
let score = 0;
let gameActive = true;

function jump() {
    if (!gameActive) return;

    if (character.classList != 'jumping') {
        character.style.bottom = '100px'; // Move the character up
        character.style.backgroundColor = '#FFD700'; // Change background color
        setTimeout(function () {
            character.style.bottom = '0'; // Move the character back down
            character.style.backgroundColor = '#4CAF50'; // Change back to original color
            character.classList.remove('jumping');
        }, 300);
    }
}

function createObstacle() {
    if (!gameActive) return;

    let obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = '600px';

    gameContainer.appendChild(obstacle);

    let obstacleMove = setInterval(() => {
        if (!gameActive) clearInterval(obstacleMove);

        let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

        if (obstacleLeft < -20) {
            obstacle.remove();
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        } else {
            obstacle.style.left = obstacleLeft - 5 + 'px';
        }

        checkCollision(obstacle);
    }, 20);
}

function checkCollision(obstacle) {
    let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
    let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    let obstacleBottom = parseInt(window.getComputedStyle(obstacle).getPropertyValue('bottom'));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

    if (
        characterLeft < obstacleLeft + obstacle.offsetWidth &&
        characterLeft + character.offsetWidth > obstacleLeft &&
        characterBottom <= obstacleBottom
    ) {
        gameOver();
    }
}

function gameOver() {
    gameActive = false;
    gameOverMessage.style.display = 'block';
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 32) {
        jump();
    }
});

// Initial obstacle creation
setInterval(createObstacle, 2000);

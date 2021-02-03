const cvs = document.getElementById('snake');
const ctx = cvs.getContext("2d");

const box = 32;

const ground = new Image();
ground.src = "SnakeImages/ground.png";

const apple = new Image();
apple.src = "SnakeImages/apple.png";

// Load audo files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

// Audio Sources
dead.src = "Audio/dead.mp3";
eat.src = "Audio/eat.mp3";
up.src = "Audio/up.mp3";
left.src = "Audio/left.mp3";
right.src = "Audio/right.mp3";
down.src = "Audio/down.mp3";

let snake = [];
let isDead = false;

// Sets the position of the snake head
snake[0] = {
    x : 9 * box,
    y : 10 * box
}

// Randomizes the position of the apple
let food = {
    x : Math.floor(Math.random() * 17 + 1) * box,
    y : Math.floor(Math.random() * 15 + 3) * box
}

// Create the score variable
let score = 0;

// Snake controller
let d;
document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d!= "RIGHT") {
        if (!isDead) {
            left.play();
        }
        d = "LEFT";
    }
    else if (event.keyCode == 38 && d!= "DOWN") {
        if (!isDead) { // Only plays the audio if the snake is alive
            up.play();
        }
        d = "UP";
    }
    else if (event.keyCode == 39 && d!= "LEFT") {
        if (!isDead) {
            right.play();
        }
        d = "RIGHT";
    }
    else if (event.keyCode == 40 && d!= "UP") {
        if (!isDead) {
            down.play();
        }
        d = "DOWN";
    }
}

// Checks for collision
function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true
        }
    }
    return false;
}

// Draws the gameboard
function draw() {
    ctx.drawImage(ground, 0, 0);

    // Drawing the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i==0)? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(apple, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Direction of travel
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // Checks if snake collides with food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random() * 17 + 1) * box,
            y : Math.floor(Math.random() * 15 + 3) * box
        }
    }
    else {
        // remove the tail
        snake.pop();
    }

    // add new head
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // Game Over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
        isDead = true;
    }

    snake.unshift(newHead)

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);
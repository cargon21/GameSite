function animate() {
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx3.clearRect(0, 0, canvas.width, canvas.height);
    ctx4.clearRect(0, 0, canvas.width, canvas.height);
    ctx5.clearRect(0, 0, canvas.width, canvas.height);

    handleRipples();
    ctx2.drawImage(background2, 0, 0, canvas.width, canvas.height);
    handleParticles();
    frogger.draw();
    frogger.update();
    handleObstacles();
    handleScoreBoard();
    ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height);
    frame++;
    requestAnimationFrame(animate);
}

animate();

// event listeners
window.addEventListener('keydown', function(e) {
    keys = [];
    keys[e.keyCode] = true;

    if (keys[37] || keys[38] || keys[39] || keys[34]) {
        frogger.jump();
    }
});

window.addEventListener('keyup', function(e) {
    delete keys[e.keyCode];
    frogger.moving = false;
    frogger.frameX = 0;
});

function scored() {
    score++;
    gameSpeed += .1;
    frogger.x = canvas.width / 2 - frogger.width;
    frogger.y = canvas.width - frogger.height - 40;
}

function handleScoreBoard() {
    ctx4.fillStyle = 'black';
    ctx4.strokeStyle = 'black';
    ctx4.font = '15px Verdana';
    ctx4.strokeText('Score', 265, 15);
    ctx4.font = '60px Verdana';
    ctx4.fillText(score, 270, 65);
    ctx4.font = '15px Verdana';
    ctx4.strokeText('Collisions: ' + collisionCount, 10, 175);
    ctx4.strokeText('Game Speed: ' + gameSpeed.toFixed(1), 10, 195);
}

function collision(frog, obstacle) {
    return !( frog.x > obstacle.x + obstacle.width ||
              frog.x + frog.width < obstacle.x ||
              frog.y > obstacle.y + obstacle.height ||
              frog.y + frog.height < obstacle.y );
}

// Resets the game 
function resetGame () {
    frogger.x = canvas.width / 2 - frogger.width;
    frogger.y = canvas.width - frogger.height - 40;
    collisionCount++;
    gameSpeed = 1;
    score = 0;
}
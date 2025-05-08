// Board setup
let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns;
let boardHeight = tileSize * rows;
let context;

// Ship setup
let shipWidth = tileSize * 2;
let shipHeight = tileSize;
let shipX = tileSize * columns / 2 - tileSize;
let shipY = tileSize * rows - tileSize * 2;

let ship = {
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight
};

let shipImg;
let shipVelocityX = tileSize; // Ship moving speed

// Alien setup
let alienArray = [];
let alienWidth = tileSize * 2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;

let alienRows = 2;
let alienColumns = 3;
let alienCount = 0;
let alienVelocityX = 1;

// Bullet setup
let bulletArray = [];
let bulletVelocityY = -10; // Bullet moving speed

// Score and game state
let score = 0;
let gameOver = false;

// Sound effects
let laserSound = new Audio('laser.mp3');
let explosionSound = new Audio('explosion.mp3');

// Super laser power state
let superLaserActive = false;
let superLaserUsed = false; // Flag to track if Super Laser was used

// Super laser button
document.getElementById("superLaserBtn").addEventListener("click", function() {
    if (!superLaserUsed) {
        superLaserActive = true;
        superLaserUsed = true;
        // Destroy all aliens
        for (let i = 0; i < alienArray.length; i++) {
            alienArray[i].alive = false;
        }
        alienCount = 0;
        score += 1000; // Bonus points for using super laser
        // Disable the super laser button
        document.getElementById("superLaserBtn").disabled = true;
        setTimeout(() => {
            superLaserActive = false; // Reset after use
        }, 500);
    }
});

// Window setup
window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // Load images
    shipImg = new Image();
    shipImg.src = "./ship.png";
    shipImg.onload = function() {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    };

    alienImg = new Image();
    alienImg.src = "./alien.png";
    createAliens();

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveShip);
    document.addEventListener("keyup", shoot);
};

// Update function for each frame
function update() {
    requestAnimationFrame(update);

    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    // Ship
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    // Aliens
    for (let i = 0; i < alienArray.length; i++) {
        let alien = alienArray[i];
        if (alien.alive) {
            alien.x += alienVelocityX;

            if (alien.x + alien.width >= board.width || alien.x <= 0) {
                alienVelocityX *= -1;
                alien.x += alienVelocityX * 2;
                for (let j = 0; j < alienArray.length; j++) {
                    alienArray[j].y += alienHeight;
                }
            }

            context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);

            if (alien.y + alien.height >= ship.y) {
                gameOver = true;
                alert("Game Over!");
            }
        }
    }

    // Bullets
    for (let i = 0; i < bulletArray.length; i++) {
        let bullet = bulletArray[i];
        bullet.y += bulletVelocityY;
        context.fillStyle = "white";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        // Bullet collision with aliens
        for (let j = 0; j < alienArray.length; j++) {
            let alien = alienArray[j];
            if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
                bullet.used = true;
                alien.alive = false;
                alienCount--;
                score += 100;
                drawExplosion(alien.x, alien.y); // Draw explosion at alien position
                explosionSound.play(); // Play explosion sound
            }
        }
    }

    // Clear bullets that are used or out of bounds
    while (bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0)) {
        bulletArray.shift();
    }

    // Check for next level
    if (alienCount == 0) {
        score += alienColumns * alienRows * 100; // Bonus points
        alienColumns = Math.min(alienColumns + 1, columns / 2 - 2); // Cap at 6
        alienRows = Math.min(alienRows + 1, rows - 4); // Cap at 12
        if (alienVelocityX > 0) {
            alienVelocityX += 0.2; // Speed up aliens
        } else {
            alienVelocityX -= 0.2; // Speed up aliens
        }
        alienArray = [];
        bulletArray = [];
        createAliens();
    }

    // Display score
    context.fillStyle = "white";
    context.font = "16px courier";
    context.fillText(score, 5, 20);
}

// Ship movement
function moveShip(e) {
    if (gameOver) {
        return;
    }

    if (e.code == "ArrowLeft" && ship.x - shipVelocityX >= 0) {
        ship.x -= shipVelocityX;
    } else if (e.code == "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width) {
        ship.x += shipVelocityX;
    }
}

// Create aliens
function createAliens() {
    for (let c = 0; c < alienColumns; c++) {
        for (let r = 0; r < alienRows; r++) {
            let alien = {
                img: alienImg,
                x: alienX + c * alienWidth,
                y: alienY + r * alienHeight,
                width: alienWidth,
                height: alienHeight,
                alive: true
            };
            alienArray.push(alien);
        }
    }
    alienCount = alienArray.length;
}

// Shoot bullets
function shoot(e) {
    if (gameOver) {
        return;
    }

    if (e.code == "Space") {
        // Shoot laser
        let bullet = {
            x: ship.x + shipWidth * 15 / 32,
            y: ship.y,
            width: tileSize / 8,
            height: tileSize / 2,
            used: false
        };
        bulletArray.push(bullet);
        laserSound.play(); // Play laser sound
    }
}

// Detect collisions between bullet and alien
function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

// Draw explosion at the alien's position
function drawExplosion(x, y) {
    let explosionImg = new Image();
    explosionImg.src = "./explosion.png"; // Explosion sprite
    explosionImg.onload = function() {
        context.drawImage(explosionImg, x, y, tileSize, tileSize);
    };
}

// Variables to track scores
let redScore = 0;
let yellowScore = 0;

// Audio setup
const placeDiscSound = new Audio('sounds/place-disc.mp3');
const winSound = new Audio('sounds/win.mp3');
const resetSound = new Audio('sounds/reset.mp3');

// Player turn and column trackers
let val_c1 = 1,
    val_c2 = 1,
    val_c3 = 1,
    val_c4 = 1,
    val_c5 = 1,
    val_c6 = 1,
    val_c7 = 1;
let turn = 1;

document.getElementById('resetButton').addEventListener('click', resetGame);

// Function to update the score display
function updateScore() {
    document.getElementById('redScore').innerText = redScore;
    document.getElementById('yellowScore').innerText = yellowScore;
}

function resetGame() {
    // Reset column trackers
    val_c1 = val_c2 = val_c3 = val_c4 = val_c5 = val_c6 = val_c7 = 1;
    turn = 1;

    // Clear the board by setting all cells to white
    document.querySelectorAll('.column p').forEach((cell) => {
        cell.style.backgroundColor = 'white';
    });

    // Reset the turn indicator
    document.getElementById('whosturn').innerText = "Red's Turn";

    // Play reset sound
    resetSound.play();
}


// Function to check for a winner
function check(player) {
    setTimeout(() => {
        // Vertical check
        for (let i = 1; i <= 7; i++) {
            for (let j = 1; j <= 3; j++) {
                if (
                    document.getElementById(`c${i}r${j}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${i}r${j + 1}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${i}r${j + 2}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${i}r${j + 3}`).style.backgroundColor == `${player}`
                ) {
                    winSound.play();
                    alert(`${player} wins`);
                    if (player === 'red') redScore++;
                    else yellowScore++;
                    updateScore();
                    resetGame();
                    return;
                }
            }
        }

        // Horizontal check
        for (let i = 1; i <= 6; i++) {
            for (let j = 1; j <= 4; j++) {
                if (
                    document.getElementById(`c${j}r${i}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${j + 1}r${i}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${j + 2}r${i}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${j + 3}r${i}`).style.backgroundColor == `${player}`
                ) {
                    winSound.play();
                    alert(`${player} wins`);
                    if (player === 'red') redScore++;
                    else yellowScore++;
                    updateScore();
                    resetGame();
                    return;
                }
            }
        }

        // Diagonal checks
        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 3; j++) {
                if (
                    document.getElementById(`c${i}r${j}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${i + 1}r${j + 1}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${i + 2}r${j + 2}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${i + 3}r${j + 3}`).style.backgroundColor == `${player}`
                ) {
                    winSound.play();
                    alert(`${player} wins`);
                    if (player === 'red') redScore++;
                    else yellowScore++;
                    updateScore();
                    resetGame();
                    return;
                }
            }
        }

        for (let i = 1; i <= 4; i++) {
            for (let j = 6; j >= 4; j--) {
                if (
                    document.getElementById(`c${i}r${j}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${i + 1}r${j - 1}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${i + 2}r${j - 2}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${i + 3}r${j - 3}`).style.backgroundColor == `${player}`
                ) {
                    winSound.play();
                    alert(`${player} wins`);
                    if (player === 'red') redScore++;
                    else yellowScore++;
                    updateScore();
                    resetGame();
                    return;
                }
            }
        }
    }, 200);
}

// Adding event listeners to each column
document.querySelectorAll('.column').forEach((column) => {
    column.addEventListener('click', () => {
        const colNum = eval(`val_${column.id}`);
        eval(`val_${column.id}++`);

        if (colNum <= 6 && turn % 2 !== 0) {
            document.getElementById(`${column.id}r${colNum}`).style.backgroundColor = 'red';
            placeDiscSound.play();
            turn++;
            check('red');
            document.getElementById('whosturn').innerText = "Yellow's Turn";
        } else if (colNum <= 6 && turn % 2 === 0) {
            document.getElementById(`${column.id}r${colNum}`).style.backgroundColor = 'yellow';
            placeDiscSound.play();
            turn++;
            check('yellow');
            document.getElementById('whosturn').innerText = "Red's Turn";
        }
    });
});


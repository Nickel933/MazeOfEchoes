const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const cellSize = canvas.width / maze.length;
let player = { x: 1, y: 1 };

function drawMaze() {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            ctx.fillStyle = maze[y][x] === 1 ? "black" : "white";
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    ctx.fillStyle = "red";
    ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
}

document.addEventListener("keydown", (e) => {
    let dx = 0, dy = 0;
    if (e.key === "w") dy = -1;
    if (e.key === "s") dy = 1;
    if (e.key === "a") dx = -1;
    if (e.key === "d") dx = 1;

    const newX = player.x + dx;
    const newY = player.y + dy;

    if (maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
        drawMaze();
    } else {
        showQuestion();
    }
});

function showQuestion() {
    fetch("/get_question")
        .then(res => res.json())
        .then(data => {
            const userAnswer = prompt(`${data.question}\nA: ${data.options.A}\nB: ${data.options.B}\nC: ${data.options.C}\nD: ${data.options.D}`);
            if (userAnswer.toUpperCase() === data.correct) {
                alert("Correct! Wall disintegrated.");
                maze[player.y + 1][player.x] = 0;
                drawMaze();
            } else {
                alert("Wrong! Find another path.");
            }
        });
}

drawMaze();

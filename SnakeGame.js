const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const cellSize = 20;

const gridWidth = Math.floor(canvas.width / cellSize);
const gridHeight = Math.floor(canvas.height / cellSize);

// 👉 Snake de 5 cubos iniciales
let Snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 }
];

let Direction = { x: 1, y: 0 };
let NextDirection = { x: 1, y: 0 };
let speed = 15;

let gameInterval = setInterval(show, 2000 / speed);

let score = 0;
let GameOver = false;

let Food = generateFood();

function generateFood() {
    let newFood;

    do {
        newFood = {
            x: Math.floor(Math.random() * gridWidth),
            y: Math.floor(Math.random() * gridHeight)
        };
    } while (Snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));

    return newFood;
}

// SOLO UNA VEZ
setInterval(show, 1000 / 15);

document.addEventListener("keydown", changeDirection);

function show() {
    if (GameOver) return;

    // Clean Screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update Direction
    Direction = NextDirection;

    // 👉 MOVE SNAKE (primero mover)
    const head = {
        x: Snake[0].x + Direction.x,
        y: Snake[0].y + Direction.y
    };

    Snake.unshift(head);

    // 👉 COMPROBAR SI COME
    if (head.x === Food.x && head.y === Food.y) {
        score++;

        // nueva comida
        Food = generateFood();
    } else {
        Snake.pop();
    }

    // 👉 DRAW SNAKE (después dibujar)
    ctx.fillStyle = "green";
    Snake.forEach(segment => {
        ctx.fillRect(
            segment.x * cellSize,
            segment.y * cellSize,
            cellSize,
            cellSize
        );
    });

    // Draw Food
    ctx.fillStyle = "red";
    ctx.fillRect(
        Food.x * cellSize,
        Food.y * cellSize,
        cellSize,
        cellSize
    );

    // Draw Border
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function changeDirection(event) {
    const key = event.key;

    if (key === "ArrowUp" && Direction.y === 0) {
        NextDirection = { x: 0, y: -1 };
    }
    else if (key === "ArrowDown" && Direction.y === 0) {
        NextDirection = { x: 0, y: 1 };
    }
    else if (key === "ArrowLeft" && Direction.x === 0) {
        NextDirection = { x: -1, y: 0 };
    }
    else if (key === "ArrowRight" && Direction.x === 0) {
        NextDirection = { x: 1, y: 0 };
    }
}

function restartGame() {
    Snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 }
    ];

    Direction = { x: 1, y: 0 };
    NextDirection = { x: 1, y: 0 };

    score = 0;
    GameOver = false;

    Food = generateFood();
}


document.getElementById("restartBtn").addEventListener("click", restartGame);
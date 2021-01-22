let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

let size = 20;
let color = "#00ff00";
let time = 0.1;
let timer = 0;
let space = 3;
let newPartNeeded = false;
canvas.width = (size + space) * 20 + space;
canvas.height = (size + space) * 20 + space;

let snake = [
    [2 * (size + space) + space, space],
    [size + space * 2, space],
    [space, space],
];

let direction = [1, 0];
let past = [0, 0];

function randomAppleLocation() {
    rand = Math.round(Math.random() * 19);
    return space + rand * (size + space);
}

function generateApple() {
    let x = randomAppleLocation();
    let y = randomAppleLocation();
    while (snake.indexOf([x, y]) != -1) {
        console.log("u suck at coding");
        x = randomAppleLocation();
        y = randomAppleLocation();
    }
    return [x, y];
}

let appleLocation = generateApple();

let animationId;
function animate() {
    //fancy bullshit to make a loop
    animationId = requestAnimationFrame(animate);
    //background
    c.fillStyle = "#fff";
    c.fillRect(0, 0, canvas.width, canvas.height);

    //the fun stuff

    //Check if a new snake part is needed
    if (newPartNeeded) {
        snake.push((-size, -size));
        newPartNeeded = false;
        timer = time;
    }
    //Draw each snake part
    snake.forEach((snek) => {
        c.fillStyle = color;
        c.fillRect(snek[0], snek[1], size, size);
    });

    //Draw an apple
    c.fillStyle = "#ff0000";
    c.fillRect(appleLocation[0], appleLocation[1], size, size);

    //Collide with apple
    if (snake[0][0] == appleLocation[0] && snake[0][1] == appleLocation[1]) {
        newPartNeeded = true;
        appleLocation = generateApple();
    }

    //Collide with self
    if (snake.slice(1).indexOf(snake[0]) != -1) {
        cancelAnimationFrame(animationId);
        console.log("snake collision");
    }

    //Move snake
    if (timer >= time) {
        const x = snake[0][0] + direction[0] * (size + space);
        const y = snake[0][1] + direction[1] * (size + space);
        snake.splice(0, 0, [x, y]);
        snake.pop();
        timer = 0;
        past = direction;
    }

    //borders
    let head = snake[0];
    if (
        head[0] > canvas.width ||
        head[0] < 0 ||
        head[1] > canvas.height ||
        head[1] < 0
    ) {
        console.log("borders");
        cancelAnimationFrame(animationId);
    }

    //timer
    timer += 0.01;
}

animate();
//Keypress listener
window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (key == "w" && past[1] == 0) {
        direction = [0, -1];
    } else if (key == "s" && past[1] == 0) {
        direction = [0, 1];
    } else if (key == "a" && past[0] == 0) {
        direction = [-1, 0];
    } else if (key == "d" && past[0] == 0) {
        direction = [1, 0];
    }
});

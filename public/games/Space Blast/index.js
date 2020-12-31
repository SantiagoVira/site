//Setup the canvas feature
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const x = canvas.width / 2;
const y = canvas.height / 2;
const speed = 4.5;

const scoreDiv = document.getElementById("score");
const scoreDiv2 = document.getElementById("bigScore");
const container = document.getElementById("container");
const Slabel = document.getElementById("Slabel");

//Create classes or blueprints to easily make more
class Player {
    constructor(x, y, rad, col) {
        this.color = col;
        this.radius = rad;
        this.x = x;
        this.y = y;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }
}
class Projectile {
    constructor(x, y, r, c, v) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = c;
        this.velocity = v;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

class Enemy {
    constructor(x, y, r, c, v) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = c;
        this.velocity = v;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

const friction = 0.96;
class Particle {
    constructor(x, y, r, c, v) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = c;
        this.velocity = v;
        this.alpha = 1;
    }
    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.015;
    }
}

//create a player in the very center
let player = new Player(x, y, 15, "white");
let score = 0;
let projectiles = [];
let particles = [];
let enemies = [];
//Set up the initialization
function init() {
    player = new Player(x, y, 15, "white");
    projectiles = [];
    particles = [];
    enemies = [];
    score = 0;

    Slabel.style.display = "none";
}
//Set up Enemies
function spawnEnemies() {
    setInterval(() => {
        const r = 15 + Math.random() * 25;
        let x;
        let y;

        if (Math.random() < 0.5) {
            x = Math.random() > 0.5 ? 0 - r : canvas.width + r;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() > 0.5 ? 0 - r : canvas.height + r;
        }

        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);

        const c = `hsl(${Math.random() * 360}, 50%, 65%)`;
        const v = { x: Math.cos(angle), y: Math.sin(angle) };
        enemies.push(new Enemy(x, y, r, c, v));

        console.log(enemies);
    }, 1000);
}

let animationId;
//Function to move the projectile
function animate() {
    animationId = requestAnimationFrame(animate);
    c.fillStyle = "rgba(0, 0, 0, 0.1)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    scoreDiv.innerHTML = score;
    scoreDiv2.innerHTML = score;
    projectiles.forEach((projectile, index) => {
        projectile.update();
        const x = projectile.x;
        const y = projectile.y;
        const r = projectile.radius;
        const w = canvas.width;
        const h = canvas.height;
        if (x - r < 0 || x + r > w || y - r < 0 || y + r > h) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0);
        }
    });

    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            setTimeout(() => {
                particles.splice(index, 1);
            }, 0);
        } else {
            particle.update();
        }
    });

    enemies.forEach((enemy, index) => {
        enemy.update();

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (dist < enemy.radius + player.radius + 1) {
            cancelAnimationFrame(animationId);
            container.style.display = "flex";
            init();
        }

        projectiles.forEach((projectile, index2) => {
            const dist = Math.hypot(
                projectile.x - enemy.x,
                projectile.y - enemy.y
            );
            //projectile touches enemy
            if (dist < enemy.radius + projectile.radius + 1) {
                for (var i = 0; i < enemy.radius * 1.4; i++) {
                    particles.push(
                        new Particle(
                            projectile.x,
                            projectile.y,
                            Math.random() * 3.75,
                            enemy.color,
                            {
                                x: (Math.random() - 0.5) * (Math.random() * 8),
                                y: (Math.random() - 0.5) * (Math.random() * 8),
                            }
                        )
                    );
                }
                if (enemy.radius - 10 > 8) {
                    //increase score
                    score += 100;
                    gsap.to(enemy, {
                        radius: enemy.radius - 10,
                    });
                    setTimeout(() => {
                        projectiles.splice(index2, 1);
                    }, 0);
                } else {
                    //increase score
                    score += 250;
                    setTimeout(() => {
                        enemies.splice(index, 1);
                        projectiles.splice(index2, 1);
                    }, 0);
                }
            }
        });
    });
    player.draw();
}

//When the user clicks, shoot the pew pew
addEventListener("click", (event) => {
    const angle = Math.atan2(event.clientY - y, event.clientX - x);
    const vel = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
    };
    projectiles.push(new Projectile(x, y, 4, "white", vel));
    console.log(projectiles.length);
});
document.getElementById("StartBtn").addEventListener("click", () => {
    animate();
    spawnEnemies();
    container.style.display = "none";
    Slabel.style.display = "initial";
});
init();

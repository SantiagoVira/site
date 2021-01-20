//Setting up the Brick Background
const bg = document.querySelector("#bg");
const ctx = bg.getContext("2d");
bg.width = innerWidth;
bg.height = innerHeight;

const w = 52.5;
const h = 19.25;

function row(x, y) {
    const num = 2 + Math.ceil(bg.width / (w + 5));
    for (var i = 0; i < num; i++) {
        let x2 = x + (i * w + i * 5);
        ctx.fillStyle = "#d6d6d4";
        ctx.fillRect(x2, y, w, h);
        ctx.rect(x2, y, w, h);
        ctx.stroke();
    }
}
function drawBG() {
    const x = 0;
    const y = 0;
    ctx.fillStyle = "#abaaa7";
    ctx.fillRect(0, 0, bg.width, bg.height);
    const num = 2 + Math.ceil(bg.height / (h + 5));
    for (var i = 0; i < num; i++) {
        row(x + 5, y + 5 + i * (h + 5) * 2);
        row(x + (-(w / 2) + 5), y + h + 10 + i * (h + 5) * 2);
    }
}

//Setting up gameplay
const canvas = document.querySelector("#game");
const c = canvas.getContext("2d");
canvas.width = innerWidth * 0.85;
canvas.height = innerHeight * 0.85;

//Making the sounds
function sound(src) {
    const audio = new Audio("./Sounds/" + src);
    audio.play();
}

//Drawing white background and outline
function basic() {
    c.fillStyle = "#fff";
    c.lineWidth = 5;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.rect(0, 0, canvas.width, canvas.height);
    c.closePath();
    c.stroke();
}

//Function to turn the image around
function drawImage(
    obj,
    deg,
    flop,
    x,
    y,
    scale = 1,
    c = canvas.getContext("2d")
) {
    c.save();
    const center = false;
    const flip = false;
    const img = obj.img;
    x == null ? (x = obj.x) : null;
    y == null ? (y = obj.y) : null;
    const width = obj.w;
    const height = obj.h;

    // Set rotation point to center of image, instead of top/left
    if (center) {
        x -= width / 2;
        y -= height / 2;
    }

    // Set the origin to the center of the image
    c.translate(x + width / 2, y + height / 2);

    // Rotate the canvas around the origin
    var rad = 2 * Math.PI - (deg * Math.PI) / 180;
    c.rotate(rad);

    // Flip/flop the canvas
    if (flip) flipScale = -1;
    else flipScale = 1;
    if (flop) flopScale = -1;
    else flopScale = 1;
    c.scale(flipScale * scale, flopScale * scale);

    // Draw the image
    c.drawImage(img, -width / 2, -height / 2, width, height);

    c.restore();
}

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
//Making constants for the player control
const gravity = 0.981;
const friction = 0.75;
const speed = 13.5;

//Making the PLayer Class
class Player {
    constructor(x, y, src, vel, ri, hx, up, left, right, shoot) {
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = src;
        this.glow = new Image();
        this.glow.src = "./glow.png";
        this.w = 30;
        this.h = 50;
        this.vel = vel;
        this.right = ri;
        this.slow = true;
        this.hp = 100;
        this.power = 1;
        this.hx = hx;
        this.hy = innerHeight * 0.94;
        this.up = up;
        this.left = left;
        this.rightkey = right;
        this.shoot = shoot;
        this.wait = 2;
        players.push(this);
    }

    draw() {
        if (this.right == true) {
            drawImage(this, 0, false);
        } else {
            drawImage(this, 180, true);
        }
    }

    update() {
        this.draw();
        this.x += this.vel.x;
        this.y += this.vel.y;

        //Control gravity and limits for vertical
        if (this.y + this.h < canvas.height - 2.5) {
            this.vel.y += gravity;
        } else {
            this.vel.y = 0;
            this.y = canvas.height - this.h - 2.5;
        }
        //Control left movements and limits
        if (this.x <= 2.5) {
            this.vel.x = 0;
            this.x = 3;
        } else {
            if (this.slow == true) {
                this.vel.x *= friction;
            }
        }
        //Control right movements and limits
        if (this.x + this.w >= canvas.width - 2.5) {
            this.vel.x = 0;
            this.x = canvas.width - this.w - 2.5;
        } else {
            if (this.slow == true) {
                this.vel.x *= friction;
            }
        }

        //limit bullets firing
        if (this.wait < 2) {
            this.wait += 0.05;
        }

        //Death
        if (this.hp <= 0) {
            this.hp = 0;
            cancelAnimationFrame(animationID);
            document.getElementById("death").style.display = "flex";
            for (var i = 0; i < players.length; i++) {
                if (players[i] != this) {
                    const p = i + 1;
                    document.getElementById("winner").innerHTML = "Player " + p;
                }
            }
        }
        //Power up
        if (this.power >= 100) {
            this.power = 100;
            c.drawImage(
                this.glow,
                this.x - 5,
                this.y - 5,
                this.w + 10,
                this.h + 10
            );
        }
    }
    collide(obs) {
        if (
            this.y + this.h + this.vel.y >= obs.y &&
            this.y + this.h <= obs.y &&
            this.x + this.w >= obs.x &&
            this.x <= obs.x + obs.w &&
            !obs.img.src.endsWith("star.png")
        ) {
            this.vel.y = 0;
            this.y = obs.y - this.h;
        }
        if (
            this.y + this.h >= obs.y &&
            this.y <= obs.y + obs.h &&
            this.x + this.w >= obs.x &&
            this.x <= obs.x + obs.w &&
            obs.img.src.endsWith("star.png") &&
            star.alive
        ) {
            this.power += 33;
            star.alive = false;
            sound("Star.wav");
        }
        if (
            obs.size == 55 &&
            this.x + this.w >= obs.x &&
            this.x < obs.x &&
            this.y + this.h > obs.y
        ) {
            this.x = obs.x - this.w - 1;
        }
        if (
            obs.size == 55 &&
            this.x <= obs.x + obs.w &&
            this.x + this.w > obs.x &&
            this.y + this.h > obs.y
        ) {
            this.x = obs.x + obs.w + 1;
        }
    }
    health() {
        ctx.fillStyle = "#fff";
        ctx.fillRect(this.hx() - 60, this.hy, 75, 30);
        ctx.fillStyle = "black";
        ctx.font = "25px FR73 Pixel";
        ctx.fillText(
            `p${players.indexOf(this) + 1}`,
            this.hx() - 30,
            this.hy + 20
        );

        //Draw an outline rect
        ctx.lineWidth = 2;
        ctx.fillStyle = "#f73b3b";
        ctx.fillRect(this.hx(), this.hy, 300, 15);
        ctx.fillStyle = "#5ce327";
        ctx.fillRect(this.hx(), this.hy, this.hp * 3, 15);
        ctx.beginPath();
        ctx.rect(this.hx(), this.hy, 300, 15);
        ctx.closePath();
        ctx.stroke();
        //Power Up Bar
        ctx.fillStyle = "#094ed9";
        ctx.fillRect(this.hx(), this.hy + 15, 300, 15);
        ctx.fillStyle = "#e6d137";
        ctx.fillRect(this.hx(), this.hy + 15, this.power * 3, 15);
        ctx.beginPath();
        ctx.rect(this.hx(), this.hy + 15, 300, 15);
        ctx.closePath();
        ctx.stroke();

        if (this.right == true) {
            drawImage(this, 0, false, this.hx() - 65, this.hy - 10, 0.5, ctx);
        } else {
            drawImage(this, 180, true, this.hx() - 65, this.hy - 10, 0.5, ctx);
        }
    }
}

class Bullet {
    constructor(x, y, vel, ri, p) {
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = "bullet.png";
        this.w = 30;
        this.h = 10;
        this.vel = vel;
        this.right = ri;
        this.p = p;
        sound("Shoot.mp3");
    }

    draw() {
        if (this.right == true) {
            drawImage(this, 0, false);
        } else {
            drawImage(this, 180, true);
        }
    }

    update() {
        this.draw();
        this.x += this.vel;
        if (
            this.x + this.w / 2 < 0 ||
            this.x + this.w + this.vel >= canvas.width
        ) {
            explosion(this.x + this.w, this.y + this.h / 2, "black");
            setTimeout(() => {
                bullets.splice(bullets.indexOf(this), 1);
            }, 0);
            sound("Wall.wav");
        }
    }

    collide(obs, col, hit, noise) {
        hit += this.p.power / 1000;
        hit += this.p.hp / 1000;
        hit > 1.6 ? (hit = 1.6) : null;
        const go = () => {
            if (obs.power) {
                this.p.power += 2;
            }
            explosion(this.x + this.w, this.y + this.h / 2, col);
            setTimeout(() => {
                bullets.splice(bullets.indexOf(this), 1);
                obs.hp -= hit + this.p.power / 100;
            }, 0);
            sound(noise);
        };
        if (
            this.x + 3 * (this.w / 4) >= obs.x &&
            this.x + this.w < obs.x &&
            this.y + this.h > obs.y &&
            this.y < obs.y + obs.h &&
            obs != this.p
        ) {
            go();
        }
        if (
            this.x + this.w / 4 <= obs.x + obs.w &&
            this.x + this.w > obs.x &&
            this.y + this.h > obs.y &&
            this.y < obs.y + obs.h &&
            obs != this.p
        ) {
            go();
        }
    }
}

///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
//Making constants for obstacles
let boxes = [];
let Bnum = Math.round(1 + Math.random() * 3);
let platforms = [];
let Pnum = Math.round(4 + Math.random() * 6);
let bullets = [];
let particles = [];
let star;
let players = [];
let p1;
let p2;

function init() {
    document.getElementById("death").style.display = "none";
    boxes = [];
    Bnum = Math.round(1 + Math.random() * 3);
    platforms = [];
    Pnum = Math.round(4 + Math.random() * 6);
    bullets = [];
    particles = [];
    players = [];
    p1 = new Player(
        80,
        50,
        PlayerOneFinalChoice,
        { x: 0, y: 0 },
        true,
        () => {
            return innerWidth * 0.125;
        },
        "w",
        "a",
        "d",
        "s"
    );
    p2 = new Player(
        canvas.width - 80 - 30,
        50,
        PlayerTwoFinalChoice,
        { x: 0, y: 0 },
        false,
        () => {
            return innerWidth * 0.875 - 300;
        },
        "arrowup",
        "arrowleft",
        "arrowright",
        "arrowdown"
    );
    players.forEach((p) => {
        for (var i = 0; i < 6; i++) {
            explosion(
                p.x + p.w / 2 + Math.random() * p.w,
                p.y + p.h / 2 + Math.random() * p.h,
                "#2a78f5",
                6
            );
        }
    });
}
//Making classes for obstacles
class Box {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 55;
        this.w = this.size;
        this.h = this.size;
        this.hp = 8;
        this.img = new Image();
        this.img.src = "./crate.png";
    }

    draw() {
        c.drawImage(this.img, this.x, this.y);
        // c.fillStyle = this.color;
        // c.fillRect(this.x, this.y, this.size, this.size);
    }
}

class Platform {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 75;
        this.h = 5;
        this.img = new Image();
        this.img.src = "./platform.png";
    }

    draw() {
        c.drawImage(this.img, this.x, this.y);
        // c.fillStyle = this.color;
        // c.fillRect(this.x, this.y, this.w, this.h);
    }
}
class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 35;
        this.h = 35;
        this.img = new Image();
        this.img.src = "./star.png";
        this.alive = true;
    }

    draw() {
        if (this.alive) {
            c.drawImage(this.img, this.x, this.y);
        }
    }
}
class Particle {
    constructor(x, y, r, col, vel) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.vel = vel;
        this.color = col;
        this.alpha = 1;
        this.fric = 0.99;
    }

    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }
    update() {
        this.draw();
        this.vel.x *= this.fric;
        this.vel.y *= this.fric;
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.alpha -= Math.random() / 20;
    }
}

function explosion(x, y, col, size = 1.5) {
    for (let i = 0; i < 8 + Math.random() * 12; i++) {
        particles.push(
            new Particle(x, y, Math.random() * size, col, {
                x: (Math.random() - 0.5) * Math.random() * 4.5,
                y: (Math.random() - 0.5) * Math.random() * 4.5,
            })
        );
    }
}

function CreateBoxes() {
    for (var i = 0; i < Bnum; i++) {
        const x = 50 + Math.random() * (canvas.width - 155);
        const y = canvas.height - 2.5 - 55;
        boxes.push(new Box(x, y));
    }
}
function CreatePlatforms() {
    const highest = { r: innerHeight, obj: null };
    for (var i = 0; i < Pnum; i++) {
        const x = 50 + Math.random() * (canvas.width - 180);
        const y = canvas.height - 2.5 - 40 - Math.random() * p1.h * 3;
        const plat = new Platform(x, y);
        if (y < highest.r) {
            highest.r = y;
            highest.obj = plat;
        }
        platforms.push(plat);
    }
    star = new Star(highest.obj.x + 55, highest.obj.y - 45);
}
//Make an animation loop
let animationID;
function animate() {
    animationID = requestAnimationFrame(animate);
    basic();
    players.forEach((p) => {
        p.update();
        p.health();
        p.collide(star);
    });
    boxes.forEach((box, index) => {
        players.forEach((p) => {
            p.collide(box);
        });
        if (box.hp <= 0) {
            for (var i = 0; i < 12; i++) {
                explosion(
                    box.x + Math.random() * box.w,
                    box.y + Math.random() * box.h,
                    "green"
                );
            }
            setTimeout(() => {
                boxes.splice(index, 1);
            }, 0);
        } else {
            box.draw();
        }
    });
    platforms.forEach((platform) => {
        platform.draw();
        players.forEach((p) => {
            p.collide(platform);
        });
    });
    bullets.forEach((bullet) => {
        bullet.update();
        boxes.forEach((box) => bullet.collide(box, "green", 1, "Box.mp3"));
        players.forEach((p) => bullet.collide(p, "red", 1, "Hit.wav"));
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
    star.draw();
}

//Check for keypresses
window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    //Control movements on key presses
    //Jumping for each Player
    players.forEach((p) => {
        if (key == p.up && p.vel.y == 0) {
            p.vel.y -= 15;
            p.slow = false;
            sound("Jump.wav");
        }
        if (key == p.left) {
            p.vel.x = -speed;
            p.slow = false;
            p.right = false;
        }
        if (key == p.rightkey) {
            p.vel.x = speed;
            p.slow = false;
            p.right = true;
        }
        if (key == p.shoot && p.wait >= 2) {
            const velocity = p.right ? p.vel.x + 18 : p.vel.x - 18;
            bullets.push(new Bullet(p.x, p.y + 20, velocity, p.right, p));
            p.wait = 0;
        }
    });
});

//Function to slow players down after they move
window.addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();

    players.forEach((p) => {
        if (key == p.left || key == p.rightkey) {
            p.slow = true;
        }
    });
});

//Function to resize the game if the screen is resized
window.addEventListener("resize", function () {
    bg.width = innerWidth;
    bg.height = innerHeight;
    drawBG();
    canvas.width = innerWidth * 0.85;
    canvas.height = innerHeight * 0.85;
    basic();
});

document.getElementById("Start").addEventListener("click", () => {
    init();
    CreateBoxes();
    CreatePlatforms();
    animate();
    document.getElementById("container").style.display = "none";
});

document.getElementById("Home").addEventListener("click", () => {
    if (document.getElementById("death").style.display == "flex") {
        document.getElementById("container").style.display = "flex";
        document.getElementById("death").style.display = "none";
        bg.width = innerWidth;
        bg.height = innerHeight;
        drawBG();
        canvas.width = innerWidth * 0.85;
        canvas.height = innerHeight * 0.85;
        basic();
    }
});

drawBG();
basic();

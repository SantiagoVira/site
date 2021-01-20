const width = () => {
    return 0.8 * innerWidth - 10;
};
const height = () => {
    return (
        20 * parseFloat(getComputedStyle(document.documentElement).fontSize) -
        10
    );
};

const canv = document.getElementById("special");
const ct = canv.getContext("2d");
canv.width = width();
canv.height = height();

const chars = [];

class Character {
    constructor(x, y, src) {
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = src;
        this.img.onload = () => {
            this.draw();
        };
        src == "./glow.png" ? (this.p = "./p1.png") : null;
        chars.push(this);
    }
    draw() {
        ct.save();
        ct.drawImage(this.img, this.x, this.y);
        ct.restore();
    }
}
let Lglow;
let Rglow;
let PlayerOneFinalChoice = "./p1.png";
let PlayerTwoFinalChoice = "./p1.png";
for (var j = 0; j < 2; j++) {
    for (var i = 1; i < 5; i++) {
        const p = "./p" + i + ".png";
        const y = 30;
        const x =
            j * (canvas.width / 2 + 2.5) + (i - 1) * 100 + (60 - 12.5 * j);
        new Character(x, y, p);
        if (i == 1) {
            if (j == 0) {
                Lglow = new Character(x - 5, y - 5, "./glow.png");
            } else {
                Rglow = new Character(x - 5, y - 5, "./glow.png");
            }
        }
    }
}
ct.fillStyle = "gray";
ct.fillRect(canv.width / 2 - 2.5, 0, 5, canv.height);

canv.addEventListener("click", (e) => {
    const x = e.clientX - canv.getBoundingClientRect().left;
    const y = e.clientY - canv.getBoundingClientRect().top;
    chars.forEach((char) => {
        const action = (glow) => {
            ct.clearRect(glow.x, glow.y, 40, 60);
            new Character(glow.x + 5, glow.y + 5, glow.p);
            glow.x = char.x - 5;
            glow.y = char.y - 5;
            glow.p = char.img.src;
            glow.draw();
        };

        //yada yada yada
        if (
            x > char.x &&
            x < char.x + 30 &&
            y > char.y &&
            y < char.y + 50 &&
            !char.img.src.endsWith("glow.png")
        ) {
            if (x < canv.width / 2 - 2.5) {
                action(Lglow);
                PlayerOneFinalChoice = char.img.src;
            } else {
                action(Rglow);
                PlayerTwoFinalChoice = char.img.src;
            }
        }
    });
});

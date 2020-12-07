function handle() {
    let mode = document.getElementById("modes").value;
    if (mode == "range") {
        rangeify();
    } else if (mode == "maxheight") {
        maxheight();
    } else if (mode == "time") {
        timeify();
    }
}

function rangeify() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let result =
        2 * (vel * Math.cos(r(ang))) * ((vel * Math.sin(r(ang))) / 9.81);
    document.getElementById("Answer").innerHTML =
        +result.toFixed(2).toString() + " meters";
}
function maxheight() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let result = Math.pow(vel * Math.sin(r(ang)), 2) / 19.62;
    document.getElementById("Answer").innerHTML =
        +result.toFixed(2).toString() + " meters";
}
function timeify() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let result = 2 * ((vel * Math.sin(r(ang))) / 9.81);
    document.getElementById("Answer").innerHTML =
        +result.toFixed(2).toString() + " seconds";
}
function r(radians) {
    var pi = Math.PI;
    return radians * (pi / 180);
}
function store() {
    let mode = document.getElementById("modes").value;
    localStorage.setItem("ProjectileCalculatorMode", mode);
    let vel = document.getElementById("vel").value;
    localStorage.setItem("ProjectileCalculatorVelocity", vel);
    let ang = document.getElementById("ang").value;
    localStorage.setItem("ProjectileCalculatorAngle", ang);
}
function ResetAll() {
    localStorage.setItem("ProjectileCalculatorMode", "range");
    localStorage.setItem("ProjectileCalculatorVelocity", "");
    localStorage.setItem("ProjectileCalculatorAngle", "");
    document.getElementById("modes").value = "range";
    document.getElementById("vel").value = "";
    document.getElementById("ang").value = "";
}
function GetAll() {
    document.getElementById("modes").value = localStorage.getItem(
        "ProjectileCalculatorMode"
    );
    document.getElementById("vel").value = localStorage.getItem(
        "ProjectileCalculatorVelocity"
    );
    document.getElementById("ang").value = localStorage.getItem(
        "ProjectileCalculatorAngle"
    );
}

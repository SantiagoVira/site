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
let Vi = "V<sub class='s'>i</sub>";
let sqr = "<sup class='s'>2</sup>";

function rangeify() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let result = (
        2 *
        (vel * Math.cos(r(ang))) *
        ((vel * Math.sin(r(ang))) / 9.81)
    ).toFixed(2);
    document.getElementById("Answer").innerHTML =
        +result.toString() + " meters";

    document.getElementById(
        "Process"
    ).innerHTML = `2 x (${Vi} x cos(angle)) x ((${Vi} x sin(angle)) / 9.81) =<br>
            2 x (${vel} x cos(${ang})) x ((${vel} x sin(${ang})) / 9.81) =<br>
            2 x (${vel} x ${+Math.cos(r(ang)).toFixed(
        2
    )}) x ((${vel} x ${+Math.sin(r(ang)).toFixed(2)}) / 9.81) =<br>
            2 x ${+(vel * Math.cos(r(ang))).toFixed(2)} x (${+(
        vel * Math.sin(r(ang))
    ).toFixed(2)} / 9.81) =<br>
            2 x ${+(vel * Math.cos(r(ang))).toFixed(2)} x ${+(
        (vel * Math.sin(r(ang))) /
        9.81
    ).toFixed(2)} =<br>
            ${result}
            `;
}
function maxheight() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let result = (Math.pow(vel * Math.sin(r(ang)), 2) / 19.62).toFixed(2);
    document.getElementById("Answer").innerHTML =
        +result.toString() + " meters";

    document.getElementById(
        "Process"
    ).innerHTML = `(${Vi} x sin(angle))${sqr} / 19.62 =<br>
            (${vel} x sin(${ang}))${sqr} / 19.62 =<br>
            (${vel} x ${+Math.sin(r(ang)).toFixed(2)})${sqr} / 19.62 =<br>
            (${+(vel * Math.sin(r(ang))).toFixed(2)})${sqr} / 19.62 =<br>
            ${+Math.pow(vel * Math.sin(r(ang)), 2).toFixed(2)} / 19.62 =<br>
            ${result}
            `;
}
function timeify() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let result = +(2 * ((vel * Math.sin(r(ang))) / 9.81)).toFixed(2);
    document.getElementById("Answer").innerHTML =
        result.toString() + " seconds";
    document.getElementById(
        "Process"
    ).innerHTML = `2 x ((${Vi} x sin(angle)) / 9.81) =<br>
        2 x ((${vel} x sin(${ang})) / 9.81) =<br>
        2 x ((${vel} x ${+Math.sin(r(ang)).toFixed(2)}) / 9.81) =<br>
        2 x (${+(vel * Math.sin(r(ang))).toFixed(2)} / 9.81) =<br>
        2 x ${+((vel * Math.sin(r(ang))) / 9.81).toFixed(2)} =<br>
        ${result}
        `;
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

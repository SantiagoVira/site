function handle() {
    let mode = document.getElementById("modes").value;
    if (mode == "range") {
        rangeify();
    } else if (mode == "maxheight") {
        maxheight();
    } else if (mode == "time") {
        timeify();
    } else if (mode == "viy") {
        viyify();
    } else if (mode == "vix") {
        vixify();
    } else if (mode == "all") {
        allify();
    }
}
let Vi = "V<sub class='s'>i</sub>";
let sqr = "<sup class='s'>2</sup>";
//Vix = Vi cos()
//Viy = Vi sin()

/*
max height= calc + inital height

time: Math.sqrt((hi + findmaxheight())/4.905)
vi=0
a=-9.81
d= Height initial + max height

range: Vi * t + 1/2at^2
(vel*Math.cos(ang)) * findtime()
-time
-original Vix
a=0
*/
function allify() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let vix = +(vel * Math.cos(r(ang))).toFixed(2);
    let viy = +(vel * Math.sin(r(ang))).toFixed(2);
    let range = +findrange().toFixed(2);
    let maxheight = +findmaxheight().toFixed(2);
    let time = +findtime().toFixed(2);

    document.getElementById("Answer").innerHTML = `
    V<sub class="s">ix</sub> = ${vix} m/s<br>
    V<sub class="s">iy</sub> = ${viy} m/s<br>
    Range = ${range} m<br>
    Max Height = ${maxheight} m<br>
    Total Time = ${time} s
    `;
}

function vixify() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let result = +(vel * Math.cos(r(ang))).toFixed(2);
    document.getElementById("Answer").innerHTML =
        result.toString() + " meters/second";

    document.getElementById(
        "Process"
    ).innerHTML = `V<sub class="s">ix</sub> = ${Vi} x cos(angle) =<br>
    V<sub class="s">ix</sub> = ${vel} x cos(${ang}) =<br>
    V<sub class="s">ix</sub> = ${vel} x ${Math.cos(r(ang))} =<br>
    ${result}
    `;
}
function viyify() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let result = +(vel * Math.sin(r(ang))).toFixed(2);
    document.getElementById("Answer").innerHTML =
        result.toString() + " meters/second";

    document.getElementById(
        "Process"
    ).innerHTML = `V<sub class="s">iy</sub> = ${Vi} x sin(angle) =<br>
    V<sub class="s">ix</sub> = ${vel} x sin(${ang}) =<br>
    V<sub class="s">ix</sub> = ${vel} x ${Math.sin(r(ang))} =<br>
    ${result}
    `;
}

function minput(id) {
    let inp = document.getElementById(id);
    if (parseFloat(inp.value) < 0) {
        inp.value = 0;
    }
    store();
}

function findmaxheight() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let hi = parseFloat(document.getElementById("hi").value);
    let calc = Math.pow(vel * Math.sin(r(ang)), 2) / 19.62;
    return calc + hi;
}
function findrange() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let time = Math.sqrt(findmaxheight() / 4.905);
    let partA = vel * Math.cos(r(ang)) * time;
    let partB = vel * Math.cos(r(ang)) * ((vel * Math.sin(r(ang))) / 9.81);
    console.log(partA, partB);
    return partA + partB;
}
function findtime() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let partA = (vel * Math.sin(r(ang))) / 9.81;
    let partB = Math.sqrt(findmaxheight() / 4.905);
    return partA + partB;
}

function rangeify() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let hi = document.getElementById("hi").value;

    let dy = +(Math.pow(vel * Math.sin(r(ang)), 2) / 19.62 + hi);

    let time = Math.sqrt(findmaxheight() / 4.905);
    let result = +findrange().toFixed(2);
    document.getElementById("Answer").innerHTML = result.toString() + " meters";

    document.getElementById("Process").innerHTML =
        `d<sub class='s'>y</sub> = (${Vi} x sin(angle))${sqr} / 19.62 + Height<sub class='s'>initial</sub> =<br>
        (${vel} x sin(${ang}))${sqr} / 19.62 + ${hi}=<br>
        d<sub class='s'>y</sub> = ${dy}
` +
        `<br><br>time = ((${Vi} x sin(angle)) / 9.81) + sqrt(d<sub class='s'>y</sub> / 4.905) =<br>
        ((${vel} x sin(${ang})) / 9.81) + sqrt(${dy.toFixed(2)} / 4.905) =<br>
        time = ${time.toFixed(2)}<br><br>
` +
        `(${Vi} x cos(angle)) x ((${Vi} x sin(angle)) / 9.81) + ${Vi} x cos(angle) x time =<br>
        (${vel} x cos(${ang})) x ((${vel} x sin(${ang})) / 9.81) + ${vel} x cos(${ang}) x ${time.toFixed(
            2
        )} =<br>
        (${vel} x ${+Math.cos(r(ang)).toFixed(2)}) x ((${vel} x ${+Math.sin(
            r(ang)
        ).toFixed(2)}) / 9.81) + ${vel} x ${+Math.cos(r(ang)).toFixed(
            2
        )} x ${time.toFixed(2)}=<br>
        ${+(vel * Math.cos(r(ang))).toFixed(2)} x (${+(
            vel * Math.sin(r(ang))
        ).toFixed(2)} / 9.81) + ${(vel * +Math.cos(r(ang)) * time).toFixed(
            2
        )} =<br> 
        ${+(vel * Math.cos(r(ang))).toFixed(2)} x ${+(
            (vel * Math.sin(r(ang))) /
            9.81
        ).toFixed(2)} + ${(vel * +Math.cos(r(ang)) * time).toFixed(2)} =<br>
        ${(
            +(vel * Math.cos(r(ang))) * +((vel * Math.sin(r(ang))) / 9.81)
        ).toFixed(2)} + ${(vel * +Math.cos(r(ang)) * time).toFixed(2)} =<br>
        ${result}
        `;
}
function maxheight() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let hi = document.getElementById("hi").value;
    let result = +findmaxheight().toFixed(2);
    document.getElementById("Answer").innerHTML = result.toString() + " meters";

    document.getElementById(
        "Process"
    ).innerHTML = `(${Vi} x sin(angle))${sqr} / 19.62 + Height<sub class='s'>initial</sub> =<br>
            (${vel} x sin(${ang}))${sqr} / 19.62 + ${hi}=<br>
            (${vel} x ${+Math.sin(r(ang)).toFixed(
        2
    )})${sqr} / 19.62 + ${hi}=<br>
            (${+(vel * Math.sin(r(ang))).toFixed(2)})${sqr} / 19.62 + ${hi}=<br>
            ${+Math.pow(vel * Math.sin(r(ang)), 2).toFixed(
                2
            )} / 19.62 + ${hi}=<br>
            ${+(Math.pow(vel * Math.sin(r(ang)), 2) / 19.62).toFixed(
                2
            )} + ${hi}=<br>
            ${result}
            `;
}
function timeify() {
    let vel = document.getElementById("vel").value;
    let ang = document.getElementById("ang").value;
    let result = +findtime().toFixed(2);

    let hi = parseFloat(document.getElementById("hi").value);
    let dy = +(Math.pow(vel * Math.sin(r(ang)), 2) / 19.62 + hi).toFixed(2);

    document.getElementById("Answer").innerHTML =
        result.toString() + " seconds";
    document.getElementById("Process").innerHTML =
        `d<sub class='s'>y</sub> =
        (${Vi} x sin(angle))${sqr} / 19.62 + Height<sub class='s'>initial</sub> =<br>
    (${vel} x sin(${ang}))${sqr} / 19.62 + ${hi}=<br>
    d<sub class='s'>y</sub> = ${dy}
    ` +
        `<br><br>((${Vi} x sin(angle)) / 9.81) + sqrt(d<sub class='s'>y</sub> / 4.905) =<br>
        ((${vel} x sin(${ang})) / 9.81) + sqrt(${dy} / 4.905) =<br>
        ((${vel} x ${+Math.sin(r(ang)).toFixed(2)}) / 9.81) + sqrt(${(
            dy / 4.905
        ).toFixed(2)}) =<br>
        (${+(vel * Math.sin(r(ang))).toFixed(2)} / 9.81) + ${Math.sqrt(
            dy / 4.905
        ).toFixed(2)} =<br>
        ${+((vel * Math.sin(r(ang))) / 9.81).toFixed(2)} + ${Math.sqrt(
            dy / 4.905
        ).toFixed(2)} =<br>
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
    let hi = document.getElementById("hi").value;
    localStorage.setItem("ProjectileCalculatorInitialHeight", hi);
}
function ResetAll() {
    localStorage.setItem("ProjectileCalculatorMode", "range");
    localStorage.setItem("ProjectileCalculatorVelocity", "");
    localStorage.setItem("ProjectileCalculatorAngle", "");
    localStorage.setItem("ProjectileCalculatorInitialHeight", "");
    document.getElementById("hi").value = "";
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
    document.getElementById("hi").value = localStorage.getItem(
        "ProjectileCalculatorInitialHeight"
    );
}

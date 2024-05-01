
const canvas = document.getElementById("pendulumCanvas");
const ctx = canvas.getContext("2d");

// Pendulum properties
const pivotX = canvas.width / 2;
const pivotY = 50;
let angle = Math.PI / 2; // Initial angle
let angularVelocity = 0.0;
let dampingFactor = 0.5; // Damping factor
let rodLength = 100;
const bobRadius = 20;
let gravity = 9.8; // Gravity strength
const timefactor = 0.17; // the less it is .. more the time it takes
let timeStep = timefactor / Math.sqrt(rodLength); // Time step
let direction = 1;
let start = 0, end = 0;
let request_id = null;

function update_factor(new_val) {
    dampingFactor = new_val;
}
function update_rod_lenght(new_val) {
    rodLength = new_val;
    timeStep = timefactor / Math.sqrt(rodLength);
}
function update_gravity(new_val) {
    gravity = new_val;
}
function restart() {
    cancelAnimationFrame(request_id);
    angle = Math.PI / 2; // Initial angle
    direction = 1;
    start = 0; 
    end = 0;
    angularVelocity = 0.0;
    request_id = requestAnimationFrame(animate);
}



function drawPendulum() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pivot point
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 5, 0, 2 * Math.PI);
    // ctx.fillStyle = "#000";
    ctx.fillStyle = "#ff7f50";
    ctx.fill();

    // Draw pendulum rod
    const pendulumX = pivotX + rodLength * Math.sin(angle);
    const pendulumY = pivotY + rodLength * Math.cos(angle);

    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(pendulumX, pendulumY);
    // ctx.strokeStyle = "#000";
    ctx.strokeStyle = "#ff7f50";
    ctx.stroke();

    // Draw pendulum bob
    ctx.beginPath();
    ctx.arc(pendulumX, pendulumY, bobRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#3498db";
    ctx.fill();
}

function updatePendulum() {

    const acceleration = (-gravity) * Math.sin(angle) - dampingFactor * angularVelocity;
    angularVelocity += acceleration * timeStep;
    angle += angularVelocity * timeStep;

    if (direction != Math.sign(angularVelocity)) {
        direction = Math.sign(angularVelocity);
        end = new Date();
        end = end.getTime();
        console.log("time : " + (end - start));
        start = new Date();
        start = start.getTime();
    }

    drawPendulum();
}

function animate() {
    updatePendulum();
    request_id = requestAnimationFrame(animate);
}

animation_going = true;
animate();

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var wHeight = window.innerHeight;
var wWidth = window.innerWidth;
var gravity = false;
var acceleration = 5;
let balls = [];
ctx.canvas.width = wWidth;
ctx.canvas.height = wHeight;
ctx.fillStyle = 'red';




function draw() {

    ctx.clearRect(0, 0, wWidth, wHeight);
    balls.forEach(updateShape);
}
setInterval(draw, 10);


class Circle {
    draw() {
        if (gravity && !this.landed) {
            if (this.y + this.radius > wHeight) {
                if (this.speed < 1.8) {
                    this.speed = 0;
                    this.accel = 0;
                    this.landed = true;
                }
                else {
                    this.accel *= -1;
                    this.speed -= 2;
                }

                this.y = wHeight - this.radius
            }

            if (this.accel < 0) {
                if (this.speed < 0.1) {
                    this.accel *= -1;
                }
                else {
                    this.y -= this.speed;
                    this.speed += (this.accel * .1);

                }
            }
            else {
                this.y += this.speed;
                this.speed += (this.accel * .1);
            }
        }
        else {
            this.y = wHeight - this.radius + 1;
        }


        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}

function updateShape(shape) {
    shape.draw();
}


function spawnCircle() {
    let circle = new Circle();
    circle.x = Math.random() * wWidth;
    circle.y = (Math.random() * wHeight / 2);
    circle.speed = 6;
    circle.radius = 50;
    circle.landed = false;
    circle.accel = acceleration;
    balls.push(circle);
}


function gravityToggle() {
    gravity = !gravity;
}
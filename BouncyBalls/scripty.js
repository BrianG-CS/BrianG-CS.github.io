var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var wHeight = window.innerHeight;
var wWidth = window.innerWidth;
var gravity = false;
var acceleration = 5;
let balls = [];
let squares = [];
ctx.canvas.width = wWidth;
ctx.canvas.height = wHeight;





function draw() {
    ctx.clearRect(0, 0, wWidth, wHeight);
    if (document.URL.includes("squares")) {
        squares.forEach(updateShape);
    }
    else {
        balls.forEach(updateShape);
    }
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
        else if (this.landed) {
            this.y = wHeight - this.radius + 1;
        }

        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}



class Square {
    draw() {
        if (gravity && !this.landed) {
            if (this.y + this.width > wHeight) {
                this.speed = 0;
                this.accel = 0;
                this.landed = true;
            }
            else {
                this.y += this.speed;
                this.speed += (this.accel * .1);
            }
        }
        else if (this.landed) {
            this.y = wHeight - this.width;
        }

        ctx.fillStyle = 'green';
        
        ctx.fillRect(this.x, this.y, this.width, this.width)
        ctx.strokeRect(this.x, this.y, this.width, this.width);
        ctx.stroke();
        ctx.fill();
    }
}

function updateShape(shape) {
    shape.draw();
}


function spawnCircle(min) {
    let circle = new Circle();
    circle.x = Math.random() * wWidth;
    circle.y = (Math.random() * min);
    circle.speed = 6;
    circle.radius = 50;
    circle.landed = false;
    circle.accel = acceleration;
    balls.push(circle);
}


function spawnSquare(min) {
    let square = new Square();
    square.x = Math.random() * wWidth;
    square.y = (Math.random() * min);
    square.speed = 6;
    square.width = 100;
    square.landed = false;
    square.accel = acceleration;
    squares.push(square);

}


function gravityToggle() {
    gravity = !gravity;
}

function clearCanvas() {
    ctx.clearRect(0, 0, wWidth, wHeight);
    balls = [];
    squares = [];
}





function spawnBunch() {
    gravity = true;
    for(i = 1; i < 30; i++) {
        spawnCircle(-300);
    }
}
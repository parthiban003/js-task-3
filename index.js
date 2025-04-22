var screen = document.querySelector('#screen');
var btn = document.querySelectorAll('.btn');

for (item of btn) {
  item.addEventListener('click', (e) => {
    btntext = e.target.innerText;
    if (btntext == 'x') {
      btntext = '*';
    }
    if (btntext == '/') {
      btntext = '/';
    }
    screen.value += btntext;
  });
}
function sin() {
  screen.value = Math.sin(screen.value)
}
function cos() {
  screen.value = Math.cos(screen.value)
}
function tan() {
  screen.value = Math.tan(screen.value)
}
function pow() {
  screen.value = Math.pow(screen.value,2)
}
function sqrt() {
  screen.value = Math.sqrt(screen.value,2)
}
function log() {
  screen.value = Math.log(screen.value)
}
function pi() {
  screen.value += 3.1415926;
}
function e() {
  screen.value += 2.718281;
}

function fact()
{
  var i, num, f;
  f=1
  num=screen.value
  for (i=1; i<=num; i++)
  {
    f=f*i;
  }
  i=i-1;
  screen.value=f;
}

function backspc()
{
  screen.value=screen.value.substr(0,screen.value.length-1);
}
// canvas section
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const snowflakes = [];
const leaves = [];

class Particle {
  constructor(x, y, size, speedY, speedX, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedY = speedY;
    this.speedX = speedX;
    this.type = type;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.20) * 2;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    if (this.y > canvas.height) {
      this.y = -10;
      this.x = Math.random() * canvas.width;
    }
    if (this.x > canvas.width || this.x < 0) {
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);

    if (this.type === "snow") {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === "leaf") {
      ctx.fillStyle = ["#b5651d", "#a0522d", "#8b4513", "#d2691e"][Math.floor(Math.random() * 4)];
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.lineTo(this.size / 2, this.size);
      ctx.lineTo(-this.size / 2, this.size);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }
}

function initParticles() {
  for (let i = 0; i < 100; i++) {
    snowflakes.push(new Particle(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 3 + 1,
      Math.random() * 1 + 0.5,
      Math.random() * 0.5 - 0.25,
      "snow"
    ));
  }

  for (let i = 0; i < 30; i++) {
    leaves.push(new Particle(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 10 + 5,
      Math.random() * 1 + 0.3,
      Math.random() * 1 - 0.5,
      "leaf"
    ));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snowflakes.forEach(flake => {
    flake.update();
    flake.draw();
  });

  leaves.forEach(leaf => {
    leaf.update();
    leaf.draw();
  });

  requestAnimationFrame(animate);
}

initParticles();
animate();
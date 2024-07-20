const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const constellations = [];
let mouse = { x: 0, y: 0 };

class Particle {
  constructor(x, y) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.originalSize = this.size;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.hue = 50; // Gold color
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    // Increase size if mouse is near
    const distance = Math.hypot(this.x - mouse.x, this.y - mouse.y);
    if (distance < 50) {
      this.size = this.originalSize * 2;
    } else {
      this.size = this.originalSize;
    }
  }

  draw() {
    ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
    ctx.shadowColor = 'rgba(128, 0, 128, 0.5)'; // Obsidian purple glow
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow blur for other drawings
  }
}

function createConstellation() {
  const centerX = Math.random() * canvas.width;
  const centerY = Math.random() * canvas.height;
  const numStars = Math.floor(Math.random() * 5) + 3;
  const constellation = [];

  for (let i = 0; i < numStars; i++) {
    const angle = (i / numStars) * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    constellation.push(new Particle(x, y));
  }

  constellations.push(constellation);
}

function init() {
  for (let i = 0; i < 200; i++) {
    particles.push(new Particle());
  }

  for (let i = 0; i < 5; i++) {
    createConstellation();
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  constellations.forEach(constellation => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(constellation[0].x, constellation[0].y);
    constellation.forEach(star => {
      ctx.lineTo(star.x, star.y);
      star.draw();
    });
    ctx.closePath();
    ctx.stroke();
  });

  drawLogo();

  requestAnimationFrame(animate);
}

init();
animate();

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

canvas.addEventListener('click', (event) => {
  for (let i = 0; i < 5; i++) {
    const particle = new Particle(event.clientX, event.clientY);
    particles.push(particle);
  }
});

setInterval(() => {
  const randomParticle = particles[Math.floor(Math.random() * particles.length)];
  randomParticle.size = randomParticle.size * 1.5;
  randomParticle.hue = (randomParticle.hue + 60) % 360;
  setTimeout(() => {
    randomParticle.size = randomParticle.size / 1.5;
  }, 1000);
}, 2000);

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
document.body.style.margin =
'0';
document.body.style.overflow = 'hidden';

const logo = new Image();
logo.src = 'assets/images/AuEpicGoldObsidianShadeMid.png';

function drawLogo() {
  const logoWidth = canvas.width * 0.3; // Adjust size as needed
  const logoHeight = logoWidth * (logo.height / logo.width);
  const x = (canvas.width - logoWidth) / 2;
  const y = (canvas.height - logoHeight) / 2;
  
  ctx.globalAlpha = 0.8; // Adjust transparency as needed
  ctx.drawImage(logo, x, y, logoWidth, logoHeight);
  ctx.globalAlpha = 1.0;
}

logo.onload = () => {
  animate(); // Start animation after the logo has loaded
};

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forward Cosmic Journey Animation</title>
    <style>
        body { margin: 0; overflow: hidden; background-color: #000; }
    </style>
</head>
<body>
    <canvas id="cosmicCanvas"></canvas>
    <script>
        const canvas = document.getElementById('cosmicCanvas');
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles = [];
        const particleCount = 2000; // Increased for more stars
        let lastClick = 0;

        class Particle {
            constructor(isBurst = false, isLarge = false) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * 2000; // Increased depth
                this.isLarge = isLarge;
                this.size = isLarge ? Math.random() * 2 + 1 : Math.random() * 0.3 + 0.1;
                this.brightness = isLarge ? Math.random() * 30 + 70 : Math.random() * 50 + 50;
                this.color = `hsl(${Math.random() * 30 + 30}, 100%, ${this.brightness}%)`;
                this.isBurst = isBurst;
                this.life = isBurst ? 100 : Infinity;
                this.twinkleSpeed = Math.random() * 0.03 + 0.01;
                this.twinklePhase = Math.random() * Math.PI * 2;
                this.speed = isLarge ? 2 : 0.5; // Larger stars move faster
            }

            update() {
                this.z -= this.speed;
                if (this.z <= 1) {
                    this.z = 2000;
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                }

                let scale = 1000 / this.z;
                let x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
                let y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;

                if (this.isBurst) {
                    this.life--;
                    this.size *= 0.99;
                }

                // Twinkle effect
                this.twinklePhase += this.twinkleSpeed;
                let twinkle = Math.sin(this.twinklePhase) * 0.5 + 0.5;

                this.draw(x2d, y2d, scale, twinkle);
            }

            draw(x, y, scale, twinkle) {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = (Math.min(this.z / 1000, 1) * twinkle);
                ctx.beginPath();
                ctx.arc(x, y, this.size * scale, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function connectParticles() {
            const now = Date.now();
            const timeSinceLastClick = now - lastClick;
            const maxConnections = Math.min(3, Math.floor(timeSinceLastClick / 2000));
            
            for (let i = 0; i < maxConnections; i++) {
                const p1 = particles[Math.floor(Math.random() * particles.length)];
                const p2 = particles[Math.floor(Math.random() * particles.length)];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    ctx.strokeStyle = `rgba(255, 215, 0, 0.03)`;
                    ctx.lineWidth = 0.1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        function createBurst(x, y) {
            for (let i = 0; i < 20; i++) {
                particles.push(new Particle(true));
            }
            lastClick = Date.now();
        }

        function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, index) => {
                particle.update();
                if (particle.life <= 0) {
                    particles.splice(index, 1);
                }
            });

            connectParticles();

            requestAnimationFrame(animate);
        }

        canvas.addEventListener('click', (event) => {
            createBurst(event.clientX, event.clientY);
        });

        function createParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(false, Math.random() < 0.03)); // 3% chance of being a large star
            }
        }

        createParticles();
        animate();
    </script>
</body>
</html>













------------



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

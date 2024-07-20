const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ... (previous Particle and Spaceship classes remain the same)

const logo = new Image();
logo.src = 'images/AuEpicGoldObsidianShadeMid.png';

function drawLogo() {
  const logoWidth = canvas.width * 0.3; // Adjust size as needed
  const logoHeight = logoWidth * (logo.height / logo.width);
  const x = (canvas.width - logoWidth) / 2;
  const y = (canvas.height - logoHeight) / 2;
  
  ctx.globalAlpha = 0.8; // Adjust transparency as needed
  ctx.drawImage(logo, x, y, logoWidth, logoHeight);
  ctx.globalAlpha = 1.0;
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  constellations.forEach(constellation => {
    // ... (constellation drawing code remains the same)
  });

  if (ship) {
    ship.draw();
  }

  drawLogo();

  requestAnimationFrame(animate);
}

// ... (rest of the initialization and event listener code remains the same)

logo.onload = () => {
  animate(); // Start animation after the logo has loaded
};

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
